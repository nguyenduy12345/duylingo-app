import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import instance from "../utils/axiosRequest.js";
import MainLayout from "../layouts/MainLayout.jsx";
import SideBar from "../components/SideBar.jsx";
import CharacterCard from "../components/CharacterCard.jsx";

import { UserInfo } from "../stores/user.store.jsx";

import getUrlAudioFromArrays from "../functions/getUrlAudio.js";

const Character = () => {
  const { courseOfLearningProcess } = useContext(UserInfo);
  const [dataAlphabet, setDataAlphabet] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    courseOfLearningProcess.length !== 0 &&
    courseOfLearningProcess[0].courseId.typeWritingSystem === "glyphs"
      ? navigate("/character")
      : navigate("/alphabet");
  }, [courseOfLearningProcess]);
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
  const handleListenAudio = (audio) => {
    audio.play();
  };
  return (
    <MainLayout>
      <div className="static mt-[5rem] md:absolute md:left-[5.5rem] md:w-[49vw] lg:left-[17rem] lg:w-[39vw] xl:w-[49vw]">
        <div className="flex flex-col items-center justify-center bg-white px-6 py-2 text-center">
          <h1 className="mb-3 text-xl font-semibold text-gray-800 lg:text-2xl">
            Hãy cùng học âm bính(Pinyin)
          </h1>
          <p className="lg:text-md text-sm">
            Làm quen với hệ thống âm thanh tiếng Trung
          </p>
          <img
            src="/images/logo/sound.png"
            className="lazyload h-[4rem] lg:h-[5rem]"
          />
        </div>
        <div className="w-full">
          <div className="px-6">
            <h2 className="relative mt-[1rem] text-center text-xl font-bold">
              <span className="absolute left-[10%] top-1/2 hidden -translate-y-1/2 transform border-t border-[#5a5757] sm:block sm:w-[20vw] md:w-[3rem] xl:w-[9rem]"></span>
              Các thanh điệu
              <span className="absolute right-[10%] top-1/2 hidden -translate-y-1/2 transform border-t border-[#5a5757] sm:block sm:w-[20vw] md:w-[3rem] xl:w-[9rem]"></span>
            </h2>
            <p className="text-md mb-4 text-center lg:text-lg">
              Mỗi âm tiết có một trong năm thanh điệu
            </p>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 md:grid-cols-3 xl:grid-cols-5">
              {dataAlphabet?.characters?.tones?.map(
                ({ character, example, audioUrl }) => (
                  <CharacterCard
                    key={character}
                    handleListenAudio={handleListenAudio}
                    character={character}
                    example={example}
                    audioUrl={audioUrl}
                  />
                ),
              )}
            </div>
            <div>
              <h2 className="relative mt-[1rem] text-center text-xl font-bold">
                <span className="absolute left-[10%] top-1/2 hidden -translate-y-1/2 transform border-t border-[#5a5757] sm:block sm:w-[20vw] md:w-[3rem] xl:w-[9rem]"></span>
                Âm thanh đầu
                <span className="absolute right-[10%] top-1/2 hidden -translate-y-1/2 transform border-t border-[#5a5757] sm:block sm:w-[20vw] md:w-[3rem] xl:w-[9rem]"></span>
              </h2>
              <p className="text-md mb-4 text-center lg:text-lg">
                Âm thanh đứng ở đầu một âm tiết
              </p>
              <div className="grid grid-cols-4 gap-4 sm:grid-cols-5">
                {dataAlphabet?.characters?.initials?.map(
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
              <h2 className="relative mt-[2rem] text-center text-xl font-bold">
                <span className="absolute left-[10%] top-1/2 hidden -translate-y-1/2 transform border-t border-[#5a5757] sm:block sm:w-[20vw] md:w-[3rem] xl:w-[9rem]"></span>
                Âm thanh cuối
                <span className="absolute right-[10%] top-1/2 hidden -translate-y-1/2 transform border-t border-[#5a5757] sm:block sm:w-[20vw] md:w-[3rem] xl:w-[9rem]"></span>
              </h2>
              <p className="text-md mb-4 text-center lg:text-lg">
                Âm thanh đứng ở cuối một âm tiết
              </p>
              <div className="grid grid-cols-4 gap-4 sm:grid-cols-5">
                {dataAlphabet?.characters?.finals.map(
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
          </div>
        </div>
      </div>
      <SideBar />
    </MainLayout>
  );
};

export default Character;
