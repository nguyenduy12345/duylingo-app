import { Link } from "react-router-dom";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({
  ease: "power1.out"
});

const courses = [
  {
    name: "Tiếng Anh",
    src: "https://upload.wikimedia.org/wikipedia/commons/6/63/Flag_of_the_United_States_of_America_%28American_Legion%29.jpg",
    description:
      "Khóa học tiếng Anh giúp bạn nâng cao khả năng giao tiếp, nghe, nói, đọc, viết với người bản ngữ trên toàn thế giới.",
  },
  {
    name: "Tiếng Tây Ban Nha",
    src: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Flag_of_Spain_%281785%E2%80%931873%2C_1875%E2%80%931931%29.svg",
    description:
      "Khóa học tiếng Tây Ban Nha giúp bạn làm quen và thành thạo với ngôn ngữ của các quốc gia nói tiếng Tây Ban Nha.",
  },
  {
    name: "Tiếng Trung Quốc",
    src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg",
    description:
      "Khóa học tiếng Trung Quốc giúp bạn hiểu và giao tiếp bằng tiếng Trung, một trong những ngôn ngữ phổ biến nhất thế giới.",
  },
  {
    name: "Tiếng Hindi",
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Flag_of_India_%283-5%29.svg",
    description:
      "Khóa học tiếng Hindi là cơ hội để bạn khám phá ngôn ngữ chính của Ấn Độ và học các kỹ năng giao tiếp cơ bản.",
  },
  {
    name: "Tiếng Pháp",
    src: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Flag_of_France_%281976%E2%80%932020%29.svg",
    description:
      "Khóa học tiếng Pháp giúp bạn học ngôn ngữ của văn hóa, nghệ thuật và lịch sử châu Âu.",
  },
  {
    name: "Tiếng Ả Rập",
    src: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Egypt.svg",
    description:
      "Khóa học tiếng Ả Rập giúp bạn nắm vững ngôn ngữ của các quốc gia Trung Đông và Bắc Phi.",
  },
  {
    name: "Tiếng Nga",
    src: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg",
    description:
      "Khóa học tiếng Nga sẽ giúp bạn hiểu sâu về ngôn ngữ và văn hóa của các quốc gia nói tiếng Nga.",
  },
  {
    name: "Tiếng Đức",
    src: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg",
    description:
      "Khóa học tiếng Đức giúp bạn giao tiếp và hiểu văn hóa, khoa học, công nghệ và lịch sử của Đức.",
  },
  {
    name: "Tiếng Nhật",
    src: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg",
    description:
      "Khóa học tiếng Nhật giúp bạn nắm bắt ngôn ngữ và văn hóa của Nhật Bản, từ giao tiếp cơ bản đến chuyên sâu.",
  },
  {
    name: "Tiếng Ý",
    src: "https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg",
    description:
      "Khóa học tiếng Ý giúp bạn học ngôn ngữ của đất nước nổi tiếng về nghệ thuật, ẩm thực và thời trang.",
  },
  {
    name: "Tiếng Bồ Đào Nha",
    src: "https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg",
    description:
      "Khóa học tiếng Bồ Đào Nha giúp bạn giao tiếp với người nói tiếng Bồ Đào Nha tại các quốc gia như Brazil và Portugal.",
  },
  {
    name: "Tiếng Hàn",
    src: "https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg",
    description:
      "Khóa học tiếng Hàn giúp bạn học ngôn ngữ của Hàn Quốc, từ giao tiếp hàng ngày đến văn hóa Hàn Quốc.",
  },
  {
    name: "Tiếng Thổ Nhĩ Kỳ",
    src: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg",
    description:
      "Khóa học tiếng Thổ Nhĩ Kỳ giúp bạn làm quen với ngôn ngữ và văn hóa của Thổ Nhĩ Kỳ.",
  },
  {
    name: "Tiếng Indonesia",
    src: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg",
    description:
      "Khóa học tiếng Indonesia giúp bạn giao tiếp hiệu quả với người Indonesia và hiểu về nền văn hóa Đông Nam Á.",
  },
  {
    name: "Tiếng Thái",
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg",
    description:
      "Khóa học tiếng Thái giúp bạn học ngôn ngữ của Thái Lan và khám phá văn hóa đặc sắc của đất nước này.",
  },
];

