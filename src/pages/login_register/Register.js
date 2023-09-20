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
import {Link} from 'react-router-dom'
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import {ErrorMessage, Field, Form, Formik} from "formik";

function Register() {

    const SignupSchema = Yup.object().shape({
        username: Yup.string().required("This field cannot be left blank").matches(/^[a-zA-Z0-9]*$/, 'Must be letters or numbers'),
        phone: Yup.string().required('This field cannot be left blank').matches(/^[0-9]{1,10}$/, 'Must be numeric and maximum 10 digits'),
        password: Yup.string().required('This field cannot be left blank').min(6, 'Password must have at least 6 characters').max(32, 'Password must not exceed 32 characters'),
        confirmPassword: Yup.string().required("This field cannot be left blank").oneOf([Yup.ref("password")], "You must enter the correct password you just entered")
    });

    return (
        <>
            <Formik
                initialValues={{
                    username: '',
                    phone: '',
                    password: '',
                    confirmPassword: ''
                }}
                validationSchema={SignupSchema}
                onSubmit={async (values, { resetForm }) => {
                    try {
                        console.log(values)
                        const response = await axios.post("http://localhost:8081/accounts/register", values);
                        console.log(response)
                        if (response.data === '') {
                            let account = {
                                ...values,
                                role: {id: 3},
                                status: {id: 1},
                                avatar: "https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-image-700-205124837.jpg"
                            }
                            axios.post("http://localhost:8081/accounts/createAccount", account);
                            resetForm();
                            Swal.fire({
                                icon: 'success',
                                title: 'Sign Up Success!',
                                text: 'You have successfully registered an account',
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Registration Failed',
                                text: 'Account registration failed. Username or phone already exists',
                            });
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }}

            >
                <Form>
                    <div className="limiter">
                        <div
                            className="container-login100"
                            style={{backgroundImage: 'url("../images/bg/bg-01.jpg")'}}
                        >
                            <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                                <div className="login100-form validate-form">
                                    <span className="login100-form-title p-b-49">Register</span>
                                    <div
                                        className="wrap-input100 validate-input m-b-23"
                                        data-validate="Username is reauired"
                                    >
                                        <span className="label-input100" style={{color:"blue", fontSize:"20px"}}>Username</span>
                                        <Field
                                            className="input100"
                                            type="text"
                                            name="username"
                                            placeholder="Type your username"
                                        />
                                        <span className="focus-input100" data-symbol="&#xf206;"/>
                                    </div>
                                    <div style={{color:"red"}}><ErrorMessage name="username" component="div"
                                                       className="error-message"/></div>

                                    <div
                                        className="wrap-input100 validate-input m-b-23"
                                        data-validate="Password is required"
                                    >
                                        <span className="label-input100" style={{color:"blue", fontSize:"20px"}}>Phone</span>
                                        <Field
                                            className="input100"
                                            type="text"
                                            name="phone"
                                            placeholder="Type your phone"
                                        />
                                        <span className="focus-input100" data-symbol="&#x260E;"></span>
                                    </div>
                                    <div style={{color:"red"}}><ErrorMessage name="password" component="div"
                                                       className="error-message"/></div>
                                    <div
                                        className="wrap-input100 validate-input m-b-23"
                                        data-validate="Password is required"
                                    >
                                        <span className="label-input100" style={{color:"blue", fontSize:"20px"}}>Password</span>
                                        <Field
                                            className="input100"
                                            type="password"
                                            name="password"
                                            placeholder="Type your password"
                                        />
                                        <span className="focus-input100" data-symbol="&#xf190;"/>
                                    </div>
                                    <div style={{color:"red"}}><ErrorMessage name="password" component="div" style={{ color: 'red' }}
                                                       className="error-message"/></div>

                                    <div
                                        className="wrap-input100 validate-input m-b-23"
                                        data-validate="Password is required"
                                    >
                                        <span className="label-input100" style={{color:"blue", fontSize:"20px"}}>Confirm Password</span>
                                        <Field
                                            className="input100"
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="Type your confirmPassword"
                                        />

                                        <span className="focus-input100" data-symbol="&#xf190;"/>
                                    </div>
                                    <div style={{color:"red"}}><ErrorMessage name="confirmPassword"
                                                       component="div"
                                                       className="error-message"/></div>

                                    <div className="container-login100-form-btn">
                                        <div className="wrap-login100-form-btn">
                                            <div className="login100-form-bgbtn"/>
                                            <button className="login100-form-btn" type="submit">Register</button>
                                        </div>
                                    </div>

                                    <div className="flex-col-c p-t-10">
                                        Already have an Account?
                                        <Link to="/login" className="txt2" style={{fontSize:"20px"}}>
                                            Login
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </>
    )
}

export default Register
