import { useState, useEffect, useContext, useRef } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";

import { UserInfo } from "../stores/user.store.jsx";

import MainLayout from "../layouts/MainLayout.jsx";
import instance from "../utils/axiosRequest.js";
import Lesson from "../pages/Lesson.jsx";
import CircleProgress from "../components/CircleProgress.jsx";
import SideBar from "../components/SideBar.jsx";

const Milestone = () => {
  const { courseOfLearningProcess, setFetchCourseOfLearningProcess } =
    useContext(UserInfo);
  const [milestones, setMilestones] = useState([]);
  let [searchParams] = useSearchParams();
  const sectionId = searchParams.get("sectionId");
  const courseId = searchParams.get("courseId");
  const getIndexSection = searchParams.get("index");
  const [milestoneId, setMilestoneId] = useState();
  const [countRequest, setCountRequest] = useState(0);
  const [isLesson, setIsLesson] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [gems, setGems] = useState(0);
  const [experiences, setExperiences] = useState(0);
  const [currentSection, setCurrentSection] = useState();
  const dayStreakDiv = useRef();
  const navigate = useNavigate();

  //Get current section
  useEffect(() => {
    const getSection = async () => {
      await instance
        .get(`sections?sectionId=${sectionId}`)
        .then((res) => {
          setCurrentSection(res.data.data.section);
        })
        .catch((err) => err);
    };
    getSection();
  }, [sectionId]);
  // Total gems and exps of this milestone
  useEffect(() => {
    let gem = 0;
    let exp = 0;
    for (let i = 0; i < currentLesson - 1; i++) {
      if (lessons[i]) {
        gem += lessons[i].gems;
        exp += lessons[i].experiences;
      }
    }
    setGems(gem);
    setExperiences(exp);
  }, [currentLesson]);
  // Get milestones of section
  useEffect(() => {
    const fetchMilestone = async () => {
      if (!sectionId) {
        navigate("/learning");
        return;
      }
      try {
        const res = await instance.get(`milestones?sectionId=${sectionId}`);
        setMilestones(res?.data?.data?.milestones || []);
      } catch (error) {
        return error;
      }
    };
    fetchMilestone();
  }, [sectionId]);
  // update section
  useEffect(() => {
    const fetchMilestone = async () => {
      try {
        const indexCourse = courseOfLearningProcess?.findIndex(
          (course) => course.courseId._id.toString() === courseId.toString(),
        );
        const indexSection = courseOfLearningProcess[
          indexCourse
        ]?.sections?.findIndex(
          (section) => section.sectionId.toString() === sectionId.toString(),
        );
        if(indexSection > -1) return
        if(milestones.length === 0) return
        await instance.patch(`learning_process/update_section`,{
          courseId,
          sectionId,
          totalMilestone: milestones?.length
        });
        setFetchCourseOfLearningProcess({
          type: 'update section',
          numb: Math.random()
        })
      } catch (error) {
        return error;
      }
    };
    fetchMilestone();
  }, [sectionId, milestones]);
  // format item
  milestones &&
    milestones.map((milestone) => {
      return (
        (milestone.status = 0),
        (milestone.show = milestone.show ? milestone.show : false),
        (milestone.currentLesson = 0),
        (milestone.totalLesson = 0),
        (milestone.totalLessonDone = 0)
      );
    });
  const indexCourse = courseOfLearningProcess?.findIndex(
    (course) => course.courseId._id.toString() === courseId.toString(),
  );
  const indexSection = courseOfLearningProcess[
    indexCourse
  ]?.sections?.findIndex(
    (section) => section.sectionId.toString() === sectionId.toString(),
  );
  courseOfLearningProcess[indexCourse]?.sections[
    indexSection
  ]?.milestones?.forEach((milestone) => {
    const index = milestones.findIndex(
      (item) => milestone.milestoneId.toString() === item._id.toString(),
    );
    if (index > -1) {
      milestones[index].status = milestone.status;
      milestones[index].currentLesson = milestone.currentLesson;
      milestones[index].totalLesson = milestone.totalLesson;
      milestones[index].totalLessonDone = milestone.totalLessonDone;
    }
  });
  // Get information of this milestone
  const handleShowInfoMilestone = async (item, indexMilestone, id) => {
    const indexCourse = courseOfLearningProcess?.findIndex(
      (course) => course.courseId._id.toString() === courseId.toString(),
    );
    const indexSection = courseOfLearningProcess[
      indexCourse
    ]?.sections?.findIndex(
      (section) => section.sectionId.toString() === sectionId.toString(),
    );
    const index = courseOfLearningProcess[indexCourse]?.sections[
      indexSection
    ]?.milestones?.findIndex(
      (milestone) => milestone.milestoneId.toString() === id.toString(),
    );
    if (countRequest === 1) return;
    if(id.toString() === milestoneId?.toString()){
      milestones[indexMilestone].show = !milestones[indexMilestone].show;
      setMilestones([...milestones]);
      setCountRequest(0)
      return
    }
    setMilestoneId(id)
    if (item.show) {
      milestones.map((item) => (item.show = false));
      setMilestones([...milestones]);
      setCountRequest(0);
      return;
    }
    setCountRequest(1);
    if (milestones[indexMilestone - 1]?.status === 1) {
      setCountRequest(0);
      return;
    }
    if (milestones[indexMilestone - 1]?.status === 0) {
      setCountRequest(0);
      return;
    }
    // Only for milestone at the first
    if (indexMilestone === 0) {
      if (index > -1) {
        await instance
          .get(`/lessons?sectionId=${sectionId}&milestoneId=${id}`)
          .then((res) => {
            setLessons(res?.data?.data?.lessons);
            setCurrentLesson(
              courseOfLearningProcess[indexCourse]?.sections[indexSection]
                ?.milestones[index].currentLesson,
            );
            milestones.map((item) => (item.show = false));
            milestones[indexMilestone].show = !milestones[indexMilestone].show;
            setMilestones([...milestones]);
            setCountRequest(0);
            return;
          })
          .catch(() => {
            setCountRequest(0);
            return;
          });
        return;
      }
      const result = await instance.patch("/learning_process/add_milestone", {
        courseId,
        sectionId,
        milestoneId: id,
      });
      if (result) {
        await instance
          .get(`/lessons?sectionId=${sectionId}&milestoneId=${id}`)
          .then((res) => {
            setLessons(res?.data?.data?.lessons);
            setFetchCourseOfLearningProcess("addMilestone" + id);
            milestones.map((item) => (item.show = false));
            milestones[indexMilestone].show = !milestones[indexMilestone].show;
            setCurrentLesson(1);
            setMilestones([...milestones]);
            setCountRequest(0);
            return;
          })
          .catch(() => {
            setCountRequest(0);
            return;
          });
        return;
      }
      return;
    }
    //for milestone index > 0
    switch (item.status) {
      case 1:
      case 2:
        await instance
          .get(`/lessons?sectionId=${sectionId}&milestoneId=${id}`)
          .then((res) => {
            setLessons(res?.data?.data?.lessons);
            milestones.map((item) => (item.show = false));
            milestones[indexMilestone].show = !milestones[indexMilestone].show;
            setCurrentLesson(
              courseOfLearningProcess[indexCourse]?.sections[indexSection]
                ?.milestones[index].currentLesson,
            );
            setMilestones([...milestones]);
            setCountRequest(0);
            return;
          })
          .catch((err) => {
            setCountRequest(0);
            return;
          });
        return;
      //Status is false so must add milestone, after this miletone have status 0
      default:
        const result = await instance.patch("/learning_process/add_milestone", {
          courseId,
          sectionId,
          milestoneId: id,
        });
        if (result) {
          await instance
            .get(`/lessons?sectionId=${sectionId}&milestoneId=${id}`)
            .then((res) => {
              setLessons(res?.data?.data?.lessons);
              milestones.map((item) => (item.show = false));
              milestones[indexMilestone].show =
                !milestones[indexMilestone].show;
              setMilestones([...milestones]);
              setCurrentLesson(1);
              setFetchCourseOfLearningProcess("addMilestone" + id);
              setCountRequest(0);
              return;
            })
            .catch(() => {
              setCountRequest(0);
              return;
            });
        }
    }
  };
  const handleStartLesson = () => {
    if (!lessons) return;
    setIsLesson(true);
  };
  return (
    <>
      {isLesson ? (
        <Lesson
          courseId={courseId}
          sectionId={sectionId}
          milestoneId={milestoneId}
          setIsLesson={setIsLesson}
          lessons={lessons}
          currentLesson={currentLesson}
          setCurrentLesson={setCurrentLesson}
        />
      ) : (
        <MainLayout>
          <div className="absolute top-[5rem] lg:top-[5.7rem] m-[0.5rem] w-full font-noto scrollbar-none md:left-[5.5rem] md:w-[49vw] lg:left-[17rem] lg:w-[39vw] xl:w-[50vw] 2xl:w-[52vw]">
            <div className="fixed top-[3.8rem] z-10 h-[5rem] w-full bg-white"></div>
            <div
              className={`fixed top-[4.7rem] z-10 flex h-[5.5rem] lg:h-[6.5rem] w-[96.5%] gap-[5px] rounded-2xl border-b-4 border-b-[#546b44] md:border-none bg-[#58cc02] pl-4 md:top-[6rem] md:left-[6rem] md:w-[46vw] lg:left-[18rem] lg:w-[38vw] xl:w-[46vw] 2xl:w-[49.5vw]`}
            >
              <div className="flex-grow flex flex-col justify-center ml-[0.4rem] sm:ml-[1.5rem]">
                <div className="flex text-white">
                  <i
                    onClick={() => navigate("/learning")}
                    className="fa-solid fa-arrow-left mr-3 flex cursor-pointer items-center text-sm md:text-lg xl:text-2xl hover:text-blue-500"
                  ></i>
                  <p className="text-sm sm:text-md lg:text-lg xl:text-xl font-medium flex items-center justify-center font-noto">
                    Phần {+getIndexSection + 1}
                  </p>
                </div>
                <div className="mt-2">
                  <p className="text-sm sm:text-md lg:text-lg xl:text-xl font-noto font-medium text-white">
                    {currentSection?.name}
                  </p>
                </div>
              </div>
              <div className="border-l-[2px] border-l-white w-[4rem] xl:w-[12rem] h-full text-white flex justify-center items-center cursor-pointer hover:text-blue-500">
                <i className="fa-sharp fa-solid fa-book text-3xl"></i>
                <p className="hidden xl:block text-xl font-medium ml-2">Hướng dẫn</p>
              </div>
            </div>
            <div className="absolute top-[4rem] mx-auto flex w-[98%] flex-col gap-20 overflow-x-hidden overflow-y-hidden rounded-2xl md:top-[6rem] lg:gap-24">
              {milestones &&
                milestones.map((item, index) => (
                  <ul
                    key={item._id}
                    onClick={() =>
                      handleShowInfoMilestone(item, index, item._id)
                    }
                    className={`relative mt-12 flex ${index % 2 ? "left-[66%]" : "left-[15%] sm:left-[20%]"} shadow-2xl`}
                  >
                    <li
                      className={`absolute top-[0.4rem] z-0 h-[5.5rem] w-[5.5rem] rounded-full ${index === 0 ? "bg-[#46a302]" : milestones[index - 1]?.status === 2 ? "bg-[#46a302]" : item.status === 0 ? "bg-[#b7b7b7]" : ""} md:top-[0.4rem]`}
                    ></li>
                    <li
                      className={`absolute flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full text-center text-lg text-blue-100 md:text-xl ${index === 0 ? "bg-[#58cc02]" : milestones[index - 1]?.status === 2 ? "bg-[#58cc02]" : item.status === 0 ? "bg-[#e5e5e5]" : ""} font-xl md:2xl cursor-pointer p-3 font-noto shadow-2xl transition-all active:translate-y-[0.5rem]`}
                    >
                      {item.show ? (
                        ""
                      ) : item.status === 1 ? (
                        <CircleProgress
                          currentLesson={item.currentLesson}
                          lessonLength={lessons?.length}
                        />
                      ) : item.status === 2 ? (
                        <CircleProgress
                          currentLesson={item.currentLesson}
                          lessonLength={lessons?.length}
                        />
                      ) : (
                        ""
                      )}
                      <img src= "/images/logo/white-star.png" className="w-[3rem] lazyload"/>
                      {item.status === 1 ? (
                        <div
                          style={{
                            clipPath:
                              "polygon(0% 0%, 100% 0%, 100% 93%, 51% 93%, 34% 100%, 25% 93%, 0 93%)",
                          }}
                          className={`${item.show ? "hidden" : " "} absolute -right-12 -top-5 flex h-[2.3rem] w-[8rem] animate-bounce items-center justify-center rounded-md bg-white border-[2px] border-[#e5e5e5] font-noto text-sm font-medium text-[#58cc02]`}
                        >
                          Chơi tiếp
                        </div>
                      ) : item.status === 2 ? (
                        <div
                          style={{
                            clipPath:
                              "polygon(0% 0%, 100% 0%, 100% 93%, 51% 93%, 34% 100%, 25% 93%, 0 93%)",
                          }}
                          className={`${item.show ? "hidden" : " "} absolute -right-12 -top-5 flex h-[2.3rem] w-[8rem] animate-bounce items-center justify-center rounded-md bg-white border-[2px] border-[#e5e5e5] font-noto text-sm font-medium text-[#58cc02]`}
                        >
                          Hoàn Thành
                        </div>
                      ) : (
                        ""
                      )}
                      {item?.show && (
                        <div
                          className={`absolute ${index % 2 ? "-left-[11.5rem] top-2 lg:-left-[13.5rem]" : "left-[6rem] top-2"} w-[11rem] rounded-lg bg-[#eeeeee] p-1 text-black shadow-2xl lg:w-[13rem]`}
                        >
                          {item.status === 2 ? (
                            <p className="mt-2 font-noto text-sm font-medium lg:text-lg">
                              Bạn nhận đã được:{" "}
                            </p>
                          ) : item.status === 1 ? (
                            <div className="mb-1 text-center font-noto text-sm font-medium lg:text-lg">
                              <span>Bài học: </span>
                              <span>{`${currentLesson} / ${lessons?.length}`}</span>
                            </div>
                          ) : (
                            <div className="mb-1 w-full h-[2.5rem] flex items-center justify-center text-center font-noto text-sm font-medium lg:text-lg">
                              <div className="w-full h-full flex justify-center items-center">
                                <i className="fa-solid fa-lock"></i>
                                <span className="ml-2"> Đã bị khóa</span>
                              </div>
                            </div>
                          )}
                          {item.status === 2 || item.status === 1 ?
                          <ul className="mx-auto mb-2 flex w-[80%] justify-around text-left text-sm font-bold">
                            <li className="flex items-center justify-center text-sm text-yellow-600 sm:text-xl">
                              {gems}
                              <img
                                src="/images/logo/coins.png"
                                className="ml-1 h-3 w-3 lg:h-5 lg:w-5 lazyload"
                              />
                            </li>
                            <li className="flex items-center justify-center text-sm text-green-700 sm:text-xl">
                              {experiences}
                              <img
                                src="/images/logo/explogo.jfif"
                                className="ml-1 w-3 lg:w-6 lazyload"
                              />
                            </li>
                          </ul> : ''}
                          {item?.status === 2 ? (
                            <button className="w-full cursor-pointer rounded-lg bg-[#58cc02] py-1 font-noto text-md font-medium text-white shadow-xl transition">
                              Hoàn thành
                            </button>
                          ) : item?.status === 1 ? (
                            <button
                              onClick={() => handleStartLesson()}
                              className="w-full cursor-pointer rounded-lg bg-[#58cc02] py-1 font-noto text-md font-medium text-white shadow-xl transition hover:text-green-600 focus:outline-none"
                            >
                              Bắt đầu
                            </button>
                          ): ''}
                        </div>
                      )}
                    </li>
                  </ul>
                ))}
            </div>
          </div>
          <SideBar />
        </MainLayout>
      )}
    </>
  );
};

export default Milestone;
