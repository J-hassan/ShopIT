import React, { useState } from 'react'
import {Link, useLocation} from "react-router-dom"

const SideMenu = () => {

    const menuItems = [
        {
            name : "profile",
            url : "/me/profile",
            icon : "fas fa-user"
        },
        {
            name : "Update Profile",
            url : "/me/update_profile",
            icon : "fas fa-user"
        },
        {
            name : "Upload Avatar",
            url : "/me/upload_avatar",
            icon : "fas fa-user-circle"
        },
        {
            name : "Update Password",
            url : "/me/update_password",
            icon : "fas fa-lock"
        }
    ]


    const location = useLocation();

    const [activeMenuItem,setActiveMenuItem] = useState(location.pathname);

    const menuItemClick = (menuItemUrl) => {

        setActiveMenuItem(menuItemUrl);

    }


  return (
    <div class="list-group mt-5 pl-4">

      {menuItems?.map((menuItem,index) => {
         
        return <Link
         key={index}
         to={menuItem?.url}
         onClick={()=>menuItemClick(menuItem?.url)}
         class={`fw-bold list-group-item list-group-item-action ${activeMenuItem.includes(menuItem?.url)?"active":""}
         `}
         aria-current={activeMenuItem.includes(menuItem?.url)?"true":"false"}
       >
         <i class={`${menuItem?.icon} fa-fw pe-2`}></i> {menuItem?.name}
       </Link>

      })}

    </div>
  )
}

export default SideMenu