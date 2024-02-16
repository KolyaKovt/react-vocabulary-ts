import { ReactNode } from "react"

interface Props {
  children: ReactNode
}

export const Container = ({ children }: Props) => {
  return (
    <div className="flex flex-col items-start mx-auto max-w-[300px] px-5">
      {children}
    </div>
  )
}
