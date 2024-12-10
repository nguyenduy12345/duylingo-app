const CircleProgress = ({ currentLesson, lessonLength }) => {
    const radius = 55;
    const strokeWidth = 8; 
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - ((currentLesson > lessonLength ? currentLesson - 1 : currentLesson - 1) / (lessonLength ? lessonLength : 6)) * circumference;
    const cxcy = 80
    return (
        <svg
          width="250"
          height="250"
          className="rotate-90 transform absolute -left-[7.89rem] -bottom-[8rem] flex justify-center items-center"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx={cxcy}
            cy={cxcy}
            r={radius}
            stroke="#ddd"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={cxcy}
            cy={cxcy}
            r={radius}
            stroke="#58cc02"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-500"
          />
        </svg>
    );
};

export default CircleProgress;
