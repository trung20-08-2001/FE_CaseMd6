import React from 'react';


const Navbar = () => {
    let account =JSON.parse(localStorage.getItem('account'));
    account={id:1,role:{name:"ROLE_HOST"}}
    
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
                                        <ul className="main-menu text-right"
                                            style={{ marginTop: "-25px" }} >
                                            <li>
                                                {account !==null && 
                                               <>
                                               <a>
                                                 <img
                                                   style={{ borderRadius: "50%", borderColor: "#0d0d0d" }}
                                                   width={50}
                                                   height={50}
                                                   src={account.avatar}
                                                 />
                                               </a>
                                               <ul className="dropdown">
                                                 <li>
                                                   <a>INFORMATION</a>
                                                 </li>
                                                 <li>
                                                   <a>ORDER HISTORY</a>
                                                 </li>
                                                 {account.role.name=== "ROLE_HOST" && 
                                                 <li>
                                                   <a>MANAGER MY HOUSE</a>
                                                 </li>}
                                                 {account.role.name=== "ROLE_ADMIN" && 
                                                 <li>
                                                   <a>MANAGER ACCOUNT</a>
                                                 </li>     
                                                 }
                                                 <li>
                                                   <a>Log out</a>
                                                 </li>
                                               </ul>
                                             </>
                                             }
                                                {account ===null && 
                                                <>
                                                <div className="header-login-register">
                                                    <ul className="login">
                                                        <li>
                                                            <a style={{ cursor: "pointer" }}>Login</a>
                                                            <div className="login-form">
                                                                <h4>Login</h4>
                                                                <form >
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
                                                                        <a >
                                                                            <i className="fa fa-facebook" />
                                                                        </a>
                                                                        <a >
                                                                            <i className="fa fa-google-plus" />
                                                                        </a>
                                                                        <button
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
                                                </>}
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