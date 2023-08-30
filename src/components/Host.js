import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Host() {
  return (
    <>
      <div className='row'>
        <div className='col-3 '>
            <div className='container'>
            <Link to="create_house"><h3 style={{marginLeft:"2%"}}>Create house</h3></Link>
            </div>
        </div>
        <div className='col-9'>
           <Outlet></Outlet>
        </div>
      </div>
    </>
  )
}

export default Host
