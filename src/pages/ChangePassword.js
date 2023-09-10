import React from 'react';
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login } from '../services/accountService';

const SignupSchema = Yup.object().shape({
    oldPassword: Yup.string().required('The old password cannot be blank'),
    password: Yup.string().required('The new password cannot be blank').min(6, 'Mật khẩu phải có ít nhất 6 kí tự').max(8, 'Mật khẩu không được vượt quá 8 kí tự'),
    confirmPassword: Yup.string().required("Re-enter new password can't be blank").oneOf([Yup.ref("password")], "Phải nhập đúng mật khẩu mới")
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
        <>
            <style>
                {`
                    .error-message {
                        color: red;
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
                                title: 'Đổi mật khẩu thất bại',
                                text: 'Mậu khẩu cũ không chính xác',
                            });
                        } else {
                            axios.post("http://localhost:8081/accounts/createAccount", { ...accountCurrent, password: values.password });
                            Swal.fire({
                                icon: 'success',
                                title: 'Đổi mật khẩu thành công!',
                                text: 'Bạn đã đổi thành công mật khẩu.',
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
                <Form style={{ marginLeft: "300px" }}>
                    <label>Old Password</label>
                    <div className="input-box mb-40" style={{ width: "400px" }}>

                        <i className="fa fa-user" />
                        <Field
                            type="password"
                            name="oldPassword"
                            placeholder="Mật khẩu cũ"
                        />
                        <ErrorMessage name="oldPassword" component="div" className="error-message" />
                    </div>
                    <label>New password</label>
                    <div className="input-box mb-40" style={{ width: "400px" }}>
                        <i className="fa fa-lock" />
                        <Field
                            type="password"
                            name="password"
                            placeholder="Mật khẩu mới"
                        />
                        <ErrorMessage name="password" component="div" className="error-message" />
                    </div>
                    <label>Confirm new password</label>
                    <div className="input-box mb-40" style={{ width: "400px" }}>
                        <i className="fa fa-lock" />
                        <Field
                            type="password"
                            name="confirmPassword"
                            placeholder="Nhập lại mật khẩu mới"
                        />
                        <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                    </div>
                    <div>
                        <button type="submit" className="btn btn-success" style={{ marginLeft: "160px" }}>OK</button>
                    </div>
                </Form>
            </Formik>
        </>
    );
};

export default ChangePassword;
