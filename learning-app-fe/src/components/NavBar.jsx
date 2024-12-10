import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Cookies from "js-cookie"
import { UserInfo } from "../stores/user.store.jsx";
const NavBar = () => {
  const { profile, courseOfLearningProcess } = useContext(UserInfo);
  const [smallNav, setSmallNav] = useState(false);
  const handleUserLogOut = () => {
    Cookies.remove("token")
    window.location.href = "http://localhost:5173/login";
  };
  return (
    <>
      <ul className="fixed bottom-0 z-20 flex h-[3.8rem] w-full justify-evenly border-t-2 border-[#e5e5e5] bg-[#f3f8f9] py-[3px] text-[#777777] md:fixed md:top-0 md:h-screen md:w-auto md:flex-col md:justify-start md:gap-2 md:border-r-[3px] md:border-t-0 md:border-r-[#eeeeee] md:bg-white md:pt-[4rem] lg:w-[17rem] lg:pt-[1rem] lg:px-6">
        <a
          href="http://localhost:5173"
          title="Trang chủ"
          className="hidden items-center justify-center md:flex"
        >
          <img src="/images/logo/cat-black.png" className="mr-1 w-12 lazyload" />
          <h2 className="hidden cursor-pointer justify-center py-2 font-noto text-3xl font-bold text-red-400 lg:flex">
            Duylingo
          </h2>
        </a>
        <NavLink
          title="Học tập"
          className={({ isActive }) =>
            isActive
              ? "flex items-center justify-center rounded-lg border-[1px] border-blue-300 p-1 text-blue-400 md:bg-[#ddf4ff] lg:p-0"
              : "flex items-center justify-center"
          }
          to="/learning"
        >
          <li className="flex h-[2.5rem] w-auto cursor-pointer items-center px-[2px] md:mb-1 md:h-[3.5rem] md:rounded-lg md:px-3 md:py-1 md:hover:bg-[#ddf4ff] lg:w-full">
            <img src="/images/logo/home-nav.svg" className="w-10 lazyload" />
            <p className="ml-5 hidden font-noto text-lg font-medium lg:block">
              Học tập
            </p>
          </li>
        </NavLink>
        <NavLink
          title="Khóa học"
          className={({ isActive }) =>
            isActive
              ? "flex items-center justify-center rounded-lg border-[1px] border-blue-300 p-1 text-blue-400 md:bg-[#ddf4ff] lg:p-0"
              : "flex items-center justify-center"
          }
          to="/courses"
        >
          <li className="flex h-[2.5rem] w-auto cursor-pointer items-center px-[2px] md:mb-1 md:h-[3.5rem] md:rounded-lg md:px-3 md:py-1 md:hover:bg-[#ddf4ff] lg:w-full">
            <img src="/images/logo/courses-img.png" className="w-10 lazyload" />
            <p className="ml-5 hidden font-noto text-lg font-medium lg:block">
              Khóa học
            </p>
          </li>
        </NavLink>
        {courseOfLearningProcess.length !== 0 &&
        courseOfLearningProcess[0].courseId.typeWritingSystem === "glyphs" ? (
          <NavLink
            title="Bảng ký tự"
            className={({ isActive }) =>
              isActive
                ? "hidden rounded-lg border-[1px] border-blue-300 p-1 text-blue-400 md:flex md:bg-[#ddf4ff] lg:p-0"
                : "hidden md:flex"
            }
            to="/character"
          >
            <li className="flex h-[2.5rem] cursor-pointer items-center px-[2px] md:mb-1 md:flex md:h-[3.5rem] md:rounded-lg md:px-3 md:py-1 md:hover:bg-[#ddf4ff] lg:w-full">
              <img
                src="/images/logo/character-png.svg"
                className="w-8 md:w-10 lazyload"
              />
              <p className="ml-5 hidden font-noto text-lg font-medium lg:block">
                Bảng ký tự
              </p>
            </li>
          </NavLink>
        ) : (
          <NavLink
            title="Bảng chữ cái"
            className={({ isActive }) =>
              isActive
                ? "hidden rounded-lg border-[1px] border-blue-300 p-1 text-blue-400 md:flex md:bg-[#ddf4ff] lg:p-0"
                : "hidden md:flex"
            }
            to="/alphabet"
          >
            <li className="flex h-[2.5rem] cursor-pointer items-center px-[2px] md:mb-1 md:flex md:h-[3.5rem] md:rounded-lg md:px-3 md:py-1 md:hover:bg-[#ddf4ff] lg:w-full">
              <img
                src="/images/logo/pngtree-alphabet.png"
                className="w-8 md:w-10 lazyload"
              />
              <p className="ml-5 hidden font-noto text-lg font-medium lg:block">
                Bảng chữ cái
              </p>
            </li>
          </NavLink>
        )}
        <NavLink
          title="Nhiệm vụ"
          className={({ isActive }) =>
            isActive
              ? "hidden rounded-lg border-[1px] border-blue-300 p-1 text-blue-400 md:flex md:bg-[#ddf4ff] lg:p-0"
              : "hidden md:flex"
          }
          to="/missons"
        >
          <li className="flex h-[2.5rem] cursor-pointer items-center px-[2px] md:mb-1 md:flex md:h-[3.5rem] md:rounded-lg md:px-3 md:py-1 md:hover:bg-[#ddf4ff] lg:w-full">
            <img
              src="/images/logo/misson-nav.svg"
              className="w-8 md:w-10"
            />
            <p className="ml-5 hidden font-noto text-lg font-medium lg:block lazyload">
              Nhiệm vụ
            </p>
          </li>
        </NavLink>
        <NavLink
          title="Bảng xếp hạng"
          className={({ isActive }) =>
            isActive
              ? "flex items-center justify-center rounded-lg border-[1px] border-blue-300 p-1 text-blue-400 md:bg-[#ddf4ff] lg:p-0"
              : "flex items-center justify-center"
          }
          to="/rank"
        >
          <li className="flex h-[2.5rem] cursor-pointer items-center px-[2px] md:mb-1 md:h-[3.5rem] md:rounded-lg md:px-3 md:py-1 md:hover:bg-[#ddf4ff] lg:w-full">
            <img
              src="/images/logo/rank-nav.svg"
              className="w-8 md:w-10 lazyload"
            />
            <p className="ml-5 hidden font-noto text-lg font-medium lg:block">
              Xếp hạng
            </p>
          </li>
        </NavLink>
        <NavLink
          title="Tài khoản"
          className={({ isActive }) =>
            isActive
              ? "flex items-center justify-center rounded-lg border-[1px] border-blue-300 p-1 text-blue-400 md:bg-[#ddf4ff] lg:p-0"
              : "flex items-center justify-center"
          }
          to="/profile"
        >
          <li className="flex h-[2.5rem] cursor-pointer items-center px-[2px] md:mb-1 md:h-[3.5rem] md:rounded-lg md:px-3 md:py-1 md:hover:bg-[#ddf4ff] lg:w-full">
            {profile?.avatar ? (
              <img
                src={profile?.avatar}
                className="w-12 lg:w-10 rounded-[50%] border-[1px] border-blue-400 object-cover lazyload"
              />
            ) : (
              <img src="/images/logo/person-default.png" className="w-10 lazyload" />
            )}
            <p className="ml-5 hidden font-noto text-lg font-medium lg:block">
              {profile?.fullName ? profile?.fullName : "Tài khoản"}
            </p>
          </li>
        </NavLink>
        <li
          onClick={handleUserLogOut}
          className="hidden h-[2.5rem] cursor-pointer items-center justify-center rounded-lg px-[2px] md:ml-2 md:flex md:h-[3.5rem] md:rounded-lg md:px-3 md:py-1 lg:w-full lg:justify-start"
        >
          <img src="/images/logo/logout.jpg" className="w-8 lazyload" />
          <p className="ml-5 hidden font-noto text-lg font-medium lg:block lazyload">
            Đăng Xuất
          </p>
        </li>
        <li
          onClick={() => setSmallNav(!smallNav)}
          className="flex cursor-pointer items-center md:hidden"
        >
          <img src="/images/logo/three-dots.png" className="w-8 md:w-10 lazyload" />
        </li>
        {smallNav && (
          <ul className="absolute bottom-[3.7rem] right-[0.7rem] z-20 flex h-[11rem] translate-x-0 flex-col justify-between rounded-lg border-2 border-[#e5e5e5] bg-white px-[8px] py-2 duration-1000 ease-linear md:hidden">
            <li className="flex items-center justify-center">
              {courseOfLearningProcess.length !== 0 &&
              courseOfLearningProcess[0].courseId.typeWritingSystem ===
                "glyphs" ? (
                <NavLink title="Bảng ký tự" to="/character">
                  <img
                    src="/images/logo/character-png.svg"
                    className="h-[2.5rem] w-[3rem] lazyload"
                  />
                </NavLink>
              ) : (
                <NavLink title="Bảng chữ cái" to="/alphabet">
                  <img
                    src="/images/logo/words.jpg"
                    className="h-[2.5rem] w-[3rem] lazyload"
                  />
                </NavLink>
              )}
            </li>
            <li className="flex items-center justify-center">
              <NavLink title="Nhiệm vụ" to="/missons">
                <img
                  src="/images/logo/task.png"
                  className="h-[2.5rem] w-[3rem] lazyload"
                />
              </NavLink>
            </li>
            <li
              onClick={handleUserLogOut}
              className="flex cursor-pointer items-center justify-center"
            >
              <img
                src="/images/logo/logout.jpg"
                className="h-[1.7rem] w-[1.7rem] lazyload"
              />
            </li>
          </ul>
        )}
      </ul>
    </>
  );
};

export default NavBar;
