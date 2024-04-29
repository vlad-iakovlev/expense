export interface TitleProps {
  title: string
}

export const Title = ({ title }: TitleProps) => (
  <h1 className="my-8 truncate text-4xl font-bold" tabIndex={0}>
    {title}
  </h1>
)
