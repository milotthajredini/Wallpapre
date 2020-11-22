import React, { useContext } from 'react'
import Appbar from '../components/Layout/Appbar'
// import APICall from '../components/Photos/APICall'
function Home(props) {
  const { result } = props
  console.log(props)
  return (
    <div>
      <Appbar />
    
    </div>
  )
}

export default Home