const reasons = [
  {
    title: "Học Mà Chơi, Chơi Mà Học",
    description:
      "Học ngoại ngữ không còn là một công việc nhàm chán! Tại Duylingo, bạn sẽ học qua những trò chơi thú vị và hấp dẫn, giúp việc học trở nên dễ dàng và không còn cảm giác căng thẳng. Chỉ cần trả lời câu hỏi và giải quyết thử thách, bạn đã tiến bộ mỗi ngày.",
    image:
      "https://png.pngtree.com/png-clipart/20210912/original/pngtree-kids-playing-png-image_6724847.jpg",
  },
  {
    title: "Khả Năng Tư Duy và Ghi Nhớ",
    description:
      "Việc trả lời các câu hỏi trong trò chơi giúp tăng khả năng tư duy phản xạ và ghi nhớ lâu dài. Bạn sẽ nhớ từ vựng, cấu trúc câu và cách sử dụng ngữ pháp mà không phải ghi chép hay làm bài tập khô khan.",
    image:
      "https://abacusmaster.edu.vn/wp-content/uploads/2018/09/toan-tu-duy-1-1.png",
  },
  {
    title: "Học Mọi Lúc, Mọi Nơi",
    description:
      "Trò chơi học ngôn ngữ của Duylingo có thể chơi mọi lúc, mọi nơi. Chỉ cần có điện thoại hoặc máy tính, bạn có thể tham gia các trò chơi học từ vựng, ngữ pháp và giao tiếp một cách tự nhiên mà không phải lo lắng về thời gian hay địa điểm.",
    image: "",
  },
  {
    title: "Phù Hợp Với Mọi Lứa Tuổi",
    description:
      "Duylingo không chỉ dành cho người lớn mà còn rất phù hợp với trẻ em và thanh thiếu niên. Phương pháp học qua trò chơi giúp trẻ dễ dàng tiếp thu ngôn ngữ mà không cảm thấy áp lực. Các trò chơi được thiết kế sao cho dễ dàng tiếp cận với mọi lứa tuổi.",
    image:
      "https://png.pngtree.com/png-clipart/20230803/original/pngtree-kids-in-a-bag-mates-students-young-vector-picture-image_9460469.png",
  },
  {
    title: "Đo Lường Tiến Độ Qua Các Cấp Độ",
    description:
      "Trò chơi của Duylingo được chia thành các cấp độ từ cơ bản đến nâng cao, giúp bạn theo dõi tiến độ học của mình và thấy rõ sự tiến bộ qua mỗi thử thách. Bạn sẽ luôn có động lực để chinh phục các cấp độ mới và học thêm nhiều từ vựng, ngữ pháp.",
    image: "https://getup.vn/wp-content/uploads/img_do-luong.png",
  },
  {
    title: "Học Ngoại Ngữ Thông Qua Văn Hóa",
    description:
      "Ngoài việc học ngôn ngữ, các trò chơi của Duylingo còn đưa bạn vào những tình huống giao tiếp thực tế, giúp bạn hiểu thêm về văn hóa và thói quen của người bản xứ. Học ngoại ngữ từ chính những câu chuyện, tình huống và câu hỏi thú vị, không chỉ học lý thuyết.",
    image:
      "https://png.pngtree.com/png-vector/20220615/ourmid/pngtree-foreign-language-online-learning-png-image_5099079.png",
  },
  {
    title: "Chơi Cùng Bạn Bè và Cộng Đồng",
    description:
      "Duylingo không chỉ là một nền tảng học cá nhân mà còn kết nối bạn với cộng đồng học viên. Bạn có thể thi đấu với bạn bè hoặc những người học khác để cải thiện kỹ năng và đạt điểm cao nhất trong các trò chơi.",
    image:
      "https://png.pngtree.com/png-clipart/20230506/original/pngtree-friendship-day-friends-all-over-the-world-flat-png-image_9143382.png",
  },
  {
    title: "Khám Phá Phương Pháp Học Tương Tác Mới Mẻ",
    description:
      "Phương pháp học qua trò chơi của Duylingo mang đến một trải nghiệm học tập hoàn toàn mới mẻ, giúp bạn luôn cảm thấy thú vị và hứng thú mỗi khi học. Không cần phải ngồi vào bàn học, chỉ cần một chiếc điện thoại, bạn đã có thể học ngoại ngữ mọi lúc mọi nơi!",
    image:
      "https://1.bp.blogspot.com/-blWCv65HKNI/V6aUOtr7NrI/AAAAAAAAE-8/6kjzNyGUN7sIc0O8LIMKktQIXrmmD9jDACLcB/s1600/mh.png",
  },
];

