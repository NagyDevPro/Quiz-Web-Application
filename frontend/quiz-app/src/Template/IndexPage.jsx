import React from 'react'
import Footer from './Footer';
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';

export default function IndexPage() {
  return (
    <>
     <NavBar/>
     <Outlet/>
      <div className='my-5'></div>
      <Footer/>
      </>
  )
}
