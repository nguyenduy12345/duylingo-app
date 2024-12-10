import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import instance from "../utils/axiosRequest";
const ChangePassword = ({ setIsEditPassword }) => {
  const [message, setMessage] = useState();
  const [password, setPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setFocus,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  useEffect(() => {
    setFocus("password");
  }, [setFocus]);
  const newPassword = watch("newPassword")
  const onSubmit = async (data) => {
    const {password, newPassword } = data
    await instance.patch("users/change_password", {
        password, newPassword
    })
    .then((res) => {
        setMessage(res?.data?.message)
        setTimeout(() => setIsEditPassword(false), 3000)
    })
    .catch((err) => {
        setMessage(err.response.data.message)
    })
  };
  return (
    <div className="fixed left-1/3 top-1/3 z-20 mx-auto mt-10 w-[95%] sm:w-96 -translate-x-1/3 -translate-y-1/2 transform rounded-lg bg-white p-6 font-noto shadow-md sm:left-1/2 sm:-translate-x-1/2 md:left-[66%] xl:left-[57%]">
      <i
        className="fa-solid fa-xmark-large absolute right-3 top-3 cursor-pointer"
        onClick={() => setIsEditPassword(false)}
      >
        X
      </i>
      <h2 className="mb-6 text-center text-2xl font-semibold">
        Thay đổi mật khẩu
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="relative">
          <input
            {...register("password", {
              required: "Nhập mật khẩu của bạn",
              validate: (value) => {
                if(!value.match(/^[A-Za-z0-9]+$/)){
                    return 'Vui lòng nhập mật khẩu của bạn'
                }
                return true
              },
            })}
            type={password ? "text" : "password"}
            placeholder="Mật khẩu"
            className="mb-[0.5rem] w-full border border-inherit p-2 pl-3 font-noto outline-none"
          />
          {password ? (
            <i
              className="fa-solid fa-eye-slash absolute right-3 top-3 cursor-pointer"
              onClick={() => setPassword(!password)}
            ></i>
          ) : (
            <i
              className="fa-solid fa-eye absolute right-3 top-3 cursor-pointer"
              onClick={() => setPassword(!password)}
            ></i>
          )}
          <br />
          {errors.password && (
            <p className="mb-2 font-noto text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="relative">
          <input
            {...register("newPassword", {
              required: "Nhập mật khẩu mới của bạn",
              minLength: {
                value: 6,
                message: "Mật khẩu phải nhiều hơn 6 ký tự",
              },
              validate: (value) => {
                if(!value.match(/^[A-Za-z0-9]+$/)){
                    return 'Mật khẩu chỉ bao gồm ký tự số và chữ'
                }
                return true
              },
            })}
            type={showPassword ? "text" : "password"}
            placeholder="Mật khẩu mới"
            className="mb-[0.5rem] w-full border border-inherit p-2 pl-3 font-noto outline-none"
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
          {errors.newPassword && (
            <p className="mb-2 font-noto text-red-500">
              {errors.newPassword.message}
            </p>
          )}
        </div>
        <div className="relative">
          <input
            {...register("confirmPassword", {
              required: "Xác nhận lại mật khẩu mới của bạn",
              validate: value => value === newPassword || 'Xác nhận mật khẩu không đúng'
            })}
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Xác nhận mật khẩu mới"
            className="mb-[0.5rem] w-full border border-inherit p-2 pl-3 font-noto outline-none"
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
          {errors.confirmPassword && (
            <p className="mb-2 font-noto text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-gradient-to-r from-pink-400 to-blue-600 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isSubmitting ? "Đang lưu..." : "Lưu mật khẩu"}
        </button>
        <p className="text-center font-noto text-lg text-red-500">{message}</p>
      </form>
    </div>
  );
};

export default ChangePassword;
