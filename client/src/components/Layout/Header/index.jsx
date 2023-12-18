import React from 'react'
import './style.css'

/* import icons */
import { BiSearchAlt } from "react-icons/bi";
import { TbMessageCircle } from "react-icons/tb";
import { IoNotifications } from "react-icons/io5";

import { BsArrowRightShort } from "react-icons/bs";
import { TiUserAdd } from "react-icons/ti";
import { MdOutlineLogin } from "react-icons/md";
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div className='topSection'>
            <div className='headerSection flex'>

                {/* ------------------------ LOGGED IN ------------------------ */}

                {/* <div className="title">
                    <h1>Welcome to 4rums</h1>
                    <p>Hello TanLuc, Welcome back!</p>
                </div>

                <div className="searchBar flex">
                    <input type="text" placeholder='Search Dashboard' />
                    <BiSearchAlt className='icon' />
                </div>

                <div className="adminDiv flex">
                    <TbMessageCircle className='icon' />
                    <IoNotifications className='icon' />
                    <div className='adminImage'>
                        <img src="https://api.dicebear.com/7.x/notionists-neutral/svg?seed=Rascal" alt="Avatar" />
                    </div>
                </div> */}



                {/* ------------------------ NOT LOGGED IN ------------------------ */}

                <div className="title">
                    <h1>Welcome to 4rums</h1>
                    <p>Login to use many features!</p>
                </div>

                <div className="buttonDiv flex">
                    <Link to={"/login"} className='loginBtn btn flex'>
                        <span>Login</span>
                        <MdOutlineLogin className='icon' />
                    </Link>

                    <Link to={"/register"} className='signUpBtn btn flex'>
                        <span>Sign Up</span>
                        <TiUserAdd className='icon' />
                    </Link>
                </div>
            </div>
        </div>
    )
}
