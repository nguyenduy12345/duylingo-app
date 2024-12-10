import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserInfo } from "../stores/user.store";
const SideBar = () => {
  const { profile } = useContext(UserInfo)
  return (
    <div className="fixed z-10 top-[7rem] text-[#777777] md:left-[62.5vw] lg:left-[67.5vw] xl:left-[70vw] hidden h-screen flex-col gap-4 md:flex md:w-[35vw] lg:w-[30vw] xl:w-[28vw] font-noto">
      <div className="h-[9rem] w-full rounded-2xl bg-white py-6 border-[2px] border-[#e5e5e5]">
        <h4 className="ml-4 text-xl font-medium text-black font-noto mb-4">Số ngày hoạt động</h4>
        <div className="flex items-center gap-3 px-4">
          <div className="flex justify-center items-center rounded-xl bg-[#58cc02] w-full h-6 mt-2">
            <span className="text-md text-white font-bold">{profile?.activeDays?.length === 0 ? '1' : profile?.activeDays?.length} ngày</span>
          </div>
          <img src="/images/logo/daygo.webp" className="ml-1 h-12 w-16 lazyload" />
        </div>
      </div>
      <div className="w-full rounded-2xl bg-white py-6 border-[2px] border-[#e5e5e5]">
        <div className="mx-4 flex justify-between">
          <h4 className="text-xl font-medium text-black font-noto">Nhiệm vụ</h4>
          <Link
            to="/missons"
            className="cursor-pointer font-noto text-md text-blue-500 flex items-center"
          >
            Xem thêm
          </Link>
        </div>
        <ul className="mt-2 flex flex-col gap-3 text-md rounded-2xl">
          <li className="flex w-full mt-2 px-4">
            <ul className="flex-grow items-start">
              <li className="text-black  text-md">Hoàn thành 3 bài học</li>
              <li className="relative mt-2 h-6 w-full rounded-xl bg-[#e5e5e5]">
                <div className="h-6 w-[0%] rounded-xl bg-red-600 transition ease-linear"></div>
                <p className="absolute left-[40%] top-0 text-md font-bold text-[#b2afaf] tracking-wider">0 / 3</p>
              </li>
            </ul>
            <div className="ml-4 flex items-end">
              <img src="/images/logo/misson-gift.svg" className="h-9 w-9 lazyload" />
            </div>
          </li> 
          <li className="flex w-full mt-2 px-4">
            <ul className="flex-grow items-start">
              <li className="text-black text-md">Đúng liên tiếp 6 câu </li>
              <li className="relative mt-2 h-6 w-full rounded-xl bg-[#e5e5e5]">
                <div className="h-6 w-[0%] rounded-xl bg-red-600 transition ease-linear"></div>
                <p className="absolute left-[40%] top-0 text-md font-bold text-[#b2afaf] tracking-wider">0 / 6</p>
              </li>
            </ul>
            <div className="ml-4 flex items-end">
              <img src="/images/logo/misson-gift.svg" className="h-9 w-9 lazyload" />
            </div>
          </li>
        </ul>
      </div>
      <ul className="flex flex-wrap justify-center items-center gap-3 m-2 mt-0 text-[#afafaf] uppercase font-bold text-sm">
        <li className="cursor-pointer hover:text-green-500"><Link to="">About</Link></li>
        <li className="cursor-pointer hover:text-green-500"><Link to="">Blog</Link></li>
        <li className="cursor-pointer hover:text-green-500"><Link to="">Store</Link></li>
        <li className="cursor-pointer hover:text-green-500"><Link to="">Efficacy</Link></li>
        <li className="cursor-pointer hover:text-green-500"><Link to="">Careers</Link></li>
        <li className="cursor-pointer hover:text-green-500"><Link to="">INVESTORS</Link></li>
        <li className="cursor-pointer hover:text-green-500"><Link to="">Terms</Link></li>
        <li className="cursor-pointer hover:text-green-500"><Link to="">Privacy</Link></li>
      </ul>
    </div>
  );
};

export default SideBar;
