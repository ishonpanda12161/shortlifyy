
import Header from '@/components/header';
import React from 'react'
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (

      <div>
        <main className='min-h-screen'>
            <Header />
            <Outlet />
        </main>

        <div className='p-10 text-center bg-gray-800 mt-10'>Made by IsHoN Panda 🪖</div>
        </div>

  )
}

export default AppLayout;