import React from 'react'

export default function Sidebar() {
  return (
    <div>
        <div id="sidebar-collapse" className="col-sm-3 col-lg-2 sidebar">
        <div className="profile-sidebar">
          <div className="profile-userpic">
            <img
              src="http://placehold.it/50/30a5ff/fff"
              className="img-responsive"
              alt=""
            />
          </div>
          <div className="profile-usertitle">
            <div className="profile-usertitle-name">Username</div>
            <div className="profile-usertitle-status">
              <span className="indicator label-success"></span>Online
            </div>
          </div>
          <div className="clear"></div>
        </div>
        <div className="divider"></div>
        <form role="search">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Search" />
          </div>
        </form>
        <ul className="nav menu">
          <li className="active">
            <a href="index.html">
              <em className="fa fa-dashboard">&nbsp;</em> Dashboard
            </a>
          </li>
        
          <li>
            <a href="panels.html">
              <em className="fa fa-clone">&nbsp;</em> Alerts &amp; Panels
            </a>
          </li>
        
          <li>
            <a href="login.html">
              <em className="fa fa-power-off">&nbsp;</em> Logout
            </a>
          </li>
        </ul>
      </div>

      
    </div>
  )
}
