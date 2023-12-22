import React from 'react'
import Sidebar from 'components/Layout/Sidebar'
import Header from './Header'
import { ToastContainer } from 'react-toastify';

import './style.css'

export default function Layout({ children }) {
    return (
        <div className='container'>
            <Sidebar />

            <div className='mainContent'>
                <Header />
                {children}
                <ToastContainer position="bottom-right" hideProgressBar={true} autoClose={2000} closeOnClick />
            </div>

        </div>
    )
}
