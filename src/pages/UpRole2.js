import React, {useState} from 'react';
import * as Yup from "yup";
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Swal from "sweetalert2";

const validationSchema = Yup.object().shape({
    address: Yup.string().required('Address is required'),
    fullName: Yup.string().required('FullName is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().required('Phone is required')
});

const UpRole2 = () => {
    let account = JSON.parse(localStorage.getItem('account'));
    const [img1, setImg1] = useState();
    const [img2, setImg2] = useState();
    const fileToString = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                const result = reader.result;
                resolve(result);
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsDataURL(file);
        });
    };


    const handlePreviewImg1 = e => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file)
        setImg1(file)
    }
    const handlePreviewImg2 = e => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file)
        setImg2(file)
    }


    const handleSubmit = (values, {setSubmitting}) => {
        values.img1 = img1.preview;
        values.img2 = img2.preview;
        axios.post("http://localhost:8081/admin/registration/req/" + account.id, values)
            .then(response => {
                // Xử lý response từ server (nếu cần)
                console.log(response);

                Swal.fire({
                    icon: 'success',
                    title: 'Sign Up Success!',
                    text: 'You have successfully registered. Waiting for approval from Admin.',
                });

            })
            .catch(error => {
                // Xử lý lỗi (nếu có)
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Registration failed',
                    text: 'Please double check the entered fields',
                });
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <>
            <div className="create-agency-area pt-115 pb-120">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
                            <div className="agency-container">
                                <Formik initialValues={{
                                    address: '', fullName: '', email: '', phone: '', img1: ''
                                }}
                                        validationSchema={validationSchema}
                                        onSubmit={handleSubmit}>
                                    {({isSubmitting}) => (

                                        <Form action="#" method="post">

                                            <h4 className="details-title text-center mb-43">
                                                Register to become a landlord
                                            </h4>
                                            <h4 className="details-title text-medium mb-23 pt-24">
                                                Provide more information
                                            </h4>

                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <Field
                                                        type="text"
                                                        name="address"
                                                        placeholder="Address"
                                                        className="mb-28"
                                                    />
                                                    <p style={{color: "red"}} className="error-message">
                                                        <ErrorMessage name="address" component="div" className="error"/>

                                                    </p>
                                                </div>
                                                <div className="col-lg-6">
                                                    <Field
                                                        type="text"
                                                        name="fullName"
                                                        placeholder="FullName"
                                                        className="mb-28"
                                                    />
                                                    <p style={{color: "red"}} className="error-message">
                                                        <ErrorMessage name="fullName" component="div"
                                                                      className="error"/>
                                                    </p>

                                                </div>
                                                <div className="col-lg-6">
                                                    <Field
                                                        type="email"
                                                        name="email"
                                                        placeholder="Email"
                                                        className="mb-28"
                                                    />
                                                    <p style={{color: "red"}} className="error-message">
                                                        <ErrorMessage name="email" component="div" className="error"/>

                                                    </p>
                                                    <ErrorMessage name="email" component="div" className="error"/>
                                                </div>
                                                <div className="col-lg-6">
                                                    <Field
                                                        type="text"
                                                        name="phone"
                                                        placeholder="Phone"
                                                        className="mb-28"
                                                    />
                                                    <p style={{color: "red"}} className="error-message">
                                                        <ErrorMessage name="phone" component="div" className="error"/>

                                                    </p>
                                                    <ErrorMessage name="phone" component="div" className="error"/>
                                                </div>
                                                <div className="col-lg-6">

                                                    <label>ID card front face</label>

                                                    <input type="file" name="img1" accept=".jpeg, .jpg, .png"
                                                           onChange={handlePreviewImg1}/>

                                                    {
                                                        img1 && (
                                                            <img src={img1.preview} width={"500"} height={"300"}/>
                                                        )
                                                    }


                                                </div>
                                                <div className="col-lg-6">


                                                    <label>ID card on the back</label>

                                                    <input type="file" name="img2" accept=".jpeg, .jpg, .png"
                                                           onChange={handlePreviewImg2}/>

                                                    {
                                                        img2 && (
                                                            <img src={img2.preview} width={"500"} height={"300"}/>
                                                        )
                                                    }


                                                </div>

                                            </div>
                                            <div>
                                                <br/>
                                                <br/>
                                            </div>
                                            <div className="text-center">
                                                <button type="submit" className="btn btn-success btn-submit">Submit
                                                </button>
                                            </div>
                                        </Form>)}
                                </Formik>
                            </div>

                            <div className="property-package">
                                <h4 className="details-title text-medium mb-24 pt-30">
                                    Select a Package
                                </h4>
                                <div className="row">
                                    <div className="col-lg-4 pl-12 pr-12 text-center">
                                        <div className="single-package">
                                            <div className="package-title bg-violet pt-23 pb-23">
                                                <h4 className="text-white text-uppercase">Basic</h4>
                                            </div>
                                            <div className="package-list pt-37 pb-25">
                                                <span className="block dark mb-25">Fee $0</span>
                                                <span className="block mb-27">Property Sumbit 1</span>
                                                <span className="block mb-27">Agent Profiles 1</span>
                                                <span className="block mb-27">Agent Profiles 1</span>
                                                <span className="block mb-43">No Featured Properties</span>
                                                <button type="button" className="button text-white">
                                                    Select
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 pl-12 pr-12 text-center">
                                        <div className="single-package">
                                            <div className="package-title bg-violet pt-23 pb-23">
                                                <h4 className="text-white text-uppercase">SILVER</h4>
                                            </div>
                                            <div className="package-list pt-37 pb-25">
                                                <span className="block dark mb-25">Fee $15</span>
                                                <span className="block mb-27">Property Sumbit 30</span>
                                                <span className="block mb-27">Agent Profiles 15</span>
                                                <span className="block mb-27">Agent Profiles 10</span>
                                                <span className="block mb-43">Featured Properties</span>
                                                <button type="button" className="button text-white">
                                                    Select
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 pl-12 pr-12 text-center">
                                        <div className="single-package">
                                            <div className="package-title bg-violet pt-23 pb-23">
                                                <h4 className="text-white text-uppercase">Gold</h4>
                                            </div>
                                            <div className="package-list pt-37 pb-25">
                                                <span className="block dark mb-25">Fee $28</span>
                                                <span className="block mb-27">
                      Property Sumbit unlimited
                    </span>
                                                <span className="block mb-27">
                      Agent Profiles unlimited
                    </span>
                                                <span className="block mb-27">
                      Agent Profiles unlimited
                    </span>
                                                <span className="block mb-43">Featured Properties</span>
                                                <button type="button" className="button text-white">
                                                    Select
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default UpRole2;