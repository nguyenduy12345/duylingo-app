import { useEffect, useState, useContext } from "react";

import { UserInfo } from "../stores/user.store.jsx";

import instance from "../utils/axiosRequest.js";
const QuestionTypeMatch = ({ question, lessonId, handleNextQuestion }) => {
  const {
    setProfile,
    lessonsOfSummaryLesson,
    setFetchLessonsOfSummaryLesson,
  } = useContext(UserInfo);
  const [leftOptions, setLeftOptions] = useState([]);
  const [rightOptions, setRightOptions] = useState([]);
  const [correct, setCorrect] = useState();
  const [message, setMessage] = useState("");
  const [countRequest, setCountRequest] = useState(0);
  const [listWord, setListWord] = useState([]);
  const [listPaire, setListPaire] = useState([]);
  const [isLeftColChoose, setIsLeftColChoose] = useState(0);
  // covert list paire arr to obj
  useEffect(() => {
    const obj = [];
    for (let i = 0; i <= listWord.length / 2 + 2; i += 2) {
      obj.push({
        left: listWord[i],
        right: listWord[i + 1],
      });
    }
    setListPaire(obj);
  }, [listWord]);
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  //sort and set list word
  useEffect(() => {
    const rightWord = question?.rightOptions?.map((item) => {
      return {
        right: item,
        selected: false,
      };
    });
    const leftWord = question?.leftOptions?.map((item) => {
      return {
        left: item,
        selected: false,
      };
    });
    setRightOptions(shuffleArray(rightWord));
    setLeftOptions(leftWord);
  }, [question]);
  const handleGetWordFromLeft = (word, index) => {
    if (leftOptions[index].selected === true) return;
    if (isLeftColChoose !== 0) return;
    setIsLeftColChoose(1);
    leftOptions[index].selected = true;
    setLeftOptions([...leftOptions]);
    setListWord([...listWord, word]);
  };
  const handleGetWordFromRight = (word, index) => {
    if (rightOptions[index].selected === true) return;
    if (isLeftColChoose !== 1) return;
    setIsLeftColChoose(0);
    rightOptions[index].selected = true;
    setRightOptions([...rightOptions]);
    setListWord([...listWord, word]);
  };
  const handleCheckQuestion = async () => {
    if (countRequest === 1) return;
    setCountRequest(1);
    if (listPaire.length !== question?.leftOptions.length) {
      setCountRequest(0);
      setMessage("Hãy nối tất cả các từ đã cho bên dưới");
      setTimeout(() => setMessage(""), 1500);
      return;
    }
    try {
      const result = await instance.post(`questions/${question._id}`, {answer: listPaire} )
      if (result.data.data.correct) {
        setCorrect(true);
        setCountRequest(0);
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
      setCountRequest(0);
    }
  };
  const handleReplayQuestion = () => {
    const rightWord = question?.rightOptions.map((item) => {
      return {
        right: item,
        selected: false,
      };
    });
    const leftWord = question?.leftOptions.map((item) => {
      return {
        left: item,
        selected: false,
      };
    });
    setIsLeftColChoose(0);
    setRightOptions(shuffleArray(rightWord));
    setLeftOptions(leftWord);
    setListWord([]);
    setListPaire([]);
    setCountRequest(0);
    setCorrect(undefined);
  };
  const handleNextNewQuestion = () => {
    if (correct) {
      setCountRequest(0);
      handleNextQuestion();
      setListWord([]);
      setListPaire([]);
      setCorrect(undefined);
      return;
    }
  };
  return (
    <>
      {question && (
        <>
          <div className="mx-auto mt-[2rem] w-full px-5 md:w-[65%] md:px-0">
            <p className="text-md text-center font-noto font-bold lg:text-lg">
              Nối các từ từ bên cột trái với các từ tại cột phải sao cho đúng
            </p>
            <div className="flex w-full justify-between">
              <ul className="mt-4 grid w-[44%] grid-cols-1 gap-2 md:mt-6 md:w-[33%]">
                {leftOptions &&
                  leftOptions?.map((option, index) => (
                    <li
                      onClick={() => handleGetWordFromLeft(option?.left, index)}
                      key={index}
                      className={`border-1 text-md relative flex h-[2.5rem] lg:h-[3rem] w-full cursor-pointer items-center justify-center rounded-xl border-[2px] border-b-[4px] border-[#e5e5e5] p-1 font-noto hover:bg-green-200 active:scale-95 md:text-lg`}
                    >
                      <div className="absolute left-[0.5rem] flex h-[2rem] w-[2rem] items-center justify-center rounded-full border-[2px] border-[#e5e5e5] text-[#afafaf] sm:left-[1rem]">
                        {index + 1}
                      </div>
                      {option?.selected ? "" : option?.left}
                    </li>
                  ))}
              </ul>
              <ul className="mt-4 grid w-[44%] grid-cols-1 gap-2 md:mt-6 md:w-[33%]">
                {rightOptions &&
                  rightOptions?.map((option, index) => (
                    <li
                      onClick={() =>
                        handleGetWordFromRight(option?.right, index)
                      }
                      key={index}
                      className={`border-1 text-md relative flex h-[2.5rem] lg:h-[3rem] w-full cursor-pointer items-center justify-center rounded-xl border-[2px] border-b-[4px] border-[#e5e5e5] p-1 font-noto hover:bg-green-200 active:scale-95 md:text-lg`}
                    >
                      <div className="absolute left-[0.5rem] flex h-[2rem] w-[2rem] items-center justify-center rounded-full border-[2px] border-[#e5e5e5] text-[#afafaf] sm:left-[1rem]">
                        {index + 1}
                      </div>
                      {option?.selected ? "" : option?.right}
                    </li>
                  ))}
              </ul>
            </div>

            <h4 className="md:xl mb-2 mt-5 font-noto text-md md:text-md xl:text-lg lg:mb-5 font-medium">
              Các từ đã nối:{" "}
            </h4>
            <ul className="flex flex-wrap justify-evenly gap-2">
              {listPaire &&
                listPaire.map((item, index) => (
                  <li
                    key={index}
                    className="text-md flex rounded-xl border-[2px] border-b-[4px] border-[#e5e5e5] bg-white px-4 lg:py-1 lg:px-6 font-noto"
                  >
                    <p>{`${item.left ? item.left + "__" : ""}`}</p>
                    <p> {item.right ? item.right : ""}</p>
                  </li>
                ))}
            </ul>
          </div>

          <div
            className={`fixed bottom-0 h-[10rem] w-full ${correct === true ? "bg-[#d7ffb8]" : correct === false ? "bg-[#ffdfe0]" : "bg-[#ffffff]"} border-t-2 border-t-[#e5e5e5] px-3 py-2 md:mt-6 md:px-0 md:py-3`}
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
                    className={`flex transform cursor-pointer items-center justify-center rounded-lg ${listPaire.length === question?.leftOptions?.length ? "bg-[#58cc02] text-white" : `bg-[#e5e5e5] text-[#afafaf]`} px-6 py-2 font-noto font-medium transition-all duration-300 hover:scale-105 active:scale-95 md:px-6 md:py-3 md:text-lg md:font-bold`}
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

export default QuestionTypeMatch;
