import React from 'react'
import './style.css'

// import icons
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { GoChevronRight } from "react-icons/go";

import img1 from 'assets/logo.png'

export default function Login() {
    return (
        <div className='loginPage flex'>
            <div className='loginContainer flex'>
                <div className="formDiv flex">
                    <div className="headerDiv">
                        <img src={img1} alt="Logo" />
                        <h3>Welcome Back!</h3>
                    </div>

                    <form action="" className='form grid'>
                        <span className='showMessage'>Login status will go there</span>

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
                            <span>Login</span>
                            <GoChevronRight className='icon' />
                        </button>

                        <span className="forgotPassword">
                            Forgot your password? <a href="#!">Click Here</a>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    )
}
