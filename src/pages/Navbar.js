import React from 'react';


const Navbar = () => {
    return (
        <>
            <header className="header-area">
                <div id="sticky-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-2">
                                <div className="logo">
                                    <a href="index.html">
                                        <img src="images/logo/logo.png" alt="DomInno" />
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-10 d-none d-lg-block">
                                <div className="pull_right">
                                    <nav id="primary-menu">
                                        <ul
                                            className="main-menu text-right"
                                            style={{ marginTop: "-25px" }}
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
                                                            <a style={{ cursor: "pointer" }}>Login</a>
                                                            <div className="login-form">
                                                                <h4>Login</h4>
                                                                <form action="#" method="post">
                                                                    <div className="input-box mb-19">
                                                                        <i className="fa fa-user" />
                                                                        <input
                                                                            type="text"
                                                                            name="user-name"
                                                                            placeholder="Username"
                                                                        />
                                                                    </div>
                                                                    <div className="input-box">
                                                                        <i className="fa fa-lock" />
                                                                        <input
                                                                            type="password"
                                                                            name="user-password"
                                                                            placeholder="Password"
                                                                        />
                                                                    </div>
                                                                    <div className="social-links mt-25">
                                                                        <a href="#">
                                                                            <i className="fa fa-facebook" />
                                                                        </a>
                                                                        <a href="#">
                                                                            <i className="fa fa-google-plus" />
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
                                                            <a style={{ cursor: "pointer" }}>Register</a>
                                                            <div className="login-form">
                                                                <h4>Sign Up</h4>
                                                                <form>
                                                                    <div className="input-box mb-19">
                                                                        <i className="fa fa-user" />
                                                                        <input
                                                                            type="text"
                                                                            name="username"
                                                                            placeholder="Username"
                                                                        />
                                                                    </div>
                                                                    <div className="input-box mb-19">
                                                                        <i className="fa fa-phone" />
                                                                        <input
                                                                            type="password"
                                                                            name="phone"
                                                                            placeholder="Phone"
                                                                        />
                                                                    </div>
                                                                    <div className="input-box mb-19">
                                                                        <i className="fa fa-lock" />
                                                                        <input
                                                                            type="text"
                                                                            name="password"
                                                                            placeholder="Password"
                                                                        />
                                                                    </div>
                                                                    <div className="input-box mb-19">
                                                                        <i className="fa fa-lock" />
                                                                        <input
                                                                            type="text"
                                                                            name="confirmPassword"
                                                                            placeholder="ConfirmPassword"
                                                                        />
                                                                    </div>
                                                                    <div className="button-box mt-20">
                                                                        <button
                                                                            type="submit"
                                                                            className="register-btn button lemon pull_right"
                                                                        >
                                                                            Sign Up
                                                                        </button>
                                                                    </div>
                                                                </form>
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