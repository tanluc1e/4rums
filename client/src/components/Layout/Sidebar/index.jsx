import React from 'react'
import './style.css'

// import icons
import { GoHome } from "react-icons/go";
import { FaRegUser } from "react-icons/fa6";
import { PiNewspaper } from "react-icons/pi";
import { MdOutlineFolder, MdOutlineAccountCircle } from "react-icons/md";
import { BsQuestionCircle } from "react-icons/bs";

import logo from 'assets/logo.png'

export default function Sidebar() {
    return (
        <div className='sideBar grid'>
            <div className='logoDiv flex'>
                <img src={logo} alt="Logo" />
                <h2>4rums</h2>
            </div>

            <div className='menuDiv'>
                <h3 className='divTitle'>
                    QUICK MENU
                </h3>

                <ul className='menuLists grid'>

                    <li className='listItem'>
                        <a href="#!" className='menuLink flex'>
                            <GoHome className='icon' />
                            <span className='smallText'>
                                Home
                            </span>
                        </a>
                    </li>

                    <li className='listItem'>
                        <a href="#!" className='menuLink flex'>
                            <GoHome className='icon' />
                            <span className='smallText'>
                                All Boards
                            </span>
                        </a>
                    </li>

                    <li className='listItem'>
                        <a href="#!" className='menuLink flex'>
                            <MdOutlineFolder className='icon' />
                            <span className='smallText'>
                                File/Uploads
                            </span>
                        </a>
                    </li>

                    <li className='listItem'>
                        <a href="#!" className='menuLink flex'>
                            <FaRegUser className='icon' />
                            <span className='smallText'>
                                Users
                            </span>
                        </a>
                    </li>

                    <li className='listItem'>
                        <a href="#!" className='menuLink flex'>
                            <PiNewspaper className='icon' />
                            <span className='smallText'>
                                Rules
                            </span>
                        </a>
                    </li>

                </ul>
            </div>

            <div className='settingsDiv'>
                <h3 className='divTitle'>
                    SETTINGS
                </h3>

                <ul className='menuLists grid'>

                    <li className='listItem'>
                        <a href="#!" className='menuLink flex'>
                            <MdOutlineAccountCircle className='icon' />
                            <span className='smallText'>
                                Accounts
                            </span>
                        </a>
                    </li>

                </ul>
            </div>

            <div className="sideBarCard">
                <BsQuestionCircle className='icon' />
                <div className="cardContent">
                    <div className="circle1"></div>
                    <div className="circle2"></div>

                    <h3>Help Center</h3>
                    <p>Having trouble in Plant, please contact us from for more questions.</p>
                    <button className='btn'>Go to help center</button>
                </div>
            </div>
        </div>
    )
}
