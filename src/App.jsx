import { useState } from 'react'
import './App.css'

import Header from './components/Header/Header'
import Nav from './components/Nav/Nav'
import Main from './components/Main/Main'
import Footer from './components/Footer/Footer'
import ReserveTable from './components/Main/ReserveTable/ReserveTable'
import ConfirmedBooking from './components/Main/ReserveTable/ConfirmedBooking'
import { Routes, Route } from 'react-router-dom'


function App() {

  return (
  <>
      <Header></Header>
        <Routes>
          <Route path='/' element={<Main />}/>
          <Route path='/reservation' element={<ReserveTable />}/>
          <Route path='/confirmation' element={<ConfirmedBooking />}/>
        </Routes>
      <Footer></Footer>
  </>
  )
}


export default App
