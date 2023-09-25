import React from 'react'
import Footer from '../Footer'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar'

export default function Master() {
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  )
}
