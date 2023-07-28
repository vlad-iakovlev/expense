export interface TitleProps {
  title: string
}

export const Title = ({ title }: TitleProps) => {
  return (
    <h1 className="my-8 text-4xl font-bold truncate" tabIndex={0}>
      {title}
    </h1>
  )
}
