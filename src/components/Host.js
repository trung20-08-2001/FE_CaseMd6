import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Host() {
  return (
    <>
      <div className="property-area property-area-2 ptb-30 sidebar list">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 pr-35 order-lg-1 order-2">
              <div className="single-sidebar-widget fix mb-40">
                <div className="sidebar-widget-title mb-30">
                <h5><Link to="">Create house</Link></h5>
                </div>
              </div>
              <div className="single-sidebar-widget fix mb-60 d-none d-md-block">
                <div className="sidebar-widget-title mb-32">
                  <h5>List Order</h5>
                </div>
              </div>
              <div className="single-sidebar-widget fix mb-60">
                <div className="sidebar-widget-title mb-32">
                  <h5>Our Agent</h5>
                </div>
              </div>
            </div>
            <div className="col-lg-8 order-lg-2 order-1">
              <div className="row">
              <Outlet></Outlet>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Host