const benefits1 = [
  {
    title: "Cải Thiện Từ Vựng Và Ngữ Pháp",
    description:
      "Trò chơi giúp người học củng cố và mở rộng vốn từ vựng, đồng thời cải thiện khả năng sử dụng ngữ pháp đúng cách thông qua các tình huống thực tế.",
  },
  {
    title: "Phát Triển Kỹ Năng Nghe Và Nói",
    description:
      "Trò chơi giúp người học cải thiện kỹ năng nghe và nói thông qua việc tương tác với các câu hỏi, bài nghe, và các tình huống thực tế.",
  },
  {
    title: "Tăng Cường Kỹ Năng Suy Nghĩ Và Xử Lý Thông Tin",
    description:
      "Trò chơi giúp bạn phát triển kỹ năng tư duy phản xạ và xử lý thông tin nhanh chóng, điều này rất quan trọng khi học ngoại ngữ.",
  },
  {
    title: "Tạo Động Lực Và Cảm Hứng Học Hỏi",
    description:
      "Trò chơi giúp duy trì động lực học tập, vì nó kết hợp giữa học và vui chơi. Bạn có thể học ngoại ngữ mà không cảm thấy căng thẳng hay mệt mỏi.",
  },
];
const benefits2 = [
  {
    title: "Khả Năng Giải Quyết Vấn Đề",
    description:
      "Trò chơi giúp người học phát triển kỹ năng giải quyết vấn đề và đưa ra quyết định trong bối cảnh ngôn ngữ mới.",
  },
  {
    title: "Làm Quen Với Văn Hóa và Cách Sử Dụng Ngôn Ngữ",
    description:
      "Thông qua trò chơi, người học có thể làm quen với các tình huống và cách sử dụng ngôn ngữ trong bối cảnh văn hóa, xã hội khác nhau.",
  },
  {
    title: "Tiết Kiệm Thời Gian Và Tiền Bạc",
    description:
      "Học ngoại ngữ qua trò chơi là một cách hiệu quả và tiết kiệm chi phí, giúp bạn học mọi lúc, mọi nơi.",
  },
  {
    title: "Phát Triển Kỹ Năng Xã Hội",
    description:
      "Trò chơi giúp bạn kết nối với người học khác, chia sẻ kinh nghiệm và tạo mối quan hệ xã hội qua việc học ngoại ngữ.",
  },
];
const Home = () => {
  //Part 1:
  useEffect(() => {
    const tl = gsap.timeline();
    tl.from(".title-left", {
      y: 100,
      duration: 2,
      opacity: 1,
    }).from(".welcome", {
      opacity: 0,
      letterSpacing: "-1rem",
      duration: 0.5,
    });
  }, []);
  useEffect(() => {
    gsap.from(".title-right", {
      y: 100,
      duration: 2,
      opacity: 1,
    });
  }, []);
  useEffect(() => {
    gsap.from(".title-and", {
      y: 100,
      duration: 2,
    });
  }, []);

  useEffect(() => {
    gsap.to(".window-image", {
      scale: 50,
      ease: "ease",
      duration: 2,
      scrollTrigger: {
        trigger: ".moon-bg",
        scrub: 1,
        start: "top top",
        end: "bottom",
        // pin: true,
        // pinSpacing: false,
        toggleActions: "play none none reverse",
      },
    });
    return () => ScrollTrigger.killAll();
  }, []);
  useEffect(() => {
    gsap.to(".title-left", {
      autoAlpha: 0,
      x: -500,
      duration: 1,
      scrollTrigger: {
        start: 1,
        toggleActions: "play none none reverse",
      },
    });
    return () => ScrollTrigger.killAll();
  }, []);
  useEffect(() => {
    gsap.to(".title-and", {
      autoAlpha: 0,
      x: -200,
      duration: 1,
      scrollTrigger: {
        start: 1,
        toggleActions: "play none none reverse",
      },
    });
    return () => ScrollTrigger.killAll();
  }, []);
  useEffect(() => {
    gsap.to(".title-right", {
      autoAlpha: 0,
      x: 500,
      duration: 1,
      scrollTrigger: {
        start: 1,
        toggleActions: "play none none reverse",
      },
    });
    return () => ScrollTrigger.killAll();
  }, []);
  useEffect(() => {
    const tl = gsap.timeline();
    tl.from(".title-small", {
      y: 100,
      opacity: 0,
      duration: 1,
    });
    ScrollTrigger.create({
      animation: tl,
      trigger: ".image-section",
      start: "top top",
      end: "top -100%",
      scrub: 1,
      toggleActions: "play none none reverse",
      pin: true,
      pinSpacing: false,
    });
    return () => ScrollTrigger.killAll();
  }, []);
  useEffect(() => {
    gsap.from(".des-small", {
      y: 100,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".des-small",
        start: "top 60%",
        end: "top -100%",
        scrub: 1,
        toggleActions: "play none none reverse",
      },
    });
    return () => ScrollTrigger.killAll();
  }, []);
  // Ani light header
  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(".light", {
      left: "+=100%",
      duration: 2,
    }).from(".light", {
      right: "+=100%",
      duration: 0.5,
    });
  }, []);

  // // Part 3: course container
  useEffect(() => {
    gsap.from(".course-title", {
      y: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".course-benefit",
        start: "top center",
        end: "bottom top",
        scrub: 1,
      },
    });
    return () => ScrollTrigger.killAll();
  }, []);
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      ".course-item",
      {
        opacity: 0,
        duration: 0.1,
      },
      {
        opacity: 1,
        scale: 1.3,
        duration: 1,
        stagger: 0.5,
      },
    )
      .to(".benefit", {
        x: -innerWidth,
        duration: 2,
        transition: "ease",
        delay: 0.5,
      })
      .from(".reason-title", {
        opacity: 0,
        top: "30%",
        duration: 1,
      })
      .from(".reason-left", {
        opacity: 0,
        left: "-50%",
        duration: 2,
        stagger: 2,
      })
      .from(".reason-right", {
        opacity: 0,
        right: "-50%",
        duration: 2,
        stagger: 2,
      })
      .to(".idea", {
        overflow: "visible",
        duration: 5,
        position: "relative",
        scale: 0.6,
        y: "700px",
      });
    ScrollTrigger.create({
      animation: tl,
      ease: "ease",
      trigger: ".course-benefit",
      start: "top top",
      end: "+=2600",
      scrub: 2,
      pin: true,
      toggleActions: "play none none reverse",
    });
    return () => ScrollTrigger.killAll();
  }, []);
  useEffect(() => {
    gsap.from(".experience .title", {
      opacity: 0,
      duration: 1,
      letterSpacing: '-1rem',
      scrollTrigger: {
        ease: "ease",
        trigger: ".experience",
        start: "top center",
        end: "bottom top",
        toggleActions: "play none none reverse",
      },
    });
    return () => ScrollTrigger.killAll();
  }, []);

  useEffect(() => {
    gsap.fromTo(
      '.bf-item-left',  
      { opacity: 0, y: 50, duration: .1, stagger: .1}, 
      {
        opacity: 1, 
        y: 0,  
        stagger: 0.1,  
        duration: 1,  
        scrollTrigger: {
          trigger: '.experiences-left', 
          start: 'top 70%', 
          end: 'bottom top',
          toggleActions: "play none none reverse",
        }
      }
    );
    return () => ScrollTrigger.killAll();
  }, []);
  useEffect(() => {
    gsap.fromTo(
      '.bf-item-right',  
      { opacity: 0, y: 50, duration: .1, stagger: .1 }, 
      {
        opacity: 1, 
        y: 0, 
        stagger: 0.1, 
        duration: 1,  
        scrollTrigger: {
          trigger: '.experiences-right', 
          start: 'top 70%', 
          end: 'bottom top',
          toggleActions: "play none none reverse",
        }
      }
    );
    return () => ScrollTrigger.killAll();
  }, []);
  return (
    <>
      <div className="header fixed z-20 flex h-[4rem] w-full items-center justify-center border-b-[1px] border-b-[#41646b] text-white scrollbar-none">
        <div className="mx-auto flex w-[80%] items-center justify-between">
          <p className="cursor-pointer font-lato text-xl font-bold uppercase tracking-widest">
            Duylingo
          </p>
          <div className="button cursor-pointer rounded-xl border-[1px] border-b-[3px] border-white px-4 py-2 hover:border-black hover:bg-white hover:text-black active:scale-95">
            <a href="http://localhost:5173/learning">Bắt đầu ngay </a>
            <span>
              <i className="fa-duotone fa-solid fa-play"></i>
            </span>
          </div>
        </div>
        <div className="light absolute -bottom-[2px] left-0 h-[0.3rem] w-[4rem] rounded-xl bg-white blur-sm filter"></div>
      </div>
      <div className="image-section relative h-[100vh] w-[100vw] overflow-hidden font-noto text-white scrollbar-none">
        <img
          src="/images/home/canh-anh-trang.gif"
          className="moon-bg h-[100vh] w-[100vw] object-cover"
        ></img>
        <div className="absolute left-[41%] top-[52%] h-[6rem] overflow-hidden text-[5rem] font-thin tracking-wider">
          <p className="title-and great-vibes-regular">&</p>
        </div>
        <div className="window-image absolute left-0 top-0 z-10 h-[100vh] w-full text-shadow-white">
          <div className="absolute left-[11%] top-[25%] h-[9.2rem] w-full overflow-hidden text-[7rem] font-semibold tracking-wider">
            <p className="title-left great-vibes-regular w-full h-full">Kiến Thức</p>
          </div>

          <div className="absolute bottom-[23%] right-[11%] h-[9.2rem] w-full overflow-hidden text-end text-[7rem] font-semibold tracking-wider">
            <p className="title-right great-vibes-regular w-full h-full">Trải Nghiệm</p>
          </div>
          <div className="welcome absolute bottom-[1.7rem] w-full text-center font-lato text-[1rem] font-thin tracking-[0.3rem]">
            Chào mừng bạn đến với hành trình học ngoại ngữ tại Duylingo!
          </div>
          <img src="/images/home/window.png" className="z-10 h-full w-full" />
        </div>
        <div className="absolute left-[10%] top-[50%] w-[40%] font-quicksand text-white">
          <div className="h-[3.6rem]">
            <p className="title-small text-[2.5rem] font-semibold tracking-wider">
              "Cùng bạn vươn xa"
            </p>
          </div>
          <p className="des-small mt-3 w-[80%] text-[1.2rem] tracking-tight">
            Học ngoại ngữ không chỉ là việc tiếp thu kiến thức, mà là quá trình
            khám phá và giải đáp những thắc mắc trong hành trình giao tiếp toàn
            cầu. Tại Duylingo, chúng tôi giúp bạn trả lời mọi câu hỏi về ngữ
            pháp, từ vựng, và văn hóa của ngôn ngữ bạn đang học
          </p>
        </div>
      </div>
      <div className="course-benefit relative mt-[55vh] flex scrollbar-none">
        <div className="course relative h-[100vh] w-[100vw] flex-shrink-0 overflow-hidden bg-gradient-to-l from-black via-gray-800 to-black font-quicksand text-white scrollbar-none">
          <div className="course-title mt-[7%] w-full text-center text-3xl font-bold">
            Các khóa học của chúng tôi:
          </div>
          <div className="course-container absolute left-[50%] top-[30%] grid -translate-x-1/2 grid-cols-5 gap-[4rem]">
            {courses &&
              courses.map((course, index) => (
                <div
                  onClick={() => handleShowCourse(course, index)}
                  key={index}
                  className="course-item w-[100%] cursor-pointer"
                >
                  <img
                    className="max-h-[5rem] min-h-[5rem] w-[7rem] max-w-none object-cover transition duration-300 hover:scale-125"
                    src={course.src}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="benefit relative h-[100vh] w-[100vw] flex-shrink-0 bg-gradient-to-l from-black via-gray-800 to-black font-quicksand text-white transition">
          <img
            src="/images/home/idea-bulbe.png"
            className="idea absolute left-1/2 top-[39%] h-[15rem] -translate-x-1/2"
          />
          <h4 className="reason-title absolute top-[16%] w-full text-center text-[1.5rem] font-bold">
            Tại sao bạn nên chọn Duylingo – Học Ngoại Ngữ Qua Trò Chơi
          </h4>
          <div className="absolute left-1/2 top-[30%] h-[50%] w-[50%] -translate-x-1/2 overflow-hidden">
            <img
              src="/images/home/bong-bong.png"
              className="absolute left-1/2 top-1/2 h-[25rem] -translate-x-1/2 -translate-y-1/2"
            />
            <div className="absolute left-[0] top-1/2 h-[25rem] w-[25rem] -translate-y-1/2 rounded-full border-l-[1.2rem] border-[rgb(192,240,95)]"></div>
            <div className="absolute right-[0] top-1/2 h-[25rem] w-[25rem] -translate-y-1/2 rounded-full border-r-[1.2rem] border-[rgb(192,240,95)]"></div>
          </div>
          <div className="reason-left absolute left-[6.6%] top-[30%] flex h-[5rem] w-[25%] items-center justify-center gap-[1rem] rounded-l-xl bg-[#f11592]">
            <h4 className="text-[1.2rem] font-bold">{reasons[0].title}</h4>
            <div className="absolute -right-[6rem] flex h-[6rem] w-[6rem] items-center justify-center rounded-xl border-[10px] border-white bg-[#f11592] text-[4rem] font-bold text-white">
              1
            </div>
          </div>
          <div className="reason-left absolute left-[2%] top-[50%] flex h-[5rem] w-[25%] items-center justify-center gap-[1rem] rounded-l-xl bg-[#7fca07]">
            <h4 className="text-[1.2rem] font-bold">{reasons[1].title}</h4>
            <div className="absolute -right-[6rem] flex h-[6rem] w-[6rem] items-center justify-center rounded-xl border-[10px] border-pink-50 bg-[#7fca07] text-[4rem] font-bold text-white">
              2
            </div>
          </div>
          <div className="reason-left absolute bottom-[20%] left-[6.6%] flex h-[5rem] w-[25%] items-center justify-center gap-[1rem] rounded-l-xl bg-[#ffae07]">
            <h4 className="text-[1.2rem] font-bold">{reasons[2].title}</h4>
            <div className="absolute -right-[6rem] flex h-[6rem] w-[6rem] items-center justify-center rounded-xl border-[10px] border-pink-50 bg-[#ffae07] text-[4rem] font-bold text-white">
              3
            </div>
          </div>
          <div className="reason-right absolute right-[6.6%] top-[30%] flex h-[5rem] w-[25%] items-center justify-center gap-[1rem] rounded-r-xl bg-[#01a7f4]">
            <h4 className="text-[1.2rem] font-bold">{reasons[3].title}</h4>
            <div className="absolute -left-[6rem] flex h-[6rem] w-[6rem] items-center justify-center rounded-xl border-[10px] border-white bg-[#01a7f4] text-[4rem] font-bold text-white">
              4
            </div>
          </div>
          <div className="reason-right absolute right-[2%] top-[50%] flex h-[5rem] w-[25%] items-center justify-center gap-[1rem] rounded-r-xl bg-[#ff7fc7]">
            <h4 className="text-[1.2rem] font-bold">{reasons[4].title}</h4>
            <div className="absolute -left-[6rem] flex h-[6rem] w-[6rem] items-center justify-center rounded-xl border-[10px] border-pink-50 bg-[#ff7fc7] text-[4rem] font-bold text-white">
              5
            </div>
          </div>
          <div className="reason-right absolute bottom-[20%] right-[6.6%] flex h-[5rem] w-[25%] items-center justify-center gap-[1rem] rounded-r-xl bg-[#7881ff]">
            <h4 className="text-[1.2rem] font-bold">{reasons[5].title}</h4>
            <div className="absolute -left-[6rem] flex h-[6rem] w-[6rem] items-center justify-center rounded-xl border-[10px] border-pink-50 bg-[#7881ff] text-[4rem] font-bold text-white">
              6
            </div>
          </div>
        </div>
      </div>
      <div className="experience-container h-[100vh] w-[100vw] bg-gradient-to-l from-black via-gray-800 to-black font-quicksand text-white transition">
        <div className="experience relative h-full w-full">
          <h4 className="title experience-title absolute top-[10%] w-full text-center text-[1.8rem] font-bold tracking-[0.2rem]">
            Lợi ích khi học ngoại ngữ qua trò chơi
          </h4>
          <img
            src="/images/home/reading.png"
            className="absolute left-[43%] top-[60%] h-[15rem]"
          />
          <div className="experiences-left grid grid-cols-2 absolute left-[3%] top-[20%]  w-[35%] gap-[1.8rem]">
            {benefits1.map((item, index) => (
              <div
                key={index}
                className="bf-item-left w-full h-[15.6rem] cursor-pointer rounded-xl shadow-red-300 border-t-[1px] border-t-white p-6 shadow-xl hover:shadow-xl hover:shadow-white  transition-all "
              >
                <p className="text-md mb-[1rem] font-bold h-[3rem] flex items-center">{item.title}</p>
                <p className="w-full text-md">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <div className="experiences-right grid grid-cols-2 absolute right-[3%] top-[20%] w-[35%] gap-[1.8rem]">
            {benefits2.map((item, index) => (
              <div
                key={index}
                className="bf-item-right w-full h-[15.6rem] cursor-pointer rounded-xl shadow-yellow-300 border-t-[1px] border-t-white p-6 shadow-xl hover:shadow-xl hover:shadow-white transition-all "
              >
                <p className="text-md mb-[1rem] font-bold h-[3rem] flex items-center">{item.title}</p>
                <p className="w-full text-md">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* DOWNLOAD */}
      <div
        className="download relative h-screen w-[100vw] bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://png.pngtree.com/thumb_back/fw800/background/20210902/pngtree-smart-technology-light-hd-background-image_784060.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-lg"></div>
        <div className="relative z-10 flex h-full items-center justify-center px-6 text-center text-white md:px-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-wide">
              Tải ứng dụng của chúng tôi ngay!
            </h2>
            <p className="text-xl">
              Trải nghiệm những tính năng tuyệt vời và tiện ích chỉ có trên ứng
              dụng của chúng tôi.
            </p>
            <div className="mt-[2rem] flex justify-center gap-4">
              <a
                href=""
                className="rounded-full bg-white px-6 py-3 font-semibold text-black shadow-lg transition duration-300 hover:bg-gray-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tải từ App Store
              </a>
              <a
                href=""
                className="rounded-full bg-green-500 px-6 py-3 font-semibold text-white shadow-lg transition duration-300 hover:bg-green-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tải từ Google Play
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* footer */}
      <footer className="w-[100vw] overflow-hidden bg-gradient-to-l from-black via-gray-800 to-black pb-5 pt-10 text-white">
        <div className="mx-auto w-[80%]">
          <div className="flex justify-between gap-8">
            <div className="w-[40%]">
              <h3 className="mb-4 text-xl font-semibold">Duylingo</h3>
              <p className="mb-2 text-sm">
                Duylingo là nền tảng học ngoại ngữ trực tuyến giúp bạn cải thiện
                kỹ năng giao tiếp bằng ngôn ngữ mới, mở rộng cơ hội và trải
                nghiệm văn hóa thế giới.
              </p>
              <p className="mb-2 text-sm">
                Chúng tôi cam kết mang đến cho bạn những khóa học chất lượng,
                giảng viên uy tín và phương pháp học hiệu quả nhất.
              </p>
              <p className="text-sm">
                Chúng tôi tin rằng mỗi người đều có thể thành thạo một ngôn ngữ
                mới và kết nối với thế giới.
              </p>
            </div>

            <div className="flex w-[20%] flex-col items-center">
              <h3 className="mb-4 text-xl font-semibold">Liên Kết Nhanh</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/" className="hover:text-[#FF8C00]">
                    Giới thiệu
                  </a>
                </li>
                <li>
                  <a href="/courses" className="hover:text-[#FF8C00]">
                    Các khóa học
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-[#FF8C00]">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-[#FF8C00]">
                    Liên hệ
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-[#FF8C00]">
                    Điều khoản sử dụng
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-[#FF8C00]">
                    Chính sách bảo mật
                  </a>
                </li>
              </ul>
            </div>

            <div className="w-[30%]">
              <h3 className="mb-4 text-xl font-semibold">
                Kết nối với chúng tôi
              </h3>
              <ul className="flex space-x-4">
                <li>
                  <a
                    href="https://www.facebook.com/duylingo"
                    target="_blank"
                    className="text-sm hover:text-[#FF8C00]"
                  >
                    <i className="fab fa-facebook"></i> Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/duylingo"
                    target="_blank"
                    className="text-sm hover:text-[#FF8C00]"
                  >
                    <i className="fab fa-instagram"></i> Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/duylingo"
                    target="_blank"
                    className="text-sm hover:text-[#FF8C00]"
                  >
                    <i className="fab fa-linkedin"></i> LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.twitter.com/duylingo"
                    target="_blank"
                    className="text-sm hover:text-[#FF8C00]"
                  >
                    <i className="fab fa-twitter"></i> Twitter
                  </a>
                </li>
              </ul>
            </div>

            <div className="w-[30%]">
              <h3 className="mb-4 text-xl font-semibold">Đăng ký nhận tin</h3>
              <p className="mb-4 text-sm">
                Hãy đăng ký để nhận thông tin mới nhất về khóa học, ưu đãi đặc
                biệt và các bài viết hữu ích từ Duylingo.
              </p>
              <form action="#" method="POST">
                <input
                  type="email"
                  className="mb-4 w-full p-2 text-black outline-none"
                  placeholder="Nhập email của bạn"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-[#FF8C00] py-2 text-white hover:bg-[#e07b00]"
                >
                  Đăng ký
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-[2rem] text-center text-xs">
          <p>&copy; 2024 Duylingo. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Home;
