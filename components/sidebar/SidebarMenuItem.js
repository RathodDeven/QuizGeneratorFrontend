import Link from 'next/link'
import React from 'react'

const SidebarMenuItem = ({ href, title, Icon, active }) => {
  return (
    <Link
      href={href}
      className={`flex flex-row justify-start items-center text-2xl my-2 p-2 pl-8 hover:bg-gray-300 rounded-full w-fit min-w-[200px] ${
        active ? 'bg-gray-300' : ''
      }`}
    >
      <Icon />
      <span className="ml-4">{title}</span>
    </Link>
  )
}

export default SidebarMenuItem
