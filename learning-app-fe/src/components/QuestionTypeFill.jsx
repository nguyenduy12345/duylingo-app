import { useEffect, useState, useRef, useContext } from "react";

import { UserInfo } from "../stores/user.store.jsx";
import instance from "../utils/axiosRequest.js";

const QuestionTypeFill = ({ question, lessonId, handleNextQuestion }) => {
  const {
    setProfile,
    lessonsOfSummaryLesson,
    setFetchLessonsOfSummaryLesson,
  } = useContext(UserInfo);
  const [document, setDocument] = useState(question?.document || "");
  const [words, setWords] = useState(question?.words || []);
  const [indexWord, setIndexWord] = useState(false);
  const [listWordDrop, setListWordDrop] = useState([]);
  const [correct, setCorrect] = useState(undefined);
  const [message, setMessage] = useState("");
  const [countRequest, setCountRequest] = useState(0);

  const emtyDiv = useRef();
  const handleDragOverWord = (e) => {
    e.preventDefault();
  };
  const handleDropWord = (index, e) => {
    e.target.innerHTML = words[indexWord];
    const crrWords = [...words];
    crrWords.splice(indexWord, 1);
    setWords(crrWords);
    setIndexWord(false);
    const findWord = listWordDrop.findIndex((item) => +item.index === +index);
    if (findWord > -1) {
      const crrWords = [...words];
      crrWords.splice(indexWord, 1);
      crrWords.splice(indexWord, 0, listWordDrop[findWord].word);
      setWords(crrWords);
      listWordDrop[findWord].word = words[indexWord];
      setListWordDrop([...listWordDrop]);
    } else {
      setListWordDrop([...listWordDrop, { index, word: words[indexWord] }]);
    }
  };
  const handleDragStartWord = (word, index) => {
    setIndexWord(index);
  };
  const replaceUnderscore = (str) => {
    const parts = str.split("__________");
    return parts.map((part, index) => {
      if (index < parts.length - 1) {
        return (
          <>
            {part}
            <div
              key={index}
              onDragOver={handleDragOverWord}
              onDrop={(e) => handleDropWord(index, e)}
              style={{ userSelect: "none" }}
              className="m-1 inline-block h-6 w-24 rounded-sm bg-gray-300 text-center normal-case md:h-7 md:w-28"
            ></div>
          </>
        );
      }
      return part;
    });
  };

  //Check correct if false will -1 heart user
  const handleCheckQuestion = async () => {
    if (countRequest === 1) return;
    setCountRequest(1);
    if (listWordDrop.length !== +question?.countCorrect) {
      setCountRequest(0);
      setMessage("Hãy điền đủ vị trí trống trong đoạn văn!");
      setTimeout(() => setMessage(""), 1500);
      return;
    }
    try {
      const result = await instance.post(`questions/${question._id}`, {
        answer: listWordDrop,
      });
      if (result.data.data.correct) {
        setCorrect(true);
        setCountRequest(0);
        return;
      } else {
        setCorrect(false);
        await instance.patch("users/update_asset", {
          hearts: Math.random(),
        });
        setProfile((prevProfile) => ({
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
    setCountRequest(0);
    setWords(question?.words);
    setListWordDrop([]);
    setCorrect(undefined);
    setIndexWord(false);
    if (emtyDiv.current) {
      const childrens = emtyDiv.current.children;
      for (let child of childrens) {
        child.innerHTML = "&nbsp;";
      }
    }
  };

  //Get new question
  useEffect(() => {
    setDocument(question?.document);
    setWords(question?.words);
    setListWordDrop([]);
    setCorrect(undefined);
    setIndexWord(false);
    if (emtyDiv.current) {
      const childrens = emtyDiv.current.children;
      for (let child of childrens) {
        child.innerHTML = "&nbsp;";
      }
    }
  }, [question]);
  const handleNextNewQuestion = () => {
    if (correct) {
      handleNextQuestion();
      setCorrect(undefined);
      setCountRequest(0);
      return;
    }
  };
  return (
    <>
      {question && (
        <>
          <div className="mx-auto mt-3 w-full px-5 md:mb-8 md:mt-7 md:w-[75%] md:px-0">
            <p className="text-md text-center font-noto font-medium md:mb-4 lg:text-lg">
              Di chuyển các từ bên dưới để ghép vào chỗ trống của đoạn văn bên
              dưới sao cho đúng:
            </p>
            <div className="mt-2 md:mt-6">
              <div className="flex">
                <img
                  src="/images/meo_image_learning.png"
                  alt=""
                  className="lazyload mr-2 h-10 w-10 md:mr-5 md:h-24 md:w-24"
                />
                <div
                  ref={emtyDiv}
                  className="text-md inline-block w-full items-end font-noto lg:text-lg"
                >
                  {replaceUnderscore(document)}
                </div>
              </div>
              <div className="mt-4 flex w-full items-center justify-center lg:mt-6">
                <ul className="flex w-full flex-wrap justify-evenly gap-1 md:gap-4 lg:mt-4 lg:w-5/6">
                  {words.map((word, index) => (
                    <li
                      key={index}
                      draggable="true"
                      onDragStart={() => handleDragStartWord(word, index)}
                      className="border-1 cursor-pointer rounded-lg bg-[#eeeeee] px-6 py-1 text-sm lowercase hover:bg-green-400 md:px-8 lg:text-lg"
                    >
                      {word}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div
            className={`fixed bottom-0 h-52 w-full ${correct === true ? "bg-[#d7ffb8]" : correct === false ? "bg-[#ffdfe0]" : "bg-[#ffffff]"} border-t-2 border-t-[#e5e5e5] px-3 py-2 md:mt-6 md:px-0 md:py-3`}
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
                    className={`flex transform cursor-pointer items-center justify-center rounded-lg ${listWordDrop.length === +question?.countCorrect ? "bg-[#58cc02] text-white" : `bg-[#e5e5e5] text-[#afafaf]`} px-6 py-2 font-noto font-medium transition-all duration-300 hover:scale-105 active:scale-95 md:px-6 md:py-3 md:text-lg md:font-bold`}
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

export default QuestionTypeFill;
