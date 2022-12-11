import React from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import { BsCardText, BsSearch } from 'react-icons/bs'
import { GrDocumentUpload } from 'react-icons/gr'
import { BiVideo } from 'react-icons/bi'

import SidebarMenuItem from './SidebarMenuItem'
import { useRouter } from 'next/router'

const Sidebar = () => {
  const router = useRouter()
  return (
    <div className="w-[300px] flex flex-col bg-gray-200 pt-[100px] pl-10">
      <SidebarMenuItem
        active={router.route === '/'}
        href="/"
        title="Home"
        Icon={() => <AiOutlineHome />}
      />
      <div className="pt-8 pb-4 text-xl font-bold">Generate Quiz</div>
      <SidebarMenuItem
        active={router.route === '/topic'}
        href="/topic"
        title="Topic"
        Icon={() => <BsSearch />}
      />
      <SidebarMenuItem
        active={router.route === '/text'}
        href="/text"
        title="Text"
        Icon={() => <BsCardText />}
      />
      <SidebarMenuItem
        active={router.route === '/file'}
        href="/file"
        title="File"
        Icon={() => <GrDocumentUpload />}
      />
      <SidebarMenuItem
        active={router.route === '/media'}
        href="/media"
        title="Media"
        Icon={() => <BiVideo />}
      />
    </div>
  )
}

export default Sidebar
