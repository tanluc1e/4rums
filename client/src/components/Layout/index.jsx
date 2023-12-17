import React from 'react'
import Sidebar from 'components/Layout/Sidebar'
import Header from './Header'

import './style.css'

export default function Layout({ children }) {
    return (
        <div className='container'>
            <Sidebar />

            <div className='mainContent'>
                <Header />
                {children}
            </div>

        </div>
    )
}
