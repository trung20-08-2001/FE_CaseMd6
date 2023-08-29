import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Host() {
  return (
    <>
      <div className='row'>
        <div className='col-3'>
           <Link to="create_house"><h3>Create house</h3></Link>
        </div>
        <div className='col-9'>
           <Outlet></Outlet>
        </div>
      </div>
    </>
  )
}

export default Host
