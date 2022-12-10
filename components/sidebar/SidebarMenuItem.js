import Link from 'next/link'
import React from 'react'

const SidebarMenuItem = ({ href, title, Icon }) => {
  return (
    <Link
      href={href}
      className="flex flex-row justify-start items-center text-2xl my-2 p-2 px-4 hover:bg-gray-300 rounded-md w-fit min-w-[200px]"
    >
      <Icon />
      <span className="ml-4">{title}</span>
    </Link>
  )
}

export default SidebarMenuItem
