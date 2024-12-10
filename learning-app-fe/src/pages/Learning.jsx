import { useState, useEffect, useContext, useRef } from "react";
import { useSearchParams, useNavigate, Outlet } from "react-router-dom";

import { UserInfo } from "../stores/user.store.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import SideBar from "../components/SideBar.jsx";

import instance from "../utils/axiosRequest.js";
const Learning = () => {
  const { courseOfLearningProcess, setFetchCourseOfLearningProcess } =
    useContext(UserInfo);
  const [sections, setSections] = useState([]);
  const [countRequest, setCountRequest] = useState(0);
  let [searchParams, setSearchParams] = useSearchParams();
  const courseId = searchParams.get("courseId")
    ? searchParams.get("courseId")
    : courseOfLearningProcess
      ? courseOfLearningProcess[0]?.courseId._id
      : [];
  const navigate = useNavigate();
  const colorDiv = useRef(null)
  useEffect(() => {
    const fetchSections = async () => {
      await instance
        .get(`sections?courseId=${courseId}`)
        .then((res) => setSections(res?.data?.data?.sections))
        .catch((err) => err);
    };
    fetchSections();
  }, [courseId]);
  // useEffect(() => {
  //   if(courseOfLearningProcess.length === 0){
  //     navigate('/courses')
  //   }
  // },[])
  const chooseSectionAndNextToMilestonePage = async (section, id, index) => {
    if (section.status === 2) return;
    if (countRequest === 1) return;
    setCountRequest(1);
    const indexCourse = courseOfLearningProcess?.findIndex(
      (course) => course.courseId._id.toString() === courseId.toString(),
    );
    if (indexCourse < 0) {
      setCountRequest(0);
      return;
    }
    const indexSection = courseOfLearningProcess[
      indexCourse
    ].sections.findIndex(
      (section) => section.sectionId.toString() === id.toString(),
    );
    if (indexSection > -1) {
      navigate(
        `/milestones?courseId=${courseId}&sectionId=${id}&index=${index}`,
      );
      setCountRequest(0);
      return;
    }
    try {
      await instance.patch("/learning_process/add_section", {
        courseId,
        sectionId: id,
      });
      navigate(
        `/milestones?courseId=${courseId}&sectionId=${id}&index=${index}`,
      );
      setFetchCourseOfLearningProcess("addSection" + id);
      setCountRequest(0);
    } catch (error) {
      return error;
    }
  };
  sections && sections.map((section) => {section.status = 0, section.totalMilestone = 0, section.totalMilestoneDone = 0});
  const indexCourse = courseOfLearningProcess?.findIndex(
    (course) => course.courseId._id.toString() === courseId.toString(),
  );
  courseOfLearningProcess[indexCourse]?.sections?.forEach((section) => {
    const index = sections.findIndex(
      (item) => section.sectionId.toString() === item._id.toString(),
    );
    if (index > -1) {
      sections[index].status = section.status;
      sections[index].totalMilestone = section.totalMilestone;
      sections[index].totalMilestoneDone = section.totalMilestoneDone;
    }
  });
  return (
    <>
      <MainLayout>
        <div className="mt-[5rem]">
          <Outlet />
          <ul className="flex w-full flex-grow flex-col gap-[1.5rem] px-[1rem] md:absolute md:left-[5.5rem] md:mt-4 md:w-[51vw] lg:left-[17rem] lg:w-[42vw] lg:px-[3rem] xl:w-[50vw] 2xl:w-[52vw] 2xl:px-[5rem]">
            {sections &&
              sections.map((section, index) => (
                <li
                  key={section?._id}
                  onClick={() =>
                    chooseSectionAndNextToMilestonePage(
                      section,
                      section?._id,
                      index,
                    )
                  }
                  className={`md:h-[20rem] ${section?.status === 1 || section?.status === 2 ? "bg-[#ddf4ff] lg:bg-[#ddf4ff]" : "bg-[#f7f7f7]"} mx-auto h-[15rem] w-full cursor-pointer rounded-3xl border-[1px] border-gray-300 shadow-xl transition hover:shadow-2xl focus:scale-95 2xl:border-none`}
                >
                  <div className="flex h-full w-full flex-col-reverse justify-between 2xl:flex-row">
                    <div
                      className={`mt-2 flex h-[6rem] w-full flex-col justify-between bg-white px-5 py-3 md:px-6 md:py-2 2xl:mt-0 2xl:h-[90%] 2xl:w-[58%] 2xl:rounded-bl-3xl 2xl:rounded-tl-3xl 2xl:p-[2rem] ${section?.status === 1 || section?.status === 2 ? "2xl:bg-[#ddf4ff]" : "2xl:bg-[#f7f7f7]"} z-10 rounded-bl-3xl rounded-br-3xl`}
                    >
                      <div className="">
                        <p className="font-noto text-xl font-medium text-[#5f5f5f] lg:text-3xl">
                          {`Phần ${index + 1}`}
                        </p>
                        {section?.status === 1 || section?.status === 2 ? (
                          <div className="flex mt-1 2xl:mt-5 mx-auto w-[100%] items-center justify-center font-noto">
                            <div className="relative h-4 w-full rounded-xl bg-[#f3d2d2] 2xl:bg-[#f9f9f9]">
                              <div 
                                style={{
                                  width: `${(section.totalMilestoneDone / section.totalMilestone) * 100}%`,
                                }}
                                className={`absolute z-10 top-[1px] h-[14px] rounded-xl bg-[#58cc02] transition ease-linear`}></div>
                              <span className="absolute top-[0] left-[50%] -translate-x-1/2 text-xs font-medium text-[#b2afaf]">{`${section.totalMilestoneDone} / ${section.totalMilestone}`}</span>
                            </div>
                            <div className="relative ml-[0px] h-8 w-9 rounded-full bg-[#58cc02] p-[2px] border-[3px] border-white">
                              <div
                                style={{
                                  clipPath: `polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)`,
                                }}
                                className="absolute left-1/2 top-1/2 z-10 h-6 w-6 -translate-x-1/2 -translate-y-1/2 bg-white"
                              ></div>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-2 2xl:mt-4 ml-2 flex justify-between">
                            <div>
                              <i className="fa-solid fa-lock"></i>
                              <span className="ml-2"> Đã bị khóa</span>
                            </div>
                            <div className="2xl:hidden border-[1px] border-green-500 px-4 py-1 rounded-lg text-sm hover:bg-[#b4ea81] border-b-[3px]">
                              <i className="fa-solid fa-lock-open"></i>
                              <span className="ml-2">Mở phần {index + 1}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      {section?.status === 1 ? (
                        <div className="hidden 2xl:flex mx-auto h-[2rem] w-[50%] items-center justify-center rounded-lg bg-[#1cb0f6] px-2 font-noto text-lg font-bold text-white shadow-lg hover:bg-[#3181a5] hover:shadow-xl md:text-xl 2xl:h-[3rem] 2xl:w-full">
                          Tiếp tục
                        </div>
                      ) : section?.status === 2 ? (
                        <div className="hidden 2xl:flex mx-auto h-[2rem] w-[50%] items-center justify-center rounded-lg bg-green-400 px-2 font-noto text-lg font-bold shadow-lg hover:shadow-xl md:text-2xl 2xl:h-[3rem] 2xl:w-full">
                          Hoàn thành
                        </div>
                      ) : (
                        <div className="hidden 2xl:flex mx-auto h-[2rem] w-[50%] items-center justify-center rounded-lg bg-[#eeeeee] px-2 font-noto text-lg font-bold shadow-lg hover:shadow-xl hover:text-green-400 md:text-xl 2xl:h-[3rem] 2xl:w-full">
                          <i className="fa-solid fa-lock-open"></i>
                          <span className="ml-2">Mở phần học {index + 1}</span>
                        </div>
                      )}
                    </div>
                    <div className="relative mt-7 2xl:w-[45%] flex-grow items-start justify-center overflow-hidden 2xl:flex 2xl:flex-col 2xl:pr-5">
                      <div className="text-md relative mx-auto flex h-[60%] w-[90%] rounded-xl bg-white p-2 text-center font-noto font-medium text-[#4b4b4b] md:text-lg 2xl:h-[30%] 2xl:w-[95%]">
                        <p className="flex h-full w-full items-center justify-center text-center">
                          {section?.name}
                        </p>
                        <div
                          style={{
                            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                          }}
                          className="absolute -bottom-[0.8rem] right-[3.3rem] h-6 w-6 rotate-[270deg] bg-white md:right-[5rem] 2xl:-bottom-[1rem] 2xl:right-[70%] 2xl:h-10 2xl:w-10"
                        ></div>
                      </div>
                      <div className="flex w-full justify-end 2xl:justify-center">
                        <img
                          src="/images/logo/pngtree-black-cat.png"
                          className="w-[6rem] md:w-[8rem] 2xl:w-[12rem] lazyload"
                        />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
          <SideBar />
        </div>
      </MainLayout>
    </>
  );
};

export default Learning;
