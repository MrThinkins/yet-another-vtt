import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
  return(
    <header>
      <Link className="header-link" href="../">
        Home
      </Link>
      <Link className="header-link" href="../creatures">
        Creatures
      </Link>
      <Link className="header-link" href="../room">
        Room
      </Link>
      <div className="drop-down header-link">
        <div>
          Rules ▼
        </div>
        <div className="drop-down-links">
          <Link className="header-link" href="../yet-another-ttrpg-rules">
          Yet-Another-TTRPG-Rules
          </Link>
          <br></br>
          <Link href="../">
            Test
          </Link>
        </div>
      </div>
      
      <div className="user-button">
        <UserButton />
      </div>
    </header>
  )
}