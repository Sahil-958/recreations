import { useRef } from "react";
import { useScroll, motion, useTransform } from "framer-motion";
import Magnetic from "./Magnetic";

export default function Contact() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y = useTransform(scrollYProgress, [0, 1], [-500, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);
  return (
    <motion.div
      style={{ y }}
      ref={container}
      className="text-white flex flex-col items-center justify-center relative bg-[#141516]"
    >
      <div className="pt-[200px] w-full max-w-[1800px] bg-[#141516]">
        <div className="relative border-b border-[#868686] pb-[100px] mx-[200px] ">
          <span className="flex items-center ">
            <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden ">
              <img
                className="object-cover w-full h-full "
                alt={"image"}
                src={`background.jpg`}
              />
            </div>
            <h2 className="ml-[0.3rem] text-[5vw] font-light">Let's work</h2>
          </span>
          <h2 className="font-light m-0 text-[5vw]">together</h2>
          <motion.div
            style={{ x }}
            className="absolute left-[calc(100%-400px)] top-[calc(100%-75px)] "
          >
            <Magnetic>
              <div
                style={{ backgroundColor: "#334BD3" }}
                className="absolute w-[180px] h-[180px] bg-[#455CE9] text-white rounded-full
               flex items-center justify-center cursor-pointer p-0 "
              >
                <p className="m-0 text-sm font-light z-2 relative">
                  Get in touch
                </p>
              </div>
            </Magnetic>
          </motion.div>
          <motion.svg
            className="top-[30%] left-full absolute"
            style={{ rotate, scale: 2 }}
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
              fill="white"
            />
          </motion.svg>
        </div>
        <div className="mx-[200px] mt-[100px] flex gap-[20px]">
          <div
            className="relative flex items-center justify-center rounded-[3em] 
          border border-[#888888] cursor-pointer px-[60px] py-[15px]"
          >
            <p>info@dennissnellenberg.com</p>
          </div>
          <div
            className="relative flex items-center justify-center rounded-[3em] border border-[#888888] cursor-pointer px-[60px] py-[15px]
"
          >
            <p>+31 6 27 84 74 30</p>
          </div>
        </div>
        <div className="flex justify-between mt-[200px] p-[20px] ">
          <div className="flex gap-[10px] items-end ">
            <span className="flex flex-col gap-[15px]">
              <h3 className="m-0 p-[2.5px] cursor-pointer text-gray-400 font-light font-sm">
                Version
              </h3>
              2022 © Edition
            </span>
            <span className="flex flex-col gap-[15px]">
              <h3 className="m-0 p-[2.5px] cursor-pointer  text-gray-400 font-light font-sm">
                Local Time
              </h3>
              11:49 PM GMT+2
            </span>
          </div>
          <div className="flex gap-[10px] items-end ">
            <span className="flex flex-col gap-[15px]">
              <h3 className="m-0 p-[2.5px] cursor-pointer text-gray-400 font-light font-sm">
                Socials
              </h3>
              <Magnetic>
                <Para>Awwwards</Para>
              </Magnetic>
            </span>
            <Magnetic>
              <Para>Instagram</Para>
            </Magnetic>
            <Magnetic>
              <Para>Dribbble</Para>
            </Magnetic>
            <Magnetic>
              <Para>Linkedin</Para>
            </Magnetic>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Para({ children }: { children: string }) {
  return (
    <p
      className="m-0 p-[2.5px] cursor-pointer after:content-[''] after:w-0 after:h-[1px] after:bg-white after:block
                after:mt-[2px] after:relative after:left-1/2 after:-translate-x-1/2 after:transition-[width] after:duration-200
                hover:after:w-full"
    >
      {children}
    </p>
  );
}
