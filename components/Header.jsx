"use client"
import React from 'react'
import Link from 'next/link'
import {useAuthState} from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth';
import { auth } from '@/app/firebase/config';

const Header = () => {
  const [user] = useAuthState(auth);
  const userSession = sessionStorage.getItem('user');
  return (
    
    <div className='w-full flex justify-between items-center px-5 py-4 bg-gray-50'>
      <h1 className='text-2xl font-bold text-red-900'>Todoist</h1>
      <div className="flex gap-2 items-center">
        {userSession && user ?
        <>
        <h1>hello user</h1>
        <button onClick={() => {
          signOut(auth)
          sessionStorage.removeItem('user')
          }} 
          className='text-md tracking-wide px-4 py-2'>Logout</button>
        </>
        :
        <>
        <Link className='text-md tracking-wide px-4 py-2' href="/login">Login</Link>
        <Link className='text-md tracking-wide px-4 py-2 border-red-700' href="/signup">SignUp</Link>
        </>
      }
      </div>
    </div>
  )
}

export default Header
