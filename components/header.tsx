import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
  return(
    <header>
      <Link className="header-link" href="./">
        Home
      </Link>
      <Link href="./creatures">
        Creatures
      </Link>
      <UserButton />
    </header>
  )
}