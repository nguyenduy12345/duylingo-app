
const Congratulation = ({ setIsCongratulation, currentLesson, lessons, setIsLesson }) => {
  const handleContinueLesson = () => {
    setIsCongratulation(false)
    setIsLesson(false)
  };
  return (
    <div className="fixed z-30 mx-auto my-auto flex h-screen w-full items-center justify-center bg-[#e8e8e8]">
      <div className="w-[95%] sm:w-[70%]">
        <div className="flex w-full items-center justify-center">
          <div
            style={{
              clipPath:
                "polygon(0% 0%, 100% 0%, 100% 96%, 64% 96%, 51% 100%, 36% 96%, 0 95%)",
            }}
            className="ml-2 w-[70%] rounded-xl bg-white p-4 font-noto"
          >
            <ul className="flex justify-center items-center text-center text-2xl font-bold">
              <li>
                <img src='/images/congru.png' className="w-12 h-12 lazyload" />
              </li>
              <li className="ml-2">
                CHÚC MỪNG
              </li>
            </ul>
            <p className="text-center">Bạn vừa hoàn thành một bài học</p>
            <p className="text-center font-noto">Bạn đã nhận được: </p>
            <ul className="mx-auto mt-3 mb-3 flex w-[90%] sm:w-[60%] justify-around text-left text-xl font-bold">
              <li className="flex items-center">
                {lessons[currentLesson - 1].gems}
                <img src="/images/logo/coins.png" className="ml-1 h-4 lazyload" />
              </li>
              <li className="flex items-center">
                {lessons[currentLesson - 1].experiences}
                <img src="/images/logo/explogo.jfif" className="ml-1 h-4 lazyload" />
              </li>
              <li className="flex items-center">
                <span>5</span>
                <img src="/images/logo/heart.webp" className="ml-1 h-4 lazyload" />
              </li>
            </ul>
            <div onClick={() => handleContinueLesson()}
              className="w-[9rem] text-center mx-auto mb-4 mt-5 cursor-pointer border-2 border-[#b7dceb] rounded-lg bg-[#d3e9f8] hover:text-white hover:border-[#dfe1e2] shadow-xl"
              >Tiếp tục</div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <img src="/images/cat_congru1.png" className="h-[10rem] w-[10rem] lazyload" />
        </div>
      </div>
    </div>
  );
};

export default Congratulation;
