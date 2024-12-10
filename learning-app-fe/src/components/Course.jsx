

const Course = ({name, image, numOfLearner, handleAddCourse}) => {
  return (
    <div onClick={handleAddCourse} className="w-full bg-[#eeeeee] p-5">
      <img src={image} className="w-full h-[7rem] lazyload" />
      <p className="text-center font-medium mt-5 font-noto text-sm">Tiếng {name}</p>
      <p className="text-center font-medium font-noto text-sm">Số người học: {numOfLearner}</p>
    </div>
  )
}

export default Course
