import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie"

import instance from "../utils/axiosRequest.js";
import { UserInfo } from "../stores/user.store.jsx";

import LoginFacebook from "../components/LoginFacebook.jsx";
import LoginGoogle from "../components/LoginGoogle.jsx";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [messageLogin, setMessageLogin] = useState(false);
  const { profile } = useContext(UserInfo);
  const navigate = useNavigate();
  useEffect(() => {
    !!profile && navigate("/learning");
  }, [profile]);
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm();
  useEffect(() => {
    setFocus("email");
  }, [setFocus]);
  const onSubmit = async (data) => {
    if (!data) return;
    try {
      await instance.post("login", data).then((result) => {
        setMessageLogin(result?.data?.message);
        Cookies.set("token", result?.data?.data?.accessToken, {expires: 30} )
        result?.data ? window.location.href = "http://localhost:5173/learning" : ''
      });
    } catch (error) {
      setMessageLogin(error?.response?.data?.message);
    }
  };
  const handleLoginWithFacebook = async(response) => {
    try {
      const result = await instance.post('facebook_login', {
        accessToken: response.accessToken
      })
      Cookies.set("token", result?.data?.data?.accessToken, {expires: 30} )
      result?.data ? window.location.href = "http://localhost:5173/learning" : ''
    } catch (error) {
      setMessageLogin(error?.response?.data?.message)
    }
  }
  return (
    <>
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-r from-pink-400 to-blue-600">
        <div className="flex h-auto w-[35rem] flex-col bg-white p-6">
          <div className="mb-5 flex w-full">
            <img src="/images/pngtree.png" className="lazyload w-[8rem]" />
            <p className="ml-3 flex items-center justify-center font-noto text-3xl font-bold">
              Chào mừng bạn tới Duylingo
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("email", {
                required: "Nhập email của bạn",
                validate: (value) => {
                  if (!value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
                    return "Vui lòng nhập đúng email của bạn";
                  }
                  return true;
                },
              })}
              type="text"
              placeholder="Email"
              name="email"
              className="mb-[1rem] w-full border border-inherit p-2 pl-3 font-noto outline-none"
            />
            <br />
            {errors.email && (
              <p className="mb-2 text-red-500">{errors.email.message}</p>
            )}
            <div className="relative">
              <input
                {...register("password", {
                  required: "Nhập mật khẩu của bạn",
                  validate: (value) => {
                    if (!value.match(/^[A-Za-z0-9]+$/)) {
                      return "Vui lòng nhập mật khẩu của bạn";
                    }
                    return true;
                  },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                name="password"
                className="mb-[1rem] w-full border border-inherit p-2 pl-3 font-noto outline-none"
              />
              {showPassword ? (
                <i
                  className="fa-solid fa-eye-slash absolute right-3 top-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              ) : (
                <i
                  className="fa-solid fa-eye absolute right-3 top-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              )}
              <br />
              {errors.password && (
                <p className="mb-2 text-red-500">{errors.password.message}</p>
              )}
            </div>
            <button className="h-16 w-full bg-gradient-to-r from-pink-400 to-blue-600 p-2 text-2xl font-bold text-white hover:text-black">
              {isSubmitting ? "Đang gửi" : "Đăng Nhập"}
            </button>
            {messageLogin && (
              <p className="mt-1 w-full text-center font-noto text-xl text-red-500">
                {messageLogin}
              </p>
            )}
          </form>
          <Link
            to="/forgot_password"
            className="mt-[0.3rem] w-full cursor-pointer font-noto text-sky-500"
          >
            Quên mật khẩu?
          </Link>
          <p className="mt-2 font-noto">
            Bạn chưa có đã có tài khoản?{" "}
            <Link
              to="/register"
              className="font-noto text-[1.1rem] font-bold text-blue-700"
            >
              Đăng Ký
            </Link>
          </p>
          <div className="mt-4 w-full md:flex md:flex-row">
            <LoginGoogle />
            <LoginFacebook handleLoginWithFacebook={handleLoginWithFacebook}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
