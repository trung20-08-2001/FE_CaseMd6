import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import "./vendor/bootstrap/css/bootstrap.min.css"
import "./fonts/font-awesome-4.7.0/css/font-awesome.min.css"
import "./fonts/iconic/css/material-design-iconic-font.min.css"
import "./fonts/iconic/css/material-design-iconic-font.min.css"
import "./vendor/animate/animate.css"
import "./vendor/css-hamburgers/hamburgers.min.css"
import "./vendor/animsition/css/animsition.min.css"
import "./vendor/select2/select2.min.css"
import "./vendor/daterangepicker/daterangepicker.css"
import "./css/util.css"
import "./css/main.css"
import { login } from "../../services/accountService"
import { useDispatch } from 'react-redux';
import "../../assets/styleModal.css"
import customAxios from '../../services/api'
import Swal from "sweetalert2";
import { LoginSocialFacebook, LoginSocialGoogle } from "reactjs-social-login";
import Typography from '@mui/material/Typography';
import { HouseOutlined } from "@mui/icons-material";


function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [account, setAccount] = useState({ username: '', avatar: '', email: '', password: '', fullName: '' });

    const handleLogin = async (event) => {
        event.preventDefault();
        // Kiểm tra các trường đăng nhập
        if (!isValidInput(username) || !isValidInput(password)) {
            setErrorMessage('Username and password must only contain letters and numbers.');
            return;
        }
        const account = {
            username: username,
            password: password
        }

        customAxios.post("/api/login", account)
            .then(resp => {
                Swal.fire({
                    icon: 'success',
                    title: 'Logged in successfully!',
                    text: 'You have successfully logged into your account.',
                });
                localStorage.setItem("account", JSON.stringify(resp.data));
                dispatch(login(resp.data))
                setErrorMessage('');
                setUsername('')
                setPassword('')
                if (resp.data.role.id === 1 || resp.data.role.name === "ROLE_ADMIN") {
                    navigate("/myaccount/vendors")
                } else {
                    navigate("/")
                }

            })
            .catch(function (err) {
                if (err.response && err.response.status === 401) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Login failed!',
                        text: "Your account has been locked",
                    });
                } else {
                    console.log(err)
                    setErrorMessage('Username or password incorrect.');
                }
            })

    };
    const isValidInput = (input) => {
        const regex = /^[a-zA-Z0-9]+$/;
        return regex.test(input);
    };

    const handleLoginSuccess1 = (data) => {
        let a1 = {
            ...account,
            username: data.short_name,
            avatar: data.picture.data.url,
            email: data.email,
            password: data.id,
            fullName: data.name
        };
        console.log(a1)
        sendUserInfoToBackend(a1)
    }
    const handleLoginSuccess2 = (data) => {
        console.log(data)
        let a2 = {
            ...account,
            username: data.given_name + data.family_name,
            avatar: data.picture,
            email: data.email,
            password: data.sub,
            fullName: data.name
        };
        sendUserInfoToBackend(a2)
    }
    const sendUserInfoToBackend = (userData) => {
        // Gửi thông tin người dùng đến backend
        customAxios.post("/loginBySocialNetwork", userData)
            .then((response) => {
                // Xử lý phản hồi từ backend
                localStorage.setItem("account", JSON.stringify(response.data));
                dispatch(login(response.data));
                navigate("/");
            })
            .catch((error) => {
                // Xử lý lỗi
                console.log(error);
            });
    };

    const handleLoginFailure = (error) => {
        // Xử lý lỗi đăng nhập
        console.log(error);
    };

    return (
        <>
            <div className="limiter">

                <div
                    className="container-login100"
                    style={{ background: "linear-gradient(to right, rgb(30, 126, 52) 0%, rgba(30, 126, 52, 0.8) 100%)" }}
                >
                    

                    <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">

                        <form className="login100-form validate-form">

                            <div className="text-center">
                            <Link to="/" style={{ position: "fixed", top: "5%", left: "7%" }}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            aria-label="open drawer"
                            color={"white"}
                            sx={{ display: { xs: 'block', sm: 'block' } }}
                            style={{ textShadow: "0px 0px 10px #ffc107" }}
                        >
                            <HouseOutlined style={{ color: "gold" }} />BOOKING HOUSE
                        </Typography>
                    </Link>
                                <h1 className="p-b-49 headerLogin">Login</h1>
                            </div>
                            <div
                                className="wrap-input100 validate-input m-b-23"
                                data-validate="Username is reauired"
                            >
                                <span className="label-input100">Username</span>
                                <input
                                    className="input100"
                                    type="text"
                                    name="username"
                                    placeholder="Type your username"
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                />
                                <span className="focus-input100" data-symbol="&#xf206;" />
                            </div>
                            <div
                                className="wrap-input100 validate-input"
                                data-validate="Password is required"
                            >
                                <span className="label-input100">Password</span>
                                <input
                                    className="input100"
                                    type="password"
                                    name="pass"
                                    placeholder="Type your password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                                <span className="focus-input100" data-symbol="&#xf190;" />
                            </div>
                            {errorMessage && (
                                <p style={{ color: "red" }}
                                    className="error-message">
                                    {errorMessage}
                                </p>
                            )}
                            <div className="text-right p-t-8 p-b-31">
                                {/* <a>Forgot password?</a> */}
                            </div>
                            <div className="container-login100-form-btn">
                                <div className="wrap-login100-form-btn">
                                    <div className="login100-form-bgbtn" />
                                    <button className="login100-form-btn button buttonShadow" onClick={handleLogin}>Login</button>
                                </div>
                            </div>
                            <div className="txt1 text-center p-t-54 p-b-20">
                                <span>Or Sign Up Using</span>
                            </div>
                            <div className="flex-c-m">
                                <LoginSocialFacebook
                                    appId={"1034030891357735"}
                                    onReject={handleLoginFailure}
                                    onResolve={({ provider, data }) => handleLoginSuccess1(data)}>
                                    <a className=" bg2 iconFacebook">
                                        <i className="fa fa-facebook" />
                                    </a>
                                </LoginSocialFacebook>

                                <LoginSocialGoogle
                                    scope="email"
                                    client_id={"584666386792-6sjtfu9j1efsat5pqml02tevg66k3s4e.apps.googleusercontent.com"}
                                    onReject={handleLoginFailure}
                                    onResolve={({ provider, data }) => handleLoginSuccess2(data)}>
                                    <a className=" bg3 iconGoogle">
                                        <i className="fa fa-google" />
                                    </a>
                                </LoginSocialGoogle>
                            </div>
                            <div className="flex-col-c p-t-10">
                                <span className="txt1 p-b-17">Do not have an account?</span>
                                <Link to="/register" className="signUpAndIn">
                                    Sign Up
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login


