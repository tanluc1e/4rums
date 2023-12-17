import React from 'react'
import './style.css'

/* import icons */
import { BiSearchAlt } from "react-icons/bi";
import { TbMessageCircle } from "react-icons/tb";
import { MdOutlineNotificationsNone } from "react-icons/md";

export default function Header() {
    return (
        <div className='topSection'>
            <div className='headerSection flex'>
                <div className="title">
                    <h1>Welcome to Plant</h1>
                    <p>Hello TanLuc, Welcome back!</p>
                </div>

                <div className="searchBar flex">
                    <input type="text" placeholder='Search Dashboard' />
                    <BiSearchAlt className='icon' />
                </div>

                <div className="adminDiv flex">
                    <TbMessageCircle className='icon' />
                    <MdOutlineNotificationsNone className='icon' />
                    <div className='adminImage'>
                        <img src="https://api.dicebear.com/7.x/notionists-neutral/svg?seed=Rascal" alt="Avatar" />
                    </div>
                </div>
            </div>
        </div>
    )
}
