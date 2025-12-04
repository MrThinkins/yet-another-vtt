import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
  return(
    <header>
      <Link className="header-link" href="./">
        Home
      </Link>
      <Link className="header-link" href="./creatures">
        Creatures
      </Link>
      <Link className="header-link" href="./yet-another-ttrpg-rules">
        Yet-Another-TTRPG-Rules
      </Link>
      <UserButton />
    </header>
  )
}