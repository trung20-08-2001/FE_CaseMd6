import React, {useState} from 'react';
import Register from "../components/Register";


const Navbar = () => {
    // const formik = useFormik({
    //     initialValues: {
    //         username: '',
    //         phone: '',
    //         password: '',
    //         confirmPassword: ''
    //     },
    //     validationSchema: Yup.object({
    //         username: Yup.string().required("Trường này không ược để trống").matches(/^[a-zA-Z0-9]*$/, 'Phải là chữ hoặc số'),
    //         phone: Yup.string().required('Trường này không được để trống').matches(/^[0-9]{1,10}$/, 'Phải là số và tối đa 10 chữ số'),
    //         password: Yup.string().required('Mật khẩu không được để trống').min(6, 'Mật khẩu phải có ít nhất 6 kí tự').max(32, 'Mật khẩu không được vượt quá 32 kí tự'),
    //         confirmPassword: Yup.string().required("Mật khẩu không được để trống").oneOf([Yup.ref("password")], "phải nhập đúng mật khẩu vừa nhập")
    //     })
    // })
    // const [account, setAccount] = useState({});

    // const handleInputChange = (e) => {
    //     const {name, value} = e.target;
    //     setAccount({...account, [name]: value});
    // };

    // const create = () => {
    //     axios.post("http://localhost:8080/accounts/createAccount", account)
    //         .then(data => {
    //             alert("đăng kí thành công")
    //         })
    //         .catch(error => console.log(error))
    // }
    return (
        <>
            <header className="header-area">
                <div id="sticky-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-2">
                                <div className="logo">
                                    <a href="index.html">
                                        <img src="images/logo/logo.png" alt="DomInno"/>
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-10 d-none d-lg-block">
                                <div className="pull_right">
                                    <nav id="primary-menu">
                                        <ul
                                            className="main-menu text-right"
                                            style={{marginTop: "-25px"}}
                                        >
                                            <li>
                                                {/*                                            <a><img style="border-radius: 50%;border-color: #0d0d0d" width="50"*/}
                                                {/*                                                    height="50"*/}
                                                {/*                                                    src="https://khoinguonsangtao.vn/wp-content/uploads/2022/02/anh-dai-dien-fb-dep.jpg"></a>*/}
                                                {/*                                            <ul class="dropdown">*/}
                                                {/*                                                <li><a>Thông tin cá nhân</a></li>*/}
                                                {/*                                                <li><a>Lịch sử giao dịch</a></li>*/}
                                                {/*                                                <li><a>Đăng xuất</a></li>*/}
                                                {/*                                            </ul>*/}
                                                <div className="header-login-register">
                                                    <ul className="login">
                                                        <li>
                                                            <a style={{cursor: "pointer"}}>Login</a>
                                                            <div className="login-form">
                                                                <h4>Login</h4>
                                                                <form action="#" method="post">
                                                                    <div className="input-box mb-19">
                                                                        <i className="fa fa-user"/>
                                                                        <input
                                                                            type="text"
                                                                            name="user-name"
                                                                            placeholder="Username"
                                                                        />
                                                                    </div>
                                                                    <div className="input-box">
                                                                        <i className="fa fa-lock"/>
                                                                        <input
                                                                            type="password"
                                                                            name="user-password"
                                                                            placeholder="Password"
                                                                        />
                                                                    </div>
                                                                    <div className="social-links mt-25">
                                                                        <a href="#">
                                                                            <i className="fa fa-facebook"/>
                                                                        </a>
                                                                        <a href="#">
                                                                            <i className="fa fa-google-plus"/>
                                                                        </a>
                                                                        <button
                                                                            type="submit"
                                                                            className="register-btn button lemon pull_right"
                                                                        >
                                                                            Login
                                                                        </button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    <ul className="login">
                                                        <li>
                                                            <a style={{cursor: "pointer"}}>Register</a>
                                                            <div className="login-form">
                                                                <h4>Sign Up</h4>
                                                               <Register/>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <hr/>
        </>
    );
};

export default Navbar;