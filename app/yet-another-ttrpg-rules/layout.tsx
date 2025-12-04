import Header from "@/components/header";
import { ReactNode } from "react";

export default function YetAnotherTTRPGLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <div>
      <Header>
      </Header>
      <main>
        {children}
      </main>
    </div>
  )
}