export interface TitleProps {
  title: string
}

export const Title: React.FC<TitleProps> = ({ title }) => {
  return <h1 className="my-8 text-4xl font-bold truncate">{title}</h1>
}
