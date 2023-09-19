import React from 'react';
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login } from '../services/accountService';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";

const SignupSchema = Yup.object().shape({
    oldPassword: Yup.string().required('The old password cannot be blank'),
    password: Yup.string().required('The new password cannot be blank').min(6, 'Password must have at least 6 characters').max(32, 'Password must not exceed 32 characters'),
    confirmPassword: Yup.string().required("Re-enter new password can't be blank").oneOf([Yup.ref("password")], "You must enter the correct new password")
});

const ChangePassword = () => {
    const account = JSON.parse(localStorage.getItem("account"))
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let accountCurrent = {}
    axios.get("http://localhost:8081/accounts/searchAccount/" + account.id)
        .then(res => {
            accountCurrent = res.data
        })
        .catch(err => console.log(err))

    return (
        <div className="container">
            <style>
                {`
                    .error-message {
                        color: red;
                    }
                    .form-container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        min-height: calc(100vh - 100px); /* Điều chỉnh khoảng cách với navbar và footer */
                    }
                    .form-group {
                        margin-bottom: 20px;
                    }
                    .btn-confirm {
                        border-radius: 50px;
                        margin-top: 10px;
                    }
                    .form-title {
                        color: red;
                        margin-bottom: 10px;
                        margin-top: 10px; /* Điều chỉnh khoảng cách với navbar */
                    }
                `}
            </style>
            <Formik
                initialValues={{
                    oldPassword: '',
                    password: '',
                    confirmPassword: ''
                }}
                validationSchema={SignupSchema}
                onSubmit={async values => {
                    try {
                        if (accountCurrent.password !== values.oldPassword) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Password change failed',
                                text: 'The old password is incorrect',
                            });
                        } else {
                            axios.post("http://localhost:8081/accounts/createAccount", { ...accountCurrent, password: values.password });
                            Swal.fire({
                                icon: 'success',
                                title: 'Password changed successfully!',
                                text: 'You have successfully changed your password',
                            });
                            localStorage.removeItem("account");
                            dispatch(login(JSON.parse(localStorage.getItem("account"))));
                            navigate("/")
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }}
            >
                <Form>
                    <div className="form-container">
                        <h4 className="details-title text-center mb-43 headerInBody"><i className="fas fa-edit"></i> Change Password</h4>
                        <MenuItem>
                            <IconButton size="large" aria-label="show 4 new mails" color="black">
                                <Badge badgeContent={0} color="error">
                                    <div style={{ color: "red" }}> <WarningAmberIcon /></div>
                                </Badge>
                            </IconButton>
                            <p>Your password must be at least 6 characters</p>
                        </MenuItem>
                        <div className="form-group">
                            <label htmlFor="oldPassword">Old Password</label>
                            <Field
                                type="password"
                                name="oldPassword"
                                className="form-control"
                                style={{ width: "100%" }}
                                placeholder="Old Password"
                            />
                            <div className="error-message">
                                <ErrorMessage name="oldPassword" component="div" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">New Password</label>
                            <Field
                                type="password"
                                name="password"
                                className="form-control"
                                style={{ width: "100%" }}
                                placeholder="New Password"
                            />
                            <div className="error-message">
                                <ErrorMessage name="password" component="div" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm New Password</label>
                            <Field
                                type="password"
                                name="confirmPassword"
                                className="form-control"
                                style={{ width: "100%" }}
                                placeholder="Confirm New Password"
                            />
                            <div className="error-message">
                                <ErrorMessage name="confirmPassword" component="div" />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success btn-confirm">Confirm</button>
                    </div>
                </Form>


            </Formik>
        </div>
    );
};

export default ChangePassword;
