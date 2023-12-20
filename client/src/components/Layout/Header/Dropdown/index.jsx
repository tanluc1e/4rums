import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { useTheme } from 'react-hook-theme';

// import icons
import { FaArrowLeftLong, FaChevronRight, FaCheck } from "react-icons/fa6";
import { MdDarkMode, MdLightMode, MdAccountCircle, MdSettings, MdGTranslate, MdCheck } from "react-icons/md";

import { StoreContext } from 'stores/Store';

import { BACKEND, Strings } from 'utils/Constants';

import CustomScrollbar from 'components/CustomScrollbar';

import './style.css';

const DropdownItem = ({ onClick, data, setActiveMenu, goToMenu, leftIcon, rightIcon, header, children }) => {
    const dropHeader = header ? ' drop-header' : ''

    const click = () => {
        goToMenu && setActiveMenu(goToMenu)
        onClick && onClick(data)
    }

    return (
        <span className={'menu-item' + dropHeader} onClick={click}>
            {leftIcon && (
                <span className="icon-button">
                    {leftIcon}
                </span>
            )}
            {children}
            {rightIcon && (
                <span className="icon-right">
                    {rightIcon}
                </span>
            )}
        </span>
    )
}

const DropdownMenu = ({ lang, setLang, setDropdownOpen }) => {
    const navigate = useNavigate()
    const [activeMenu, setActiveMenu] = useState('main')
    const [menuHeight, setMenuHeight] = useState(null)
    const { theme, setTheme } = useTheme();
    const dropdown = useRef()

    useEffect(() => {
        setMenuHeight(dropdown.current?.querySelector('.menu').offsetHeight + 16)
    }, [])

    const calcHeight = (el) => {
        const height = el.offsetHeight
        setMenuHeight(height + 18)
    }

    const setLanguage = (data) => {
        setLang(data.lang)
    }

    const goTo = (data) => {
        setDropdownOpen(false)
        navigate(data.url)
    }

    const changeTheme = () => {
        if (theme === 'light') {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }

    return (
        <div className="head_dropdown" style={{ height: menuHeight }} ref={dropdown}>
            <CustomScrollbar className="navigation__menu">

                <CSSTransition
                    in={activeMenu === 'main'}
                    timeout={300}
                    classNames="menu-primary"
                    unmountOnExit
                    onEnter={calcHeight}
                >
                    <div className="menu">
                        <DropdownItem
                            leftIcon={<MdAccountCircle />}
                            onClick={goTo}
                            data={{ url: '/user/' }}
                        >
                            <div className="menu-item-title">{Strings.dropdown.profiles[lang]}</div>
                        </DropdownItem>
                        <DropdownItem
                            leftIcon={<MdSettings />}
                            onClick={goTo}
                            data={{ url: '/settings/' }}
                        >
                            <div className="menu-item-title">{Strings.dropdown.settings[lang]}</div>
                        </DropdownItem>
                        <DropdownItem
                            leftIcon={theme === 'dark' ? <MdDarkMode /> : <MdLightMode />}
                            onClick={changeTheme}
                        >
                            <div className="menu-item-title">{Strings.dropdown.changeThemes[lang]}</div>
                        </DropdownItem>
                        <DropdownItem
                            leftIcon={<MdGTranslate />}
                            rightIcon={<FaChevronRight />}
                            goToMenu="language"
                            setActiveMenu={setActiveMenu}
                        >
                            <div className="menu-item-title">{Strings.dropdown.changeLanguages[lang]}</div>
                        </DropdownItem>
                    </div>
                </CSSTransition>

                <CSSTransition
                    in={activeMenu === 'language'}
                    timeout={300}
                    classNames="menu-secondary"
                    unmountOnExit
                    onEnter={calcHeight}>
                    <div className="menu">
                        <DropdownItem
                            goToMenu="main"
                            leftIcon={<FaArrowLeftLong />}
                            setActiveMenu={setActiveMenu}
                            header
                        >
                            <div className="menu-item-title">{Strings.dropdown.changeLanguages[lang]}</div>
                        </DropdownItem>
                        <DropdownItem
                            goToMenu="main"
                            onClick={setLanguage}
                            data={{ lang: 'vi' }}
                            rightIcon={lang === 'vi' ? <FaCheck /> : ''}
                            setActiveMenu={setActiveMenu}
                        >
                            <div className="menu-item-title">{Strings.dropdown.changeLanguages.choosed[lang]['vi']}</div>
                        </DropdownItem>
                        <DropdownItem
                            goToMenu="main"
                            onClick={setLanguage}
                            data={{ lang: 'en' }}
                            rightIcon={lang === 'en' ? <FaCheck /> : ''}
                            setActiveMenu={setActiveMenu}
                        >
                            <div className="menu-item-title">{Strings.dropdown.changeLanguages.choosed[lang]['en']}</div>
                        </DropdownItem>
                    </div>
                </CSSTransition>

            </CustomScrollbar>
        </div>
    )
}

export default function Dropdown() {
    const { user, logout, lang, setLang } = useContext(StoreContext)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    console.log("drop ", dropdownOpen)
    return (
        <li className="head_act_item">
            <div
                className="head_profile"
                style={{ backgroundImage: 'url(https://api.dicebear.com/7.x/lorelei-neutral/svg?seed=Pumpkin)' }}
                onClick={() => setDropdownOpen(!dropdownOpen)}
            >
                TanLuc
            </div>

            {dropdownOpen && (
                <DropdownMenu
                    lang={lang}
                    setLang={setLang}
                    setDropdownOpen={setDropdownOpen}
                />
            )}
        </li>
    )
}
