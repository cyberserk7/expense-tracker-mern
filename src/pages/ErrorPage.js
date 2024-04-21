import React from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <div className='w-full h-screen flex items-center justify-center text-center'>
        <div className='space-y-5 leading-none'>
            <div>
                <h1 className='text-3xl font-bold'>
                    Error 404:
                </h1>
                <h1 className='text-3xl font-bold'>
                    Page Not Found
                </h1>
            </div>
            <Link to="" className=' w-full rounded-lg p-4 text-white bg-black font-bold flex items-center justify-center gap-2'>
            Home Page
                <BsArrowRight strokeWidth={1} />
            </Link>
        </div>
    </div>
  )
}

export default ErrorPage