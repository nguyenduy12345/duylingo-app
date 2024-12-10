import { useRef, useCallback, useEffect } from "react";

import Header from "../components/Header.jsx";
import NavBar from "../components/NavBar.jsx";

import backToTop from "../functions/backtotop.js";
const MainLayout = ({ children }) => {
  const back = useRef(null)
  const setPosition = useCallback(() => {
    window.scrollY >= 200
      ? (
        back.current.style.position = "fixed",
        back.current.style.display = "flex"
      )
      : back.current.style.display = "none"
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", setPosition);
    return () => {
      window.removeEventListener("scroll", setPosition);
    };
  }, []);
  return (
    <div className="flex w-full">
      <NavBar />
      <div className="flex w-full flex-col">
        <Header />
        {children}
        <div 
          onClick={backToTop}
          ref={back}
          className="fixed z-10 shadow-2xl bottom-[4.5rem] right-3 text-xl sm:text-2xl cursor-pointer active:scale-95 w-[3rem] sm:w-[4rem] h-[3rem] sm:h-[4rem] hidden items-center justify-center rounded-full bg-[#a2f6ec]">
          <i className="fa-sharp fa-solid fa-arrow-up"></i>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
