import React from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import { BsCardText, BsSearch } from 'react-icons/bs'
import { GrDocumentUpload } from 'react-icons/gr'
import { BiVideo } from 'react-icons/bi'

import SidebarMenuItem from './SidebarMenuItem'

const Sidebar = () => {
  return (
    <div className="w-[300px] flex flex-col bg-gray-200 pt-[100px] pl-10">
      <SidebarMenuItem href="/" title="Home" Icon={() => <AiOutlineHome />} />
      <div className="pt-8 pb-4 text-xl font-bold">Generate Quiz</div>
      <SidebarMenuItem href="/topic" title="Topic" Icon={() => <BsSearch />} />
      <SidebarMenuItem href="/text" title="Text" Icon={() => <BsCardText />} />
      <SidebarMenuItem
        href="/file"
        title="File"
        Icon={() => <GrDocumentUpload />}
      />
      <SidebarMenuItem href="/video" title="Video" Icon={() => <BiVideo />} />
    </div>
  )
}

export default Sidebar
