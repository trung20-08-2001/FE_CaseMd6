import React from 'react';
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import {useDispatch} from 'react-redux';
import {login} from '../services/accountService';
import customAxios from '../services/api';


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
    customAxios.get("/accounts/searchAccount/" + account.id)
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
                            customAxios.post("/accounts/createAccount", {
                                ...accountCurrent,
                                password: values.password
                            });
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
                    <div className="form-container distanceBody">
                        <h4 className="details-title text-center mb-43 headerInBody"><i
                            className="fas fa-edit"></i> Change Password</h4>
                        <div className="table text-center">
                        <div className="form-group mt-20">
                            <label htmlFor="oldPassword">Old Password</label><br/>
                            <Field
                                type="password"
                                name="oldPassword"
                                placeholder="Old Password"
                                style={{width:"300px"}}
                            />
                            <div className="error-message">
                                <ErrorMessage name="oldPassword"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">New Password</label><br/>
                            <Field
                                type="password"
                                name="password"
                                placeholder="New Password"
                                style={{width:"300px"}}
                            />
                            <div className="error-message">
                                <ErrorMessage name="password"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm New Password</label><br/>
                            <Field
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm New Password"
                                style={{width:"300px"}}
                            />
                            <div className="error-message">
                                <ErrorMessage name="confirmPassword"/>
                            </div>
                        </div>
                        <button type="submit" className="button buttonShadow mb-30">Confirm</button></div>
                    </div>
                </Form>


            </Formik>
        </div>
    );
};

export default ChangePassword;
