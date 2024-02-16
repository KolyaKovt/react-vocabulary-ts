import { ReactNode } from "react"

interface Props {
  children: ReactNode
}

export const Header = ({ children }: Props) => {
  return <header className="sticky w-[100%] py-6 top-0 bg-[#1d232a]">{children}</header>
}
