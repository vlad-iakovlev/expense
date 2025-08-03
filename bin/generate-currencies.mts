import chalk from 'chalk'
import { XMLParser } from 'fast-xml-parser'
import fetch from 'node-fetch'
import fs from 'node:fs'
import path from 'node:path'
import { uniqBy } from '../utils/uniqBy.js'

// ISO 4217
const currenciesUrl =
  'https://www.six-group.com/dam/download/financial-information/data-center/iso-currrency/lists/list-one.xml'

const dstPath = path.join(process.cwd(), 'constants/currencies.json')

interface Response {
  ISO_4217: {
    CcyTbl: {
      CcyNtry: [
        {
          CtryNm?: string
          CcyNm?: string
          Ccy?: string
          CcyNbr?: number
          CcyMnrUnts?: number | string
        },
      ]
    }
  }
}

interface CurrencyInfo {
  symbol?: string
  name?: string
  fractionalDigits?: number
}

const response = await fetch(currenciesUrl)
  .then((response) => response.text())
  .then((data) => {
    const parser = new XMLParser()
    return parser.parse(data) as Response
  })

const currencies = uniqBy(
  response.ISO_4217.CcyTbl.CcyNtry.map<CurrencyInfo>((currency) => ({
    symbol: currency.Ccy,
    name: currency.CcyNm,
    fractionalDigits:
      typeof currency.CcyMnrUnts === 'number' ? currency.CcyMnrUnts : undefined,
  })),
  (currency) => currency.symbol,
)

await fs.promises.writeFile(dstPath, JSON.stringify(currencies, null, 2))

console.log(chalk.green.bold(`[${dstPath}]`), 'Generated')
