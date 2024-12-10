import { useContext, useEffect } from 'react'
import { gsap } from "gsap"

import { UserInfo } from '../stores/user.store.jsx'

import MainLayout from '../layouts/MainLayout.jsx'
import SideBar from '../components/SideBar.jsx'

const Misson = () => {
  const { profile } = useContext(UserInfo)
  const fullName = profile?.fullName ? `Chào ${profile.fullName} !` : "Chào bạn"
  useEffect(() => {
    gsap.fromTo(
      [".name", ".letter"],
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
      }
    );
  }, []);
  const text = "Hoàn thành các nhiệm vụ để nhận rương kho báu. Đảm bảo sẽ có nhiều phần quà hấp dẫn dành cho bạn mỗi ngày!"
  return (
    <MainLayout>
    <div className="absolute mx-auto mt-[6rem] md:left-[5.5rem] md:w-[51vw] lg:left-[17rem] gap-[1.5rem] lg:w-[42vw] xl:w-[50vw] 2xl:w-[52vw] flex w-[95%] flex-col bg-white font-noto lg:flex-grow lg:flex-row">
      <div className="w-full bg-white">
        <div
          className={`mx-auto flex flex-col w-[96%] rounded-2xl bg-[#ddf4ff] p-8 pb-0`}
        >
          <h4 className='font-bold text-xl md:text-2xl'>{fullName.split(" ").map((char, index) => (<span key={index} className="name">{char + " "}</span>))}</h4>
          <p className='mt-3'>
          {text.split(" ").map((char, index) => (<span key={index} className="letter">{char + " "}</span>))}
          </p>
          <div className='w-full flex justify-end items-end'>
            <img src="/images/cat_congru2.png" className='w-28 lazyload'/>
          </div>
        </div>
        <div className="mx-auto mt-6 w-[95%]">
          <h4 className='font-bold text-2xl'>Nhiệm vụ</h4>
          <ul className="mt-4 flex flex-col gap-8">
          <li className="flex w-full h-[7rem] border-[1px] border-[#e5e5e5] p-4 rounded-xl">
            <ul className="flex-grow items-start">
              <li className="pl-2">Hoàn thành 3 bài học</li>
              <li className="relative ml-1 mt-2 h-6 w-full rounded-xl bg-[#e5e5e5] ">
                <div className="h-6 w-[0%] rounded-xl bg-red-600 transition ease-linear"></div>
                <p className="absolute left-[40%] top-0">0 / 3</p>
              </li>
            </ul>
            <div className="ml-4 flex items-center justify-center">
              <img src="/images/logo/misson-gift.svg" className="h-9 w-9 lazyload" />
            </div>
          </li>
          <li className="flex w-full h-[7rem] border-[1px] border-[#e5e5e5] p-4 rounded-xl">
            <ul className="flex-grow items-start">
              <li className="pl-2">Đúng liên tiếp 6 câu </li>
              <li className="relative ml-1 mt-2 h-6 w-full rounded-xl bg-[#e5e5e5]">
                <div className="h-6 w-[0%] rounded-xl bg-red-600 transition ease-linear"></div>
                <p className="absolute left-[40%] top-0">0 / 6</p>
              </li>
            </ul>
            <div className="ml-4 flex items-center justify-center">
              <img src="/images/logo/misson-gift.svg" className="h-9 w-9 lazyload" />
            </div>
          </li>
        </ul>
        </div>
      </div>
      <SideBar />
    </div>
  </MainLayout>
  )
}

export default Misson
