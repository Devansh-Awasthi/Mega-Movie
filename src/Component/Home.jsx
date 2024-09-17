import React from 'react'
import LeftNav from '../Partials/LeftNav'
import RestHome from '../Partials/RestHome'
import TopNav from '../Partials/TopNav'
import Header from '../Partials/Header'
import Hcards from '../Partials/Hcards'
function Home() {
    document.title='Movie App|Home'
  return (
    <div className='flex min-h-screen bg-[#181818] w-full'>
      <LeftNav></LeftNav>
      <div className='w-[80%] h-fit flex flex-col'>
       
      <TopNav></TopNav>
      <Header></Header>
      <Hcards></Hcards>
      </div>
    </div>
  )
}

export default Home