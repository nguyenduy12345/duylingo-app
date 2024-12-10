import { useState, useEffect, useContext } from "react";
import { useSearchParams, useNavigate, Outlet } from "react-router-dom";

import instance from "../utils/axiosRequest.js";
import Course from "../components/Course.jsx";
import MainLayout from "../layouts/MainLayout.jsx";

import { UserInfo } from "../stores/user.store.jsx";

const Courses = () => {
  const { courseOfLearningProcess, setFetchCourseOfLearningProcess } =
    useContext(UserInfo);
  const [listCourse, setListCourse] = useState([]);
  const [countRequest, setCountRequest] = useState(0);
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    const getCourse = async () => {
      await instance
        .get("courses")
        .then((res) => setListCourse(res?.data?.data?.courses || []))
        .catch((err) => err);
    };
    getCourse();
  }, [courseOfLearningProcess]);
  const handleAddCourse = async (item, id) => {
    if (countRequest === 1) return;
    setCountRequest(1);
    switch (item.status) {
      case 1:
      case 2:
        await instance
          .patch(`learning_process/update_recent_access?courseId=${id}`)
          .then((res) => {
            navigate(`/learning?courseId=${id}`);
            setFetchCourseOfLearningProcess(id + "update recent access");
            setCountRequest(0);
          })
          .catch((err) => {
            setCountRequest(0);
          });
        return;
      default:
        try {
          await instance.post(`learning_process/add_course?courseId=${id}`);
          setSearchParams({ courseId: id });
          setFetchCourseOfLearningProcess(id + "add");
          navigate(`/learning?courseId=${id}`);
          setCountRequest(0);
        } catch (error) {
          setCountRequest(0);
          return error;
        }
    }
  };
  listCourse.map((course) => (course.status = 0));
  courseOfLearningProcess.forEach((course) => {
    const index = listCourse.findIndex(
      (item) => course.courseId._id.toString() === item._id.toString(),
    );
    if (index > -1) {
      listCourse[index].status = course.status;
    }
  });

  return (
    <MainLayout>
      <div className="mt-[5rem] p-[0.8rem] md:absolute md:left-[5.5rem] lg:left-[17rem]">
        <p className="mb-4 font-noto text-xl font-medium md:mb-9">
          Hãy lựa chọn các khóa học bạn cần:{" "}
        </p>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {listCourse &&
            listCourse.map((item, index) => (
              <li
                key={index}
                className={"relative cursor-pointer rounded-lg bg-[#e5e5e5] shadow-xl hover:shadow-2xl"}
              >
                <Course
                  handleAddCourse={() => handleAddCourse(item, item._id)}
                  name={item.name}
                  image={item.image}
                  numOfLearner={item.numOfLearner}
                />
                {item.status !== 0 ? (
                  <p className="absolute right-0 top-0 z-10 flex w-10 cursor-pointer items-center justify-center rounded-bl-lg bg-red-200 font-noto hover:bg-[#eeeeee] hover:text-black">
                    <i className="fa-solid fa-check text-2xl font-bold"></i>
                  </p>
                ) : null}
              </li>
            ))}
        </ul>
      </div>
    </MainLayout>
  );
};

export default Courses;
