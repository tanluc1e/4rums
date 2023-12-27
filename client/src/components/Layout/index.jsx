import React from 'react'
import Sidebar from 'components/Layout/Sidebar'
import Header from './Header'
import { ToastContainer } from 'react-toastify';
/* import Rightbar from './Rightbar'; */
import SpeedDial from 'components/SpeedDial';

import './style.css'

export default function Layout({ children }) {
    return (
        <div className='container'>
            <Sidebar />

            <div className='content'>
                <Header />

                {children}
                {/* <Rightbar /> */}

                <ToastContainer position="bottom-right" hideProgressBar={true} autoClose={2000} closeOnClick />
                <SpeedDial />
            </div>
        </div>
    )
}
