import React from 'react'
import './style.css'
import { Toggle } from 'react-hook-theme';
import Dropdown from './Dropdown';

/* import icons */
import { BiSearchAlt } from "react-icons/bi";
import { TbMessageCircle } from "react-icons/tb";
import { RiNotification3Line } from "react-icons/ri";

import { BsArrowRightShort } from "react-icons/bs";
import { TiUserAdd } from "react-icons/ti";
import { MdOutlineLogin } from "react-icons/md";
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div className='topSection'>
            <div className='headerSection flex'>

                {/* ------------------------ LOGGED IN ------------------------ */}

                <div className="title">
                    <h1>Welcome to 4rums</h1>
                    <p>Hello TanLuc, Welcome back!</p>
                </div>

                <div className="searchBar flex">
                    <input type="text" placeholder='Search Dashboard' />
                    <BiSearchAlt className='icon' />
                </div>

                {/* <div className="avatarDiv flex">
                    <RiNotification3Line className='icon' />
                    <div className='avatarImage'>
                        <img src="https://api.dicebear.com/7.x/notionists-neutral/svg?seed=Rascal" alt="Avatar" />
                    </div>
                </div> */}

                <Dropdown />



                {/* ------------------------ NOT LOGGED IN ------------------------ */}

                {/* <div className="title">
                    <h1>Chào mừng bạn!</h1>
                    <p>Đăng nhập để sử dụng nhiều tính năng hơn!</p>
                </div>

                <Toggle />

                <Dropdown />

                <div className="buttonDiv flex">
                    <Link to={"/login"} className='loginBtn btn flex'>
                        <span>Đăng nhập</span>
                        <MdOutlineLogin className='icon' />
                    </Link>

                    <Link to={"/register"} className='signUpBtn btn flex'>
                        <span>Đăng ký</span>
                        <TiUserAdd className='icon' />
                    </Link>
                </div> */}
            </div>
        </div>
    )
}
