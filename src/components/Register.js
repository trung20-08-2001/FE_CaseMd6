import React from 'react';
import axios from "axios";
import {Formik, Form, Field, useFormik, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';


const SignupSchema = Yup.object().shape({
    username: Yup.string().required("Trường này không ược để trống").matches(/^[a-zA-Z0-9]*$/, 'Phải là chữ hoặc số'),
    phone: Yup.string().required('Trường này không được để trống').matches(/^[0-9]{1,10}$/, 'Phải là số và tối đa 10 chữ số'),
    password: Yup.string().required('Mật khẩu không được để trống').min(6, 'Mật khẩu phải có ít nhất 6 kí tự').max(32, 'Mật khẩu không được vượt quá 32 kí tự'),
    confirmPassword: Yup.string().required("Mật khẩu không được để trống").oneOf([Yup.ref("password")], "phải nhập đúng mật khẩu vừa nhập")
});

const Register = () => {
    return (<>
        <Formik
            initialValues={{
                username: '',
                phone: '',
                password: '',
                confirmPassword: ''
            }}
            validationSchema={SignupSchema}
            onSubmit={async values => {
                try {
                    console.log(values)
                    const response = await axios.post("http://localhost:8080/accounts/register", values);
                    console.log(response)
                    if(response.data==='') {
                        let account={
                            ...values,
                            role:{id:3},
                            status:{id:1},
                            avatar:"https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-image-700-205124837.jpg"
                        }
                        axios.post("http://localhost:8080/accounts/createAccount", account);
                        Swal.fire({
                            icon: 'success',
                            title: 'Đăng ký thành công!',
                            text: 'Bạn đã đăng ký thành công tài khoản.',
                        });
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Đăng ký thất bại',
                            text: 'Đăng ký tài khoản không thành công. Username hoặc phone đã tồn tại',
                        });
                    }
                } catch (error) {
                    console.error(error);
                    // alert("Đăng ký thất bại");
                }
            }}

        >
            <Form>
                <div className="input-box mb-50">
                    <i className="fa fa-user"/>
                    <Field
                        type="text"
                        name="username"
                        placeholder="Username"
                    />
                    <ErrorMessage name="username" component="div"
                                  className="error-message"/>
                </div>
                <div className="input-box mb-50">
                    <i className="fa fa-user"/>
                    <Field
                        type="text"
                        name="phone"
                        placeholder="Phone"
                    />
                    <ErrorMessage name="password" component="div"
                                  className="error-message"/>
                </div>
                <div className="input-box mb-50">
                    <i className="fa fa-lock"/>
                    <Field
                        type="password"
                        name="password"
                        placeholder="Password"
                    />
                    <ErrorMessage name="password" component="div"
                                  className="error-message"/>
                </div>
                <div className="input-box mb-50">
                    <i className="fa fa-lock"/>
                    <Field
                        type="password"
                        name="confirmPassword"
                        placeholder="ConfirmPassword"
                    />
                    <ErrorMessage name="confirmPassword"
                                  component="div"
                                  className="error-message"/>
                </div>
                <div className="button-box mb-30">
                    <button
                        type="submit"
                        className="register-btn button lemon pull_right"
                    >
                        Sign Up
                    </button>
                </div>
            </Form>
        </Formik>
        </>);
};

export default Register;