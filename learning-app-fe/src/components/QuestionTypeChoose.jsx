import { useEffect, useState, useContext } from "react";

import { UserInfo } from "../stores/user.store.jsx";

import instance from "../utils/axiosRequest.js";

const QuestionTypeChoose = ({ question, lessonId, handleNextQuestion }) => {
  const {
    setProfile,
    lessonsOfSummaryLesson,
    setFetchLessonsOfSummaryLesson,
  } = useContext(UserInfo);
  const [correct, setCorrect] = useState();
  const [choose, setChoose] = useState();
  const [answers, setAnswers] = useState([]);
  const [countRequest, setCountRequest] = useState(0);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const converToArrObj = question?.answers.map((answer) => {
      return {
        answer,
        selected: false,
      };
    });
    setAnswers(converToArrObj);
  }, [question]);
  const renderStatus = (index) => {
    switch (index) {
      case 0:
        return "A.";
      case 1:
        return "B.";
      case 2:
        return "C.";
      default:
        return "D.";
    }
  };
  const handleChooseAnswer = (index) => {
    answers.map((item) => (item.selected = false));
    answers[index].selected = true;
    setAnswers([...answers]);
    setChoose(index + 1);
  };
  const handleReplayQuestion = () => {
    const converToArrObj = question?.answers.map((answer) => {
      return {
        answer,
        selected: false,
      };
    });
    setAnswers(converToArrObj);
    setCorrect(undefined);
    setChoose(undefined);
    setCountRequest(0);
  };
  const handleCheckQuestion = async () => {
    if (countRequest === 1) return;
    setCountRequest(1);
    if (!choose) {
      setMessage("Bạn chưa chọn đáp án!");
      setTimeout(() => setMessage(""), 1500);
      setCountRequest(0);
      return;
    }
    try {
      const result = await instance.post(`questions/${question._id}`, {answer: choose - 1} )
      if (result.data.data.correct) {
        setCountRequest(0);
        setCorrect(true);
        return;
      } else {
        setCorrect(false);
        await instance.patch("users/update_asset", {
          hearts: Math.random(),
        });
        setProfile(prevProfile => ({
          ...prevProfile,
          hearts: prevProfile.hearts - 1,
        }));
        const findIndexLesson = lessonsOfSummaryLesson.findIndex(
          (lesson) => lesson.lesson._id.toString() === lessonId,
        );
        if (findIndexLesson > -1) {
          const findWrongQuestion = lessonsOfSummaryLesson[
            findIndexLesson
          ].wrongQuestions.findIndex(
            (ques) => ques.toString() === question._id.toString(),
          );
          if (findWrongQuestion > -1) {
            setCountRequest(0);
            return;
          }
          await instance
            .patch("summary_lesson/update_lesson", {
              lessonId,
              questionId: question._id,
            })
            .then(() => {
              setFetchLessonsOfSummaryLesson({ numb: Math.random() });
              setCountRequest(0);
              return;
            })
            .catch((err) => {
              setFetchLessonsOfSummaryLesson({ numb: Math.random() });
              setCountRequest(0);
              return;
            });
        }
        return;
      }
    } catch (error) {
      setCountRequest(0)
    }
  };
  const handleNextNewQuestion = () => {
    if (correct) {
      handleNextQuestion();
      setCorrect(undefined);
      setChoose(undefined);
      setCountRequest(0);
    }
  };
  return (
    <>
      {question && (
        <>
          <div className="mx-auto mb-2 mt-3 h-full w-full px-5 md:mt-7 md:w-[65%] md:px-0">
            <p className="mb-2 text-center font-noto font-bold md:text-2xl">
              Chọn đáp án đúng
            </p>
            <div className="">
              <div className="flex">
                <img
                  src="/images/meo_image_learning.png"
                  alt=""
                  className="mr-2 h-10 w-10 md:mr-5 md:h-24 md:w-24 lazyload"
                />
                <p className="flex items-end font-noto md:text-xl">
                  {question?.question}
                </p>
              </div>

              <div className="mt-2 flex w-full items-center justify-center">
                <ul className="mt-4 grid w-[80%] grid-cols-1 gap-4 sm:grid-cols-2 md:mt-6 md:w-full">
                  {answers &&
                    answers.map((answer, index) => (
                      <li
                        onClick={() => handleChooseAnswer(index)}
                        key={index}
                        className={`border-1 cursor-pointer rounded-lg py-4 pl-2 pr-8 font-medium ${answer.selected ? "bg-[#d7ffb8]" : "bg-[#eeeeee]"} px-2 hover:bg-[#d7ffb8] md:text-xl`}
                      >
                        <span className="pl-3 font-noto font-medium">
                          {renderStatus(index)}
                        </span>
                        <span className="font-noto">{answer.answer}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>

          <div
            className={`fixed bottom-0 h-[10rem] lg:h-[13rem] w-full ${correct === true ? "bg-[#d7ffb8]" : correct === false ? "bg-[#ffdfe0]" : "bg-[#ffffff]"} border-t-2 border-t-[#e5e5e5] px-3 py-2 md:mt-6 md:px-0 md:py-3`}
          >
            <div className="relative mx-auto flex w-full justify-between md:w-[65%]">
              <div className="cursor-pointer">
                {correct === true ? (
                  ""
                ) : correct === false ? (
                  ""
                ) : (
                  <button
                    onClick={handleReplayQuestion}
                    className="borer-[#e5e5e5] flex transform items-center justify-center rounded-xl border-[3px] border-b-[5px] bg-white px-6 py-2 font-noto font-medium text-[#afafaf] transition-all duration-300 hover:scale-105 active:scale-95 md:px-10 md:py-3 md:text-xl md:font-bold"
                  >
                    Làm lại
                  </button>
                )}
              </div>
              <div className="cursor-pointer">
                {correct === true ? (
                  <button
                    onClick={handleNextNewQuestion}
                    className="flex transform cursor-pointer items-center justify-center rounded-lg bg-[#58cc02] px-6 py-2 font-noto font-medium text-white transition-all duration-300 hover:scale-105 active:scale-95 md:px-6 md:py-3 md:text-lg md:font-bold"
                  >
                    Câu tiếp theo
                  </button>
                ) : correct === false ? (
                  <button
                    onClick={handleReplayQuestion}
                    className="borer-[#e5e5e5] flex transform cursor-pointer items-center justify-center rounded-xl border-[1px] border-b-[5px] bg-[#58cc02] px-6 py-2 font-noto font-medium text-white transition-all duration-300 hover:scale-105 active:scale-95 md:px-6 md:py-3 md:text-lg md:font-bold"
                  >
                    Làm lại
                  </button>
                ) : (
                  <button
                    onClick={handleCheckQuestion}
                    className={`flex transform cursor-pointer items-center justify-center rounded-lg ${choose ? "bg-[#58cc02] text-white" : `bg-[#e5e5e5] text-[#afafaf]`} px-6 py-2 font-noto font-medium transition-all duration-300 hover:scale-105 active:scale-95 md:px-6 md:py-3 md:text-lg md:font-bold`}
                  >
                    Kiểm tra đáp án
                  </button>
                )}
              </div>
              {correct === true ? (
                <div className="absolute left-2 top-0 text-4xl font-bold text-green-600 md:left-2 md:text-6xl">
                  <p>Good!</p>
                  <p className="text-xl">Cùng tới với câu tiếp theo nào!</p>
                </div>
              ) : correct === false ? (
                <div className="absolute left-2 top-0 text-4xl font-bold text-red-600 md:left-2 md:text-6xl">
                  <p>Sai!</p>
                  <p className="text-xl">Bạn làm sai rồi, làm lại nhé!</p>
                </div>
              ) : (
                ""
              )}
            </div>
            <p className="mt-3 w-full text-center font-noto text-lg font-semibold text-red-500 md:text-xl">
              {message}
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default QuestionTypeChoose;
