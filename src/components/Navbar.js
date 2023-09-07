import React, {useState} from 'react';
import axios from "axios";
import Register from './Register';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../services/accountService';
import ReactModal from 'react-modal';
import "../assets/styleModal.css"
import Swal from "sweetalert2";


const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Thêm state cho trạng thái đăng nhập
    const account = useSelector(state => state.account.account);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

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


        axios.post("http://localhost:8081/api/login", account)
            .then(resp => {
                console.log(resp)
                Swal.fire({
                    icon: 'success',
                    title: 'Đăng nhập thành công!',
                    text: 'Bạn đã đăng nhập thành công tài khoản.',
                });
                localStorage.setItem("account", JSON.stringify(resp.data));
                dispatch(login(resp.data))
                setErrorMessage('');
                setIsLoggedIn(true); // Đánh dấu đã đăng nhập thành công
                setUsername('')
                setPassword('')


            })
            .catch(function (err) {
                if (err.response && err.response.status === 401) {
                    setIsModalOpen(true)
                } else {
                    console.log(err)
                    setErrorMessage('Tên đăng nhập hoặc mật khẩu không chính xác.');
                }
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
                                    <Link to="/">
                                        <img src="images/logo/logo.png" alt="DomInno"/>
                                    </Link>
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
                                                {account !== null && (
                                                    <>
                                                        <a
                                                            style={{
                                                                display: 'inline-block',
                                                                border: '0px solid #0d0d0d',
                                                                borderRadius: '4px',
                                                                backgroundColor: '#ffffff',
                                                                padding: '8px 12px',
                                                                cursor: 'pointer',
                                                                textDecoration: 'none',
                                                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                                                transition: 'box-shadow 0.3s ease',
                                                            }}
                                                        >
                                                            <i className="fa fa-bars"></i>
                                                            <img
                                                                style={{
                                                                    borderRadius: '50%',
                                                                    width: 35,
                                                                    height: 35,
                                                                }}
                                                                src={account.avatar}
                                                                alt="Avatar"
                                                            />
                                                        </a>
                                                        <ul className="dropdown">


                                                            {account.role.id === 1 &&
                                                                <>
                                                                    <li>
                                                                        <Link to="admin">Quản lý tài khoản người dùng</Link>
                                                                    </li>

                                                                    <li>
                                                                        <Link to={"/admin/vendors"}>Quản lý tài khoản
                                                                            chủ nhà</Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link to={`/edit_profile/${account.id}`}>Thay
                                                                            đổi
                                                                            thông tin</Link>
                                                                    </li>
                                                                </>
                                                            }
                                                            {account.role.id === 2 &&
                                                                <>
                                                                    <li>
                                                                        <a>Đăng tin cho thuê</a>
                                                                    </li>
                                                                    <li>
                                                                        <a>Quản lý các phòng thuê</a>
                                                                    </li>
                                                                    <li>
                                                                        <a>Thông tin cá nhân</a>
                                                                    </li>
                                                                    <li>
                                                                        <Link to={`/edit_profile/${account.id}`}>Thay
                                                                            đổi
                                                                            thông tin</Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link to={"changePassword"}>
                                                                            Đổi mật khẩu
                                                                        </Link>
                                                                    </li>

                                                                </>
                                                            }
                                                            {account.role.id === 3 &&
                                                                <>
                                                                    <li>
                                                                        <a>Thông tin cá nhân</a>
                                                                    </li>
                                                                    <li>
                                                                        <Link to={`/edit_profile/${account.id}`}>Thay
                                                                            đổi
                                                                            thông tin</Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link to={"changePassword"}>
                                                                            Đổi mật khẩu
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link to={"/user"}>
                                                                            Trở thành người cho thuê
                                                                        </Link>
                                                                    </li>
                                                                </>
                                                            }
                                                            <li>
                                                                <Link to={`/bills_user/${account.id}`}>Lịch sử giao dịch</Link>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    onClick={
                                                                        () => {
                                                                            localStorage.removeItem("account");
                                                                            dispatch(login(JSON.parse(localStorage.getItem("account"))))
                                                                            navigate('/')
                                                                        }
                                                                    }>Đăng xuất</a></li>
                                                        </ul>
                                                    </>

                                                )}


                                                {account === null && ( // Hiển thị phần đăng nhập chỉ khi chưa đăng nhập thành công

                                                    <div className="header-login-register">
                                                        <ul className="login">
                                                            <li>
                                                                <a style={{cursor: "pointer"}}>Login</a>
                                                                <div className="login-form">
                                                                    <h4>Login</h4>
                                                                    <form onSubmit={handleLogin}>
                                                                        <ReactModal
                                                                            isOpen={isModalOpen}
                                                                            onRequestClose={handleCloseModal}
                                                                            contentLabel="Thông báo"
                                                                            className="custom-modal"
                                                                            overlayClassName="custom-overlay"
                                                                        >
                                                                            <h4>Tài khoản của bạn đã bị khóa!</h4>
                                                                            <p>Vui lòng liên hệ với quản trị viên để
                                                                                biết thêm thông tin chi tiết.</p>
                                                                            <button className="close-button"
                                                                                    onClick={handleCloseModal}>Close
                                                                            </button>
                                                                        </ReactModal>
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
                                                                            <p style={{color: "red"}}
                                                                               className="error-message">
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
