"use client"

import { usePathname } from "next/navigation"
import {Navbar} from "./navbar"

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // hide navbar only on /store/[slug]
  const hideNavbar = /^\/store\/[^/]+$/.test(pathname)

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  )
}