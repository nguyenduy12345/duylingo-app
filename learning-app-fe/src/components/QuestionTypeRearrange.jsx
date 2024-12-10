import { useEffect, useState, useContext } from "react";

import { UserInfo } from "../stores/user.store.jsx";

import instance from "../utils/axiosRequest.js";

const QuestionTypeRearrange = ({ question, lessonId, handleNextQuestion }) => {
  const {
    setProfile,
    lessonsOfSummaryLesson,
    setFetchLessonsOfSummaryLesson,
  } = useContext(UserInfo);
  const [correct, setCorrect] = useState();
  const [listWord, setListWord] = useState([])
  const [words, setWords] = useState([]);
  const [countRequest, setCountRequest] = useState(0);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const converToArrObj = question?.words?.map((word) => {
      return {
        word,
        selected: false,
      };
    });
    setWords(converToArrObj);
  }, [question]);
  const handleSelectWord = (word, index) => {
    if(word.selected) return
    words[index].selected = true;
    setWords([...words]);
    setListWord([...listWord, word.word]);
  };
  const handleReplayQuestion = () => {
    const converToArrObj = question?.words.map((word) => {
      return {
        word,
        selected: false,
      };
    });
    setWords(converToArrObj);
    setCorrect(undefined);
    setListWord([]);
    setCountRequest(0);
  };
  const handleCheckQuestion = async () => {
    if (countRequest === 1) return;
    setCountRequest(1);
    if (listWord.length === 0) {
      setMessage("Hãy chọn từ để sắp xếp");
      setTimeout(() => setMessage(""), 1500);
      setCountRequest(0);
      return;
    }
    const answer = listWord.join(" ")
    try {
      const result = await instance.post(`questions/${question._id}`, 
        {answer} 
      )
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
      setListWord([]);
      setCountRequest(0);
    }
  };
  return (
    <>
      {question && (
        <>
          <div className="mx-auto mb-2 mt-3 h-full w-full px-5 md:mt-7 md:w-[65%] md:px-0">
            <p className="text-center font-noto font-bold md:text-xl">
              Sắp xếp các từ bên dưới thành câu đúng nghĩa với câu đã cho:
            </p>
            <div className="">
              <div className="flex">
                <img
                  src="/images/logo/speaker.png"
                  alt=""
                  className="mr-2 h-10 w-10 md:mr-2 md:h-16 md:w-16 lazyload"
                />
                <p className="flex items-end font-noto md:text-xl">
                  : " {question?.document} "
                </p>
              </div>
              <div className="w-full flex px-4 items-center justify-center gap-1 h-[6rem] mt-3 rounded-xl border-2 border-[#e5e5e5]">
                <div className="px-4 h-auto flex flex-wrap gap-2 border-b-[1px] border-[#9f8c8c] text-md lg:text-lg">
                  {listWord && listWord?.map((word, index) => (
                  <p key={index}>
                    {word}
                  </p>
                  ))}
                </div>
                
              </div>
              <div className="mt-4 flex w-full items-center justify-center">
                <ul className="flex w-full flex-wrap justify-evenly gap-1 lg:w-5/6 md:gap-2">
                {words?.map((word, index) => (
                    <li 
                      key={index}
                      onClick={() => handleSelectWord(word, index)}
                      className="border-1 cursor-pointer rounded-lg border-[2px] h-[2.5rem] border-[#e5e5e5] px-6 lg:px-8 py-1 lowercase hover:bg-green-400 text-md lg:text-lg">
                      {word.selected === false && word.word ? word.word : " "}
                    </li>
                   ))}
                </ul>
              </div>
            </div>
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
                    className={`flex transform cursor-pointer items-center justify-center rounded-lg ${listWord.length > 0 ? "bg-[#58cc02] text-white" : `bg-[#e5e5e5] text-[#afafaf]`} px-6 py-2 font-noto font-medium transition-all duration-300 hover:scale-105 active:scale-95 md:px-6 md:py-3 md:text-lg md:font-bold`}
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

export default QuestionTypeRearrange;
