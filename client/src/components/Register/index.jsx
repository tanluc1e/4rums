import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

// import icons
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { MdChevronRight } from "react-icons/md";
import { MdEmail } from "react-icons/md";

import video from 'assets/video.mp4'
import img1 from 'assets/logo.png'

export default function Register() {
    return (
        <div className='registerPage flex'>
            <div className='registerContainer flex'>
                <div className="formDiv flex">
                    <div className="headerDiv">
                        <img src={img1} alt="Logo" />
                        <h3>Let Us Know You!</h3>
                    </div>

                    <form action="" className='form grid'>
                        <span className='showMessage'>Register status will go there</span>

                        <div className="inputDiv">
                            <label htmlFor="email">Email</label>
                            <div className="input flex">
                                <MdEmail className='icon' />
                                <input type="text" id='email' placeholder='Enter email' />
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor="username">Username</label>
                            <div className="input flex">
                                <FaUserShield className='icon' />
                                <input type="text" id='username' placeholder='Enter username' />
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor="password">Password</label>
                            <div className="input flex">
                                <BsFillShieldLockFill className='icon' />
                                <input type="text" id='password' placeholder='Enter password' />
                            </div>
                        </div>

                        <button type='submit' className='btn flex'>
                            <span>Register</span>
                            <MdChevronRight className='icon' />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
