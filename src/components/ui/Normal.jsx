import React from 'react'

import Header from '../header/Header'
import { Outlet } from "react-router-dom";
import Footer from '../footer/Footer'

const Normal = () => {
  return (
    <>
        <Header />
        <Outlet />
        <Footer />
    </>
  )
}

export default Normal