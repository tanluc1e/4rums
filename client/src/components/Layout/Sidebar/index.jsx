import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './style.css'

// import icons 
import { GoHome, GoHomeFill } from "react-icons/go";
import { MdOutlineDashboard, MdDashboard } from "react-icons/md";
import { RiGroupLine, RiGroupFill } from "react-icons/ri";
import { IoLayersOutline, IoLayers } from "react-icons/io5";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import { BsQuestionCircle } from "react-icons/bs";

import logo from 'assets/logo.png'

export default function Sidebar() {
    const location = useLocation();

    const menuItems = [
        { title: 'Home', path: '/', icon: GoHome, selectIcon: GoHomeFill },
        { title: 'All boards', path: '/boards', icon: MdOutlineDashboard, selectIcon: MdDashboard },
        { title: 'Resources', path: '/files', icon: IoLayersOutline, selectIcon: IoLayers },
        { title: 'User', path: '/user', icon: RiGroupLine, selectIcon: RiGroupFill },
    ];

    const settingItems = [
        { title: 'Accounts', path: '/accounts', icon: FaRegUserCircle, selectIcon: FaUserCircle }
    ];
    return (
        <div className='sideBar grid'>
            <Link to={"/"} className='logoDiv flex'>
                <img src={logo} alt="Logo" />
                <h2>4rums</h2>
            </Link>

            <div className='menuDiv'>
                <h3 className='divTitle'>
                    QUICK MENU
                </h3>

                <ul className='menuLists grid'>
                    {menuItems.map((menu, index) => (
                        <li className={`listItem ${location.pathname === menu.path && 'active'}`}>
                            <Link to={menu.path} className='menuLink flex'>
                                {location.pathname === menu.path ? <menu.selectIcon className='icon' /> : <menu.icon className='icon' />}
                                <span className='smallText'>
                                    {menu.title}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="sidebar-line"></div>

            <div className='settingsDiv'>
                <h3 className='divTitle'>
                    SETTINGS
                </h3>

                <ul className='menuLists grid'>
                    {settingItems.map((menu, index) => (
                        <li className={`listItem ${location.pathname === menu.path && 'active'}`}>
                            <Link to={menu.path} className='menuLink flex'>
                                {location.pathname === menu.path ? <menu.selectIcon className='icon' /> : <menu.icon className='icon' />}
                                <span className='smallText'>
                                    {menu.title}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="sideBarCard">
                <BsQuestionCircle className='icon' />
                <div className="cardContent">
                    <div className="circle1"></div>
                    <div className="circle2"></div>

                    <h3>Help Center</h3>
                    <p>Having trouble in 4rums, please contact us from for more questions.</p>
                    <button className='btn'>Go to help center</button>
                </div>
            </div>
        </div>
    )
}
