'use client'

import Link from "next/link"
import { usePathname } from 'next/navigation'

export default function Room() {
  const urlPath = usePathname()

  return (
    <div>
      <Link href={`${urlPath}/001`}>001</Link>
    </div>
  )
}