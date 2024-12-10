import { useState, useContext, useEffect } from "react";

import instance from "../utils/axiosRequest";
import { UserInfo } from "../stores/user.store";
import MainLayout from "../layouts/MainLayout.jsx";
import ChangePassword from "../components/ChangePassword.jsx";
import ChangeProfile from "../components/ChangeProfile.jsx";
  const Profile = () => {
  const { profile, setFetchProfile } = useContext(UserInfo);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [changeAvatar, setChangeAvatar] = useState(false)
  const [statusChangAvatar, setStatusChangeAvatar] = useState('Lưu ảnh')
  const [avatar, setAvatar] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false)
  const [message, setMessage] = useState(false);
  const [countRequest, setCountRequest ] = useState(0)
  const handleAvatarChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      let result = URL.createObjectURL(file)
      setChangeAvatar(file)
      setAvatar(result)
    }
  };
  const handleSaveAvatar = async (e) => {
    if(countRequest === 1) return
    setCountRequest(1)
    if(!avatar){
      setCountRequest(0)
      return
    }
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", changeAvatar);
    setStatusChangeAvatar('Đang lưu')
    await instance
      .patch("users/avatar", formData, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      })
      .then((res) => {
        setFetchProfile('changeavatar' + res.data.avatar)
        setStatusChangeAvatar('Lưu ảnh')
        setAvatar(false)
        setMessage(res.data.message)
        setTimeout(() => setMessage(''), 3000)
        setCountRequest(0)
        setIsEditing(false)
      })
      .catch((err) => {
        setCountRequest(0)
        setStatusChangeAvatar('Lưu ảnh')
        setMessage(err.response.data[0].message)
      });
  };
  const handleCancelUpdateAvatar = () =>{
    setAvatar(false)
    setIsEditing(false)
  }
  return (
    <MainLayout>
      {!!profile && (
        <div className="absolute mt-[5rem] md:left-[5.5rem] md:w-[75vw] lg:left-[17rem] lg:w-[69vw] w-full rounded-lg bg-white pb-4 shadow-lg">
          <div className="relative w-full flex justify-center">
            <img
              src={
                avatar
                  ? avatar
                  : profile.avatar
                    ? profile.avatar
                    : "/images/logo/person-default.png"
              }
              alt="User Avatar"
              className="h-96 md:h-[60vh] w-full sm:w-3/4 lg:w-[60%] xl:w-[45%] rounded-lg object-cover lazyload"
            />
            {isEditing ? (
              <ul className="flex absolute bottom-1 right-4 ">
                <button
                onClick={handleCancelUpdateAvatar}
                className="flex transform rounded-full bg-gradient-to-r from-pink-400 to-blue-600 px-4 py-2 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95"
              >
                <span className="font-noto text-sm">Dừng thay đổi</span>
              </button>
              <button
                onClick={handleSaveAvatar}
                className="transform rounded-full bg-gradient-to-r from-pink-400 to-blue-600 px-4 py-2 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95"
              >
                <span className="flex items-center justify-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 ${isEditing ? "rotate-180" : "rotate-0"} transition-transform duration-300`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  <span className="font-noto text-sm">{statusChangAvatar}</span>
                </span>
              </button>
              </ul>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="absolute bottom-1 right-4 transform rounded-full bg-gradient-to-r from-pink-400 to-blue-600 px-4 py-2 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95"
              >
                <span className="flex items-center justify-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 ${isEditing ? "rotate-180" : "rotate-0"} transition-transform duration-300`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  <span className="font-noto text-sm">Chỉnh sửa ảnh</span>
                </span>
              </button>
            )}
          </div>

          {/* Avatar edit form */}
          {isEditing && (
            <div className="flex justify-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="mt-2 rounded-lg border p-2"
              />
            </div>
          )}
          <p className="w-full text-center text-2xl text-red-600 px-2 mt-1 text-wrap">{message}</p>
          <div className="ml-3 mt-3 md:ml-0 md:text-center">
            <h2 className="font-noto text-xl lg:text-2xl">
              Tên: {profile.fullName}
            </h2>
            <p className="mt-2 font-noto text-xl lg:text-2xl">
              Email: {profile.email}
            </p>
            <p className="mt-2 font-noto text-xl lg:text-2xl">
              Giới tính: {profile.sex === 0 ? "Nữ" : "Nam"}
            </p>
            {/* <div className="mx-auto mt-4 w-full">
              <ul className="flex justify-between md:mx-auto px-2 w-[85%] sm:w-[65%] lg:w-1/2 ">
                <li className="flex">
                  <img
                    src="/images/logo/explogo.jfif"
                    alt="user exps"
                    className="h-8 w-9 "
                  />
                  <p className="ml-2 flex items-center justify-center font-noto text-2xl font-medium text-slate-700 md:text-3xl">
                    {profile.experiences}
                  </p>
                </li>
                <li className="flex">
                  <img
                    src="/images/logo/coins.png"
                    alt="user gems"
                    className="h-8 w-9 "
                  />
                  <p className="ml-2 flex items-center justify-center font-noto text-2xl font-medium text-yellow-300 md:text-3xl">
                    {profile.gems}
                  </p>
                </li>
                <li className="flex">
                  <img
                    src="/images/logo/dayslogo.jpg"
                    alt="user day streak"
                    className="h-8 w-9 "
                  />
                  <p className="ml-2 flex items-center justify-center font-noto text-2xl font-medium md:text-3xl">
                    {profile.dayStreak}
                  </p>
                </li>
              </ul>
            </div> */}
          </div>

          {/* Edit button (future feature) */}
          <div className="mt-6 mx-2 flex flex-col justify-center md:flex-row">
            <div onClick={() => setIsEditProfile(!isEditProfile)} className="transform cursor-pointer rounded-lg bg-gradient-to-r from-pink-400 to-blue-600 px-6 py-3 font-noto text-lg text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95">
              Chỉnh sửa thông tin
            </div>
            <div onClick={() => setIsEditPassword(!isEditPassword)} className="mt-2 transform cursor-pointer rounded-lg bg-gradient-to-r from-pink-400 to-blue-600 px-6 py-3 font-noto text-lg text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95 md:ml-2 md:mt-0">
              Thay đổi mật khẩu
            </div>
          </div>
        </div>
      )}
      {isEditPassword && <ChangePassword setIsEditPassword={setIsEditPassword} />}
    {isEditProfile && <ChangeProfile  setIsEditProfile={setIsEditProfile} /> }
    </MainLayout>
  );
};

export default Profile;
