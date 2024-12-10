import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import instance from "../utils/axiosRequest.js";
import { UserInfo } from "../stores/user.store.jsx";

const ForgotPassword = () => {
  const [message, setMessage] = useState(false);
  const { profile } = useContext(UserInfo)
  const navigate = useNavigate()
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
    setFocus("email");
  }, [setFocus]);
  const onSubmit = async (data) => {
    if(!data) return
    try {
      await instance.post('users/forgot_password', data)
      .then((result) => {  
        setMessage('Mật khẩu đã được gửi vào email của bạn')
      })   
    } catch (error) {
      setMessage(error?.response?.data?.message)
    }
  };
  return (
    <>
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-r from-pink-400 to-blue-600">
      <div className="relative flex justify-center items-center h-screen">
    </div>
        <div className="flex h-auto w-[35rem] flex-col bg-white p-6">
          <div className="mb-5 flex w-full">
            <img src="/images/pngtree.png" className="w-[8rem] lazyload" />
            <p className="ml-3 flex items-center justify-center text-3xl font-bold font-noto">
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
              placeholder="Nhập email của bạn để lấy lại mật khẩu"
              name="email"
              className="mb-[1rem] w-full border border-inherit p-4 pl-3 outline-none font-noto"
            />
            <br />
            {errors.email && (
              <p className="mb-2 text-red-500">
                {errors.email.message}
              </p>
            )}
            {message && (
              <p className="mb-2 w-full text-left text-xl text-red-500 font-noto">
                {message}
              </p>
            )}
            <button className="h-16 w-full bg-gradient-to-r from-pink-400 to-blue-600 p-2 text-2xl font-bold text-white hover:text-black">
              {isSubmitting ? 'Đang gửi...' : 'Lấy lại mật khẩu'}
            </button>
          </form>
            <button className="mt-2 h-16 w-full bg-[#597bf7] p-2 text-2xl font-bold text-white hover:text-black">
                <Link to='/login'>Đăng Nhập</Link>
            </button>
        </div>
      </div> 
    </>
  );
};

export default ForgotPassword;