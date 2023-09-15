import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import "./vendor/bootstrap/css/bootstrap.min.css"
import "./fonts/font-awesome-4.7.0/css/font-awesome.min.css"
import "./fonts/iconic/css/material-design-iconic-font.min.css"
import "./fonts/iconic/css/material-design-iconic-font.min.css"
import "./vendor/animate/animate.css"
import "./vendor/css-hamburgers/hamburgers.min.css"
import "./vendor/animsition/css/animsition.min.css"
import "./vendor/select2/select2.min.css"
import "./vendor/daterangepicker/daterangepicker.css"
import "./css/util.css"
import "./css/main.css"
import { login } from "../../services/accountService"
import { useDispatch, useSelector } from 'react-redux';
import "../../assets/styleModal.css"
import customAxios from '../../services/api'
import Swal from "sweetalert2";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');




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

    customAxios.post("/api/login", account)
      .then(resp => {
        Swal.fire({
          icon: 'success',
          title: 'Đăng nhập thành công!',
          text: 'Bạn đã đăng nhập thành công tài khoản.',
        });
        localStorage.setItem("account", JSON.stringify(resp.data));
        dispatch(login(resp.data))
        setErrorMessage('');
        setUsername('')
        setPassword('')
        navigate("/")
      })
      .catch(function (err) {
        if (err.response && err.response.status === 401) {
          Swal.fire({
            icon: 'success',
            title: 'Đăng nhập thất bại!',
            text: "Tài khoản của bạn đã bị khóa",
          });
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
      <div className="limiter">
        <div
          className="container-login100"
          style={{ backgroundImage: 'url("../images/bg/bg-01.jpg")' }}
        >
          <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
            <form className="login100-form validate-form">
              <span className="login100-form-title p-b-49">Login</span>
              <div
                className="wrap-input100 validate-input m-b-23"
                data-validate="Username is reauired"
              >
                <span className="label-input100">Username</span>
                <input
                  className="input100"
                  type="text"
                  name="username"
                  placeholder="Type your username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
                <span className="focus-input100" data-symbol="&#xf206;" />
              </div>
              <div
                className="wrap-input100 validate-input"
                data-validate="Password is required"
              >
                <span className="label-input100">Password</span>
                <input
                  className="input100"
                  type="password"
                  name="pass"
                  placeholder="Type your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <span className="focus-input100" data-symbol="&#xf190;" />
              </div>
              {errorMessage && (
                <p style={{ color: "red" }}
                  className="error-message">
                  {errorMessage}
                </p>
              )}
              <div className="text-right p-t-8 p-b-31">
                <a >Forgot password?</a>
              </div>
              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn" />
                  <button className="login100-form-btn" onClick={handleLogin}>Login</button>
                </div>
              </div>
              <div className="txt1 text-center p-t-54 p-b-20">
                <span>Or Sign Up Using</span>
              </div>
              <div className="flex-c-m">
                <a className="login100-social-item bg1">
                  <i className="fa fa-facebook" />
                </a>

                <a className="login100-social-item bg3">
                  <i className="fa fa-google" />
                </a>
              </div>
              <div className="flex-col-c p-t-10">
                <span className="txt1 p-b-17">Do not have an account?</span>
                <Link to="/register" className="txt2">
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login


