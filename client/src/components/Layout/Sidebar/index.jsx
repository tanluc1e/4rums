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

import logo from 'assets/fox.png'

export default function Sidebar() {
    const location = useLocation();

    const menuItems = [
        { title: 'Trang Chính', path: '/', icon: GoHome, selectIcon: GoHomeFill },
        { title: 'Bài Đăng', path: '/boards', icon: MdOutlineDashboard, selectIcon: MdDashboard },
        { title: 'Tài Nguyên', path: '/files', icon: IoLayersOutline, selectIcon: IoLayers },
        { title: 'Thành Viên', path: '/user', icon: RiGroupLine, selectIcon: RiGroupFill },
    ];

    const settingItems = [
        { title: 'Tài Khoản', path: '/accounts', icon: FaRegUserCircle, selectIcon: FaUserCircle }
    ];
    return (
        <div className='sideBar grid'>
            <Link to={"/"} className='logoDiv flex'>
                <img src={logo} alt="Logo" />
                <h2>4rums</h2>
            </Link>

            <div className='menuDiv'>
                <h3 className='divTitle'>
                    THAO TÁC NHANH
                </h3>

                <ul className='menuLists grid'>
                    {menuItems.map((menu, index) => (
                        <li className={`listItem ${location.pathname === menu.path && 'active'}`} key={index}>
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
                    CÀI ĐẶT
                </h3>

                <ul className='menuLists grid'>
                    {settingItems.map((menu, index) => (
                        <li className={`listItem ${location.pathname === menu.path && 'active'}`} key={index}>
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

                    <h3>Trung Tâm Trợ Giúp</h3>
                    <p>Gặp sự cố trong diễn đàn, vui lòng liên hệ với chúng tôi để được hỗ trợ.</p>
                    <button className='btn'>Đi đến trung tâm</button>
                </div>
            </div>
        </div>
    )
}
