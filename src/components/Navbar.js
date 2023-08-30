import React, {useState} from 'react';
import axios from "axios";
import Register from "../components/Register";


const Navbar = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Thêm state cho trạng thái đăng nhập


    const handleLogin = async (event) => {
        event.preventDefault();
        // Kiểm tra các trường đăng nhập
        if (!isValidInput(username) || !isValidInput(password)) {
            setErrorMessage('Tên đăng nhập và mật khẩu chỉ được chứa chữ cái và số.');
            return;
        }

        const account = {
            username: username,
            password: password
        }

        axios.post("http://localhost:8080/api/login", account)
            .then(data => {
                // console.log(data)
                localStorage.setItem("account",JSON.stringify(data.data));
                setErrorMessage('');
                setIsLoggedIn(true); // Đánh dấu đã đăng nhập thành công
            })
            .catch(function (err) {
                console.log(err)
                setErrorMessage('Tên đăng nhập hoặc mật khẩu không chính xác.');
            })

    };
    
    const isValidInput = (input) => {
        const regex = /^[a-zA-Z0-9]+$/;
        return regex.test(input);
    };


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
                                                {isLoggedIn && (
                                                    <>
                                                        <a>
                                                            <i
                                                                className="fa fa-bars"></i>
                                                            <img
                                                                style={{ borderRadius: "50%", borderColor: "#0d0d0d" }}
                                                                width={35}
                                                                height={35}
                                                                src="https://khoinguonsangtao.vn/wp-content/uploads/2022/02/anh-dai-dien-fb-dep.jpg"
                                                            />
                                                        </a>
                                                        <ul className="dropdown">
                                                            <li>
                                                                <a>Đăng tin</a>
                                                            </li>
                                                            <li>
                                                                <a>Thông tin cá nhân</a>
                                                            </li>
                                                            <li>
                                                                <a>Lịch sử giao dịch</a>
                                                            </li>
                                                            <li>
                                                                <a>Đăng xuất</a>
                                                            </li>
                                                        </ul>
                                                    </>

                                                )}


                                                {!isLoggedIn && ( // Hiển thị phần đăng nhập chỉ khi chưa đăng nhập thành công

                                                    <div className="header-login-register">
                                                    <ul className="login">
                                                        <li>
                                                            <a style={{cursor: "pointer"}}>Login</a>
                                                            <div className="login-form">
                                                                <h4>Login</h4>
                                                                <form onSubmit={handleLogin}>
                                                                    <div className="input-box mb-19">
                                                                        <i className="fa fa-user"/>
                                                                        <input
                                                                            type="text"
                                                                            value={username}
                                                                            placeholder="Username"
                                                                            onChange={(event) => setUsername(event.target.value)}
                                                                        />
                                                                    </div>
                                                                    <div className="input-box">
                                                                        <i className="fa fa-lock"/>
                                                                        <input
                                                                            type="password"
                                                                            value={password}
                                                                            placeholder="Password"
                                                                            onChange={(event) => setPassword(event.target.value)}

                                                                        />
                                                                    </div>
                                                                    {errorMessage && (
                                                                        <p style={{ color: "red" }} className="error-message">
                                                                            {errorMessage}
                                                                        </p>
                                                                    )}
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
                                                )}

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