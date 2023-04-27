import assert from 'assert'
import chalk from 'chalk'
import * as fs from 'fs'
import * as path from 'path'
import { parseArgs } from 'util'
import { prisma } from '../utils/server/prisma.ts'

const MIGRATIONS_PATH = path.join(process.cwd(), './migrations')

interface Migration {
  apply?: () => Promise<void>
  rollback?: () => Promise<void>
}

const createMigration = async (name: string) => {
  console.log(chalk.blue.bold(`[${name}]`), 'Creating migration')
  const fileName = path.join(MIGRATIONS_PATH, `${name}.ts`)
  await fs.promises.mkdir(path.dirname(fileName), { recursive: true })
  await fs.promises.writeFile(fileName, 'export const apply = async () => {}')
  console.log(chalk.green.bold(`[${name}]`), `Migration created at ${fileName}`)
}

const getMigrations = async () => {
  const files = await fs.promises.readdir(MIGRATIONS_PATH)

  return files
    .filter((file) => file.endsWith('.ts'))
    .map((file) => file.replace('.ts', ''))
}

const getAppliedMigrations = async () => {
  const appliedMigrations = await prisma.migration.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  return appliedMigrations.map((migration) => migration.name)
}

const applyMigration = async (name: string) => {
  const { apply } = (await import(
    path.join(MIGRATIONS_PATH, `${name}.ts`)
  )) as Migration

  assert(apply, "Migration is missing 'apply' method")

  await apply()
  await prisma.migration.create({ data: { name } })
}

const applyAll = async () => {
  console.log(chalk.blue.bold('[migrations:apply-all]'), 'Migrating started')

  const migrations = await getMigrations()
  console.log(
    chalk.blue.bold('[migrations:apply-all]'),
    `Found ${migrations.length} migrations`
  )

  const appliedMigrations = await getAppliedMigrations()
  console.log(
    chalk.blue.bold('[migrations:apply-all]'),
    `Found ${appliedMigrations.length} applied migrations`
  )

  assert(
    migrations.length >= appliedMigrations.length,
    'There are more applied migrations than files in the migrations folder'
  )

  for (let i = 0; i < migrations.length; i++) {
    const name = migrations[i]
    const appliedMigration = appliedMigrations[i]
    console.log(chalk.blue.bold(`[${name}]`), 'Applying migration')

    assert(
      !appliedMigration || name === appliedMigration,
      `Migration does not match applied migration ${appliedMigration}`
    )

    if (name === appliedMigration) {
      console.log(chalk.red.bold(`[${name}]`), 'Migration already applied')
      continue
    }

    await applyMigration(name)
    console.log(chalk.green.bold(`[${name}]`), 'Migration applied successfully')
  }

  console.log(chalk.green.bold('[migrations:apply-all]'), 'Migrating finished')
}

void (async () => {
  try {
    const args = parseArgs({
      options: {
        create: {
          type: 'string',
        },
        applyAll: {
          type: 'boolean',
        },
      },
    })

    if (args.values.create) {
      await createMigration(`${Date.now()}-${args.values.create}`)
    }

    if (args.values.applyAll) {
      await applyAll()
    }

    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()
