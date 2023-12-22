import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Strings } from 'utils/Constants';
import { StoreContext } from 'stores/Store';
import { useForm } from 'hooks/useForm';
import Breadcrumbs from 'components/Breadcrumbs';
import Input from 'components/Form/Input';
import Alert from 'components/Alert';
import './style.css'

// import icons
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { GoChevronRight } from "react-icons/go";

import img1 from 'assets/logo.png'

export default function Login() {
    const { login, lang } = useContext(StoreContext)
    const navigate = useNavigate();
    document.title = '4rums | Login'

    const [errors, setErrors] = useState({})
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const loginUserCallback = () => {
        loginUser()
    }

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: '',
        password: ''
    })

    const loginUser = async () => {
        if (loading) return;

        setErrors({});

        if (!values.username) {
            return setErrors({ username: 'Enter your name' });
        }
        if (!values.password) {
            return setErrors({ password: 'Enter password' });
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:8000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });

            setLoading(false);
            const data = await response.json();

            if (data.accessToken) {
                login(data);
                setSuccess(true);
                setTimeout(() => navigate('/'), 10);
            } else {
                throw new Error(data.error?.message || 'Error');
            }
        } catch (err) {
            setErrors({ general: err.message === '[object Object]' ? 'Error' : err.message });
            setTimeout(() => setErrors(""), 2000);
        }
    };

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                setSuccess(false);
            }, 1000);
        }
    }, [success]);

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
                            <h3>{Strings.loginPage.title[lang]}</h3>
                        </div>

                        <form onSubmit={onSubmit} className='form grid'>
                            <div className="inputDiv">
                                <div className="inputLabel">{Strings.loginPage.username.label[lang]} <span className='errorText'>{errors.username && Strings.loginPage.username.errors[lang]}</span></div>
                                <div className={`input flex ${errors.username ? 'inputBorder error' : 'inputBorder'}`}>
                                    <FaUserShield className='icon' />
                                    <Input type="text" name='username' id='username' placeholder={Strings.loginPage.username.placeholder[lang]} value={values.username} onChange={onChange} />
                                </div>
                            </div>

                            <div className="inputDiv">
                                <div className="inputLabel">{Strings.loginPage.password.label[lang]} <span className='errorText'>{errors.password && Strings.loginPage.password.errors[lang]}</span></div>
                                <div className={`input flex ${errors.password ? 'inputBorder error' : 'inputBorder'}`}>
                                    <BsFillShieldLockFill className='icon' />
                                    <Input type="password" name='password' id='password' placeholder={Strings.loginPage.password.placeholder[lang]} value={values.password} onChange={onChange} />
                                </div>
                            </div>

                            <button type='submit' className='btn flex'>
                                <span>Login</span>
                                <GoChevronRight className='icon' />
                            </button>

                            <span className="forgotPassword">
                                {Strings.loginPage.forgotPassword.text[lang]} <a href="#!">{Strings.loginPage.forgotPassword.click[lang]}</a>
                            </span>
                        </form>

                        {success && <Alert type="success" message={Strings.loginPage.submit.success[lang]} />}
                        {errors.general === "Username or password not valid" && <Alert type="error" message={Strings.loginPage.submit.errors.notValid[lang]} />}
                    </div>
                </div>
            </div>
        </>
    )
}
