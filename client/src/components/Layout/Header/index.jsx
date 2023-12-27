import React, { useContext } from 'react'
import { Strings } from 'utils/Constants';
import { StoreContext } from 'stores/Store';
import './style.css'
import Dropdown from './Dropdown';

import { MagnifyingGlass, UserPlus } from "@phosphor-icons/react";
import { Link } from 'react-router-dom';

export default function Header() {
    const { user, lang } = useContext(StoreContext)
    return (
        <div className='header-container'>
            <div className='header flex'>
                {user ?
                    <>
                        <div className="title">
                            <h1>{Strings.header.welcome.title.loggedIn[lang]}</h1>
                            <p>{Strings.header.welcome.desc.loggedIn[lang].replace('%userdpname%', user.displayName)}</p>
                        </div>

                        <div className="search-bar flex">
                            <input type="text" placeholder={Strings.header.search[lang]} />
                            <MagnifyingGlass className='icon' />
                        </div>

                        <Dropdown />
                    </> :
                    <>
                        <div className="title">
                            <h1>{Strings.header.welcome.title.notLogged[lang]}</h1>
                            <p>{Strings.header.welcome.desc.notLogged[lang]}</p>
                        </div>

                        <div className="button-container flex">
                            <Link to={"/register"} className='button-login btn flex'>
                                <span>Đăng ký</span>
                                <UserPlus className='icon' weight='bold' />
                            </Link>

                            <Link to={"/login"} className='button-register btn flex'>
                                <span>Đăng nhập</span>
                            </Link>
                        </div>
                    </>}
            </div>
        </div>
    )
}
