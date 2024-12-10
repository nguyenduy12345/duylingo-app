import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../utils/axiosRequest.js";
import MainLayout from "../layouts/MainLayout.jsx";
import SideBar from "../components/SideBar.jsx";
import CharacterCard from "../components/CharacterCard.jsx";

import { UserInfo } from "../stores/user.store.jsx";
const Alphabet = () => {
  const { courseOfLearningProcess } = useContext(UserInfo);
  const [dataAlphabet, setDataAlphabet] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    courseOfLearningProcess.length !== 0 &&
    courseOfLearningProcess[0].courseId.typeWritingSystem === "glyphs" ? navigate('/character') : navigate('/alphabet')
  },[courseOfLearningProcess])
  useEffect(() => {
    const fetch = async () => {
      try {
        const courseId =
          courseOfLearningProcess.length !== 0 &&
          courseOfLearningProcess[0].courseId._id;
        const result = await instance.get(
          `glyphs_alphabet?courseId=${courseId}`,
        );
        setDataAlphabet(result.data.data.glyphsAndAlphabet);
      } catch (error) {
        return error;
      }
    };
    fetch();
  }, [courseOfLearningProcess]);
  // const url = "https://r.yellowbridge.com/sounds/py-cbr/bu4.mp3"
  const handleListenAudio = (audio) => {
    audio.play();
  };
  
  return (
    <MainLayout>
      <div className="static mt-[5rem] md:absolute md:left-[5.5rem] md:w-[49vw] lg:left-[17rem] lg:w-[39vw] xl:w-[49vw]">
        <div className="flex flex-col items-center justify-center bg-white px-6 py-2 text-center">
          <h1 className="mb-3 text-xl font-semibold text-gray-800 lg:text-2xl">
            Hãy cùng học các âm tiếng Anh!
          </h1>
          <p className="lg:text-md text-sm">
            Rèn luyện đôi tai và học cách phát âm các âm tiếng Anh
          </p>
          <img
            src="/images/logo/sound.png"
            className="lazyload h-[4rem] lg:h-[5rem]"
          />
        </div>
        <div className="w-full">
          <div className="px-6">
            <h2 className="relative mb-4 text-center text-xl font-bold">
              <span className="absolute left-0 top-1/2 hidden -translate-y-1/2 transform border-t border-[#5a5757] sm:block sm:w-[20vw] md:w-[3rem] xl:w-[9rem]"></span>
              Bảng Chữ Cái
              <span className="absolute right-0 top-1/2 hidden -translate-y-1/2 transform border-t border-[#5a5757] sm:block sm:w-[20vw] md:w-[3rem] xl:w-[9rem]"></span>
            </h2>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 md:grid-cols-4 xl:grid-cols-5">
              {dataAlphabet?.letters?.map(({ letter, example, audioUrl }) => (
                <CharacterCard
                  key={letter}
                  handleListenAudio={handleListenAudio}
                  character={letter}
                  example={example}
                  audioUrl={audioUrl}
                />
              ))}
            </div>
            <h2 className="relative mb-4 mt-[1rem] text-center text-xl font-bold">
              <span className="absolute left-0 top-1/2 hidden -translate-y-1/2 transform border-t border-[#5a5757] sm:block sm:w-[20vw] md:w-[3rem] xl:w-[9rem]"></span>
              Phát âm
              <span className="absolute right-0 top-1/2 hidden -translate-y-1/2 transform border-t border-[#5a5757] sm:block sm:w-[20vw] md:w-[3rem] xl:w-[9rem]"></span>
            </h2>
            <div className="">
              <div>
                <h2 className="relative mb-4 mt-[1rem] text-center text-xl font-bold">
                  <span className="absolute left-[10%] top-1/2 hidden -translate-y-1/2 transform border-t border-[#5a5757] sm:block sm:w-[20vw] md:w-[3rem] xl:w-[9rem]"></span>
                  Vowels
                  <span className="absolute right-[10%] top-1/2 hidden -translate-y-1/2 transform border-t border-[#5a5757] sm:block sm:w-[20vw] md:w-[3rem] xl:w-[9rem]"></span>
                </h2>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
                  {dataAlphabet?.phonetic?.vowels?.map(
                    ({ character, example, audioUrl }) => (
                      <CharacterCard
                        handleListenAudio={handleListenAudio}
                        key={character}
                        character={character}
                        example={example}
                        audioUrl={audioUrl}
                      />
                    ),
                  )}
                </div>
              </div>
              <div>
                <h2 className="relative mb-4 mt-[2rem] text-center text-xl font-bold">
                  <span className="absolute left-[10%] top-1/2 hidden -translate-y-1/2 transform border-t border-[#5a5757] sm:block sm:w-[20vw] md:w-[3rem] xl:w-[9rem]"></span>
                  Consonants
                  <span className="absolute right-[10%] top-1/2 hidden -translate-y-1/2 transform border-t border-[#5a5757] sm:block sm:w-[20vw] md:w-[3rem] xl:w-[9rem]"></span>
                </h2>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
                  {dataAlphabet?.phonetic?.consonants?.map(
                    ({ character, example, audioUrl}) => (
                      <CharacterCard
                        handleListenAudio={handleListenAudio}
                        key={character}
                        character={character}
                        example={example}
                        audioUrl={audioUrl}
                      />
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SideBar />
    </MainLayout>
  );
};

export default Alphabet;
