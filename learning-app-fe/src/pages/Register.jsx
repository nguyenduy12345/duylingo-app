import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie"

import instance from "../utils/axiosRequest.js";
import { UserInfo } from "../stores/user.store.jsx";
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rePassword, setRepassword] = useState("");
  const [messagePassword, setMessagePassword] = useState(false);
  const [messageRegister, setMessageRegister] = useState(false);
  const navigate = useNavigate()
  const { profile } = useContext(UserInfo)
  useEffect(() => {
    !!profile && navigate('/learning')
  },[profile])
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm();
  useEffect(() => {
    setFocus("fullName");
  }, [setFocus]);
  useEffect(() => {
    setMessagePassword(false);
  }, [rePassword]);
  const onSubmit = async (data) => {
    if (!data) return;
    if (rePassword !== data.password) {
      setMessagePassword("Xác nhận mật khẩu sai");
      return;
    }
    const { fullName, email, password } = data;
    try {
      await instance.post("register", { fullName, email, password })
      await instance.post("login", {
        email,
        password
      })
      .then((result) => {
        Cookies.set("token", result?.data?.data?.accessToken, {expires: 30} )
        result?.data ? window.location.href = "http://localhost:5173/learning " : ''
      })      
    } catch (error) {
      setMessageRegister(error?.response?.data?.message)
    }
  };
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-r from-pink-400 to-blue-600">
      <div className="flex h-auto w-[35rem] flex-col bg-white p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h4 className="mb-4 w-full text-center text-3xl font-bold font-noto">
            Tạo tài khoản
          </h4>
          <input
            name="fullName"
            {...register("fullName", {
              required: "Nhập tên tài khoản của bạn",

              validate: (value) => {
                if(!value.match(/^[A-Za-z0-9]+$/)){
                    return 'Vui lòng nhập họ và tên bạn'
                }
                return true
              },
              maxLength: {
                value: 255,
                message: "Trường tên quá dài, vui lòng nhập lại",
              },
            })}
            type="text"
            placeholder="Họ và tên"
            className="mb-[0.5rem] w-full border border-inherit p-2 pl-3 outline-none font-noto"
          />
          <br />
          {errors.fullName && (
            <p className="mb-2 text-red-500">{errors.fullName.message}</p>
          )}
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
            className="mb-[0.5rem] w-full border border-inherit p-2 pl-3 outline-none font-noto"
          />
          <br />
          {errors.email && (
            <p className="mb-2 text-red-500">{errors.email.message}</p>
          )}
          <div className="relative">
            <input
              {...register("password", {
                required: "Nhập mật khẩu của bạn",
                minLength: {
                  value: 6,
                  message: "Mật khẩu phải nhiều hơn 6 ký tự",
                },
                validate: (value) => {
                  if(!value.match(/^[A-Za-z0-9]+$/)){
                      return 'Vui lòng nhập mật khẩu của bạn'
                  }
                  return true
                },
              })}
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              className="mb-[0.5rem] w-full border border-inherit p-2 pl-3 outline-none font-noto"
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
              <p className="mb-2 text-red-500 font-noto">{errors.password.message}</p>
            )}
          </div>
          <div className="relative">
            <input
              {...register("rePassword", {
                required: "Xác nhận lại mật khẩu của bạn",
              })}
              onChange={(e) => setRepassword(e.target.value)}
              name="rePassword"
              type={showPassword ? "text" : "password"}
              placeholder="Xác nhận mật khẩu"
              className="mb-[0.5rem] w-full border border-inherit p-2 pl-3 outline-none font-noto"
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
            {errors.rePassword && (
              <p className="mb-2 text-red-500 font-noto">{errors.rePassword.message}</p>
            )}
            {messagePassword && (
              <p className="mb-2 text-red-500 font-noto">{messagePassword}</p>
            )}
          </div>
          <button className="h-16 w-full bg-gradient-to-r from-pink-400 to-blue-600 p-2 text-2xl font-bold text-white hover:text-black font-noto">
            {isSubmitting ? "Đang Gửi..." : "Đăng Ký"}
          </button>
          {messageRegister && (
            <p className="mb-2 p-1 text-center text-red-500 font-noto">
              {messageRegister}
            </p>
          )}
        </form>
        <p className="mt-2 font-noto">
          Bạn đã có tài khoản?{" "}
          <Link to="/login" className="text-[1.1rem] font-bold font-noto text-blue-700">
            Đăng nhập
          </Link>
        </p>
        <p className="mt-3 font-noto">
          Khi đăng ký trên Duylingo, bạn đã đồng ý với{" "}
          <Link to="" className="font-medium font-noto">
            Các chính sách
          </Link>
            và 
          <Link to="" className="font-medium font-noto">
            Chính sách bảo mật
          </Link>
           của chúng tôi.
        </p>
        <p className="mt-3 font-noto">
          Trang này được bảo vệ bởi tập đoàn{" "}
          <span className="font-medium font-noto">reCAPTCHA</span> và theo{" "}
          <Link to="" className="font-medium font-noto">
            Chính sách bảo mật
          </Link>
            và{" "}
          <Link to="" className="font-medium font-noto">
            Điều khoản dịch vụ của Google
          </Link>
           .
        </p>
      </div>
    </div>
  );
};

export default Register;
