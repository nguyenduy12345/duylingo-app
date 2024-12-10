import { useContext, useEffect, useRef, useCallback, useState, memo } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

import { UserInfo } from "../stores/user.store.jsx";
import instance from "../utils/axiosRequest.js";
const Header = () => {
  const [countRequest, setCountRequest] = useState(0)
  const { profile, courseOfLearningProcess, setFetchCourseOfLearningProcess } = useContext(UserInfo);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate()
  let [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    setSelected(
      courseOfLearningProcess ? courseOfLearningProcess[0]?.courseId : false,
    );
  }, [courseOfLearningProcess]);
  // useEffect(() =>{
  //   const getListCourse = async() =>{
  //       await instance.get('/learning_process')
  //       .then((res) => {
  //         res?.data?.data?.courses?.length === 0 && navigate('/courses')
  //       })
  //       .catch(err => err)
  //   }
  //   getListCourse()
  // }, [courseOfLearningProcess])
  const handleSelectCourse = useCallback( async (course, id) => {
    if(countRequest === 1) return
    setCountRequest(1)
    setSelected(course)
    await instance.patch(`learning_process/update_recent_access?courseId=${id}`)
      .then((res) => {
        setFetchCourseOfLearningProcess(id + "update recent access");
        navigate(`/learning?courseId=${id}`);
        setSearchParams({ courseId: id });
        setCountRequest(0)
      })
      .catch(err => {
        setCountRequest(0)
      })
  },[courseOfLearningProcess]);
  return (
    <div className="font-noto z-30 fixed w-full top-0 md:w-[90vw] md:left-[5.7rem] lg:left-[17rem] justify-center bg-white py-3 border-b-[1px] border-[#e5e5e5]">
      <ul className="flex flex-wrap gap-2 w-full justify-evenly text-end md:w-[80%] md:justify-evenly">
        <li className="flex items-center justify-center">
          <Listbox value={selected || []} onChange={setSelected}>
            <div className="relative mt-2">
              <ListboxButton className="relative w-auto sm:w-[10rem] cursor-default rounded-md bg-white p-1 text-left text-[12px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <span className="flex items-center">
                  {selected ? (
                    <>
                      <img
                        alt=""
                        src={selected?.image}
                        className="w-6 h-6 sm:h-7 sm:w-7 shrink-0 rounded-full lazyload"
                      />
                      <span className="ml-2 hidden sm:block ">
                        {selected?.name ? "Tiếng " + selected?.name : ""}
                      </span>
                    </>
                  ) : (
                    <Link to="/courses" className="ml-1">
                      Chọn khóa học
                    </Link>
                  )}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center">
                  <ChevronUpDownIcon
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-400"
                  />
                </span>
              </ListboxButton>
              <ListboxOptions
                transition
                className="absolute z-10 mt-1 max-h-56 w-auto overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
              >
                {courseOfLearningProcess &&
                  courseOfLearningProcess.map((course, index) => (
                    <ListboxOption
                      onClick={() =>
                        handleSelectCourse(course, course.courseId._id)
                      }
                      key={index}
                      value={course?.courseId}
                      className="group relative w-[3rem] sm:w-[10rem] cursor-default select-none p-2 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                    >
                      <div className="flex items-center">
                        <img
                          alt=""
                          src={course?.courseId?.image}
                          className="w-full sm:h-7 sm:w-8 shrink-0 lazyload"
                        />
                        <span className="ml-3 text-[12px] hidden sm:block truncate  font-normal group-data-[selected]:font-semibold">
                          {"Tiếng " + course?.courseId?.name}
                        </span>
                      </div>
                    </ListboxOption>
                  ))}
              </ListboxOptions>
            </div>
          </Listbox>
        </li>
        <li className="flex items-center justify-center">
          <img src="/images/logo/explogo.jfif" className="w-5 md:w-7 lazyload" />
          <p className="ml-1  text-md md:text-xl font-medium text-yellow-800 ">
            {profile?.experiences ? profile?.experiences : 0}
          </p>
        </li>
        <li className="flex items-center justify-center">
          <img src="/images/logo/coins.png" className="w-5 md:w-7 lazyload" />
          <p className="ml-1  text-md md:text-xl font-medium text-yellow-800">
            {profile?.gems ? profile?.gems : 0}
          </p>
        </li>
        <li className="flex items-center justify-center">
          <img src="/images/logo/heart.webp" className="w-5 md:w-7 lazyload" />
          <p className="ml-1  text-md md:text-xl font-medium text-red-600 ">
            {profile?.hearts ? profile?.hearts : 0}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Header;
