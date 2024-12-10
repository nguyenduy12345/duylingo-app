import { useState, useContext } from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

import instance from "../utils/axiosRequest.js";

import { UserInfo } from "../stores/user.store.jsx";
const ChangeProfile = ({ setIsEditProfile }) => {
  const { profile, setFetchProfile } = useContext(UserInfo);
  const [fullName, setFullName] = useState(profile?.fullName);
  const [sex, setSex] = useState(profile?.sex);
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState();
  const listSex = ['0', '1']
  const handleChangeProfile = async (e) => {
    e.preventDefault();
    if(!fullName){
      setMessage('Vui lòng nhập tên của bạn')
      return
    }
    if(isSending) return
    setIsSending(true)
    await instance.patch("users/update_information",{
      fullName,
      sex
    })
    .then((res) => {
      setMessage(res?.data?.message)
      setIsSending(false)
      setFetchProfile({fullName, sex, numb: Math.random()})
      setTimeout(() => setIsEditProfile(false),2000)
    })
    .catch((err) => {
      setIsSending(false)
      setMessage(err?.response?.message)
    })
  };
  const convertNumb = (numb) => {
    switch(numb){
      case 0: 
        return 'Nữ'
      case 1:
        return 'Nam'
      default:
        return
    }
  }
  return (
    <div className="fixed left-1/3 top-1/3 z-20 mx-auto mt-10 w-[95%] -translate-x-1/3 -translate-y-1/2 transform rounded-lg bg-white p-6 font-noto shadow-md sm:left-1/2 sm:w-96 sm:-translate-x-1/2 md:left-[66%] xl:left-[57%]">
      <i
        className="fa-solid fa-xmark-large absolute right-3 top-3 cursor-pointer"
        onClick={() => setIsEditProfile(false)}
      >
        X
      </i>
      <h2 className="mb-6 text-center text-2xl font-semibold">
        Chỉnh sửa thông tin
      </h2>
      <form className="space-y-4">
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="currentPassword"
          >
            Họ và tên
          </label>
          <input
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Giới tính
          </label>
          <Listbox value={convertNumb(sex)} onChange={setSex}>
            <div className="relative mt-2">
            <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-md">
              {convertNumb(sex)}
            </ListboxButton>
              <ListboxOptions
                transition
                className="absolute z-10 mt-1 max-h-56 w-auto overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
              >
                {listSex && listSex.map((item, index) => (
                  <ListboxOption 
                    key={index}
                    value={index}
                    className="group relative w-32 cursor-default select-none py-2 pl-1 pr-1 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                  >
                    {convertNumb(index)}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </Listbox>
        </div>
        <button
          onClick={handleChangeProfile}
          className="w-full rounded-md bg-gradient-to-r from-pink-400 to-blue-600 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isSending ? 'Đang lưu...' : 'Lưu thông tin'}
        </button>
        <p className="text-center font-noto text-lg text-red-500">{message}</p>
      </form>
    </div>
  );
};

export default ChangeProfile;
