import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <div className='px-10 py-5 flex items-center justify-between gap-5 bg-gray-200'>
      <div className='text-2xl font-bold'>LOGO</div>
      <div className='flex items-center gap-5'>
        <Link href="/blogs">Blogs</Link>
        <Link href="/blogs/add">Write Blog</Link>
      </div>
    </div>
  )
}

export default Navbar
