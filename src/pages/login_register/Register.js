import React from 'react'
import "../login_register/vendor/bootstrap/css/bootstrap.min.css"
import "./fonts/font-awesome-4.7.0/css/font-awesome.min.css"
import "./fonts/iconic/css/material-design-iconic-font.min.css"
import "./fonts/iconic/css/material-design-iconic-font.min.css"
import "../login_register/vendor/animate/animate.css"
import "../login_register/vendor/css-hamburgers/hamburgers.min.css"
import "../login_register/vendor/animsition/css/animsition.min.css"
import "../login_register/vendor/select2/select2.min.css"
import "../login_register/vendor/daterangepicker/daterangepicker.css"
import "./css/util.css"
import "./css/main.css"
import { Link } from 'react-router-dom'

function Register() {
    return (
        <>
            <div className="limiter">
                <div
                    className="container-login100"
                    style={{ backgroundImage: 'url("../images/bg/bg-01.jpg")' }}
                >
                    <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                        <form className="login100-form validate-form">
                            <span className="login100-form-title p-b-49">Register</span>
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
                                />
                                <span className="focus-input100" data-symbol="&#xf206;" />
                            </div>
                            <div
                                className="wrap-input100 validate-input m-b-23"
                                data-validate="Password is required"
                            >
                                <span className="label-input100">Phone</span>
                                <input
                                    className="input100"
                                    type="password"
                                    name="pass"
                                    placeholder="Type your password"
                                />
                                <span className="focus-input100" data-symbol="&#x260E;"></span>
                            </div>
                            <div
                                className="wrap-input100 validate-input m-b-23"
                                data-validate="Password is required"
                            >
                                <span className="label-input100">Password</span>
                                <input
                                    className="input100"
                                    type="password"
                                    name="pass"
                                    placeholder="Type your password"
                                />
                                <span className="focus-input100" data-symbol="&#xf190;" />
                            </div>
                            <div
                                className="wrap-input100 validate-input m-b-23"
                                data-validate="Password is required"
                            >
                                <span className="label-input100">Confirm Password</span>
                                <input
                                    className="input100"
                                    type="password"
                                    name="pass"
                                    placeholder="Type your password"
                                />
                                <span className="focus-input100" data-symbol="&#xf190;" />
                            </div>
                           
                            <div className="container-login100-form-btn">
                                <div className="wrap-login100-form-btn">
                                    <div className="login100-form-bgbtn" />
                                    <button className="login100-form-btn">Register</button>
                                </div>
                            </div>
                            
                            <div className="flex-col-c p-t-10">
                            Already have an Account?
                                <Link to="/login" className="txt2">
                                    Login
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Register
