import React, { useContext, useState } from 'react'
import { StoreContext } from 'stores/Store';
import { useForm } from 'hooks/useForm';
import Breadcrumbs from 'components/Breadcrumbs';
import Input from 'components/Form/Input';
import './style.css'

// import icons
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { GoChevronRight } from "react-icons/go";

import img1 from 'assets/logo.png'

export default function Login({ history }) {
    document.title = '4rums | Login'

    const context = useContext(StoreContext)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const loginUserCallback = () => {
        loginUser()
    }

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: '',
        password: ''
    })

    const loginUser = () => {
        if (loading) return

        setErrors({})

        if (!values.username) {
            return setErrors({ username: 'Enter your name' })
        }
        if (!values.password) {
            return setErrors({ password: 'Enter password' })
        }

        setLoading(true)

        fetch('http://localhost:8000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(response => {
                setLoading(false)
                return response.json()
            })
            .then(data => {
                if (data.accessToken) {
                    context.login(data)
                    history.push('/user/' + data.user.id)
                } else throw Error(data.error?.message || 'Error')
            })
            .catch(err => {
                setErrors({ general: err.message })
            })
    }
    return (
        <>
            <Breadcrumbs current="Đăng nhập" links={[
                { title: 'Trang chính', link: '/' }
            ]} />

            <div className='loginPage flex'>
                <div className='loginContainer flex'>
                    <div className="formDiv flex">
                        <div className="headerDiv">
                            <img src={img1} alt="Logo" />
                            <h3>Chào mừng quay trở lại!</h3>
                        </div>

                        <form onSubmit={onSubmit} className='form grid'>
                            <div className="inputDiv">
                                <div className="inputLabel">Tên người dùng <span className='errorText'>{errors.username}</span></div>
                                <div className={`input flex ${errors.username ? 'inputBorder error' : 'inputBorder'}`}>
                                    <FaUserShield className='icon' />
                                    <Input type="text" name='username' id='username' placeholder='Nhập tên người dùng...' value={values.username} onChange={onChange} />
                                </div>
                            </div>

                            <div className="inputDiv">
                                <div className="inputLabel">Mật khẩu <span className='errorText'>{errors.password}</span></div>
                                <div className={`input flex ${errors.password ? 'inputBorder error' : 'inputBorder'}`}>
                                    <BsFillShieldLockFill className='icon' />
                                    <Input type="password" name='password' id='password' placeholder='Nhập mật khẩu...' value={values.password} onChange={onChange} />
                                </div>
                            </div>

                            <button type='submit' className='btn flex'>
                                <span>Login</span>
                                <GoChevronRight className='icon' />
                            </button>

                            <span className="forgotPassword">
                                Quên mật khẩu? <a href="#!">Nhấp tại đây</a>
                            </span>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
