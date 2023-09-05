import React from 'react'
import { Link, Outlet } from 'react-router-dom'
function SidebarAdmin() {
  return (
    <>
      <div className="property-area property-area-2 ptb-30 sidebar">
        <div className="container">
          <div className="row">
            <div className="col-lg-2 pr-15 order-lg-1 order-2">
              <div className="single-sidebar-widget fix mb-40">
                <div className="sidebar-widget-title mb-30">
                  <h5><Link to="">Account user</Link></h5>
                </div>
              </div>
              <div className="single-sidebar-widget fix mb-60 d-none d-md-block">
                <div className="sidebar-widget-title mb-32">
                <h5><Link to="/admin/vendors">Account host</Link></h5>
                </div>
              </div>
              <div className="single-sidebar-widget fix mb-60">
                <div className="sidebar-widget-title mb-32">
                  <h5>History </h5>
                </div>
              </div>
            </div>
            <div className="col-lg-10 order-lg-2 order-1">
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SidebarAdmin
