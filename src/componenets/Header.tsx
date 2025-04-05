"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function Header() {
  const header = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const inView = useInView(header);

  return (
    <>
      <div
        ref={header}
        className="absolute flex z-10 top-0 text-white p-8 justify-between w-full font-light box-border items-center"
      >
        <div className="flex gap-1 group cursor-pointer justify-center items-center">
          <span className="group-hover:rotate-360 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] origin-center m-0">
            ©
          </span>
          <span
            className="group-hover:pr-10 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]
           flex relative overflow-hidden whitespace-nowrap"
          >
            <span
              className="group-hover:-translate-x-full transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]
             pr-1 group-hover:pr-0"
            >
              Code By
            </span>
            <span className="group-hover:-translate-x-full transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]">
              <span>Dennis</span>
              <span className="pl-1 absolute">Snellenberg</span>
            </span>
          </span>
        </div>
        <div className="flex items-center">
          {["Work", "About", "Contact"].map((item, index) => (
            <div
              key={index}
              className="flex flex-col relative z-1 p-3 cursor-pointer group"
            >
              <a>{item}</a>
              <div
                className="absolute w-[5px] h-[5px] bottom-0 left-1/2 -translate-x-1/2 rounded-full
               scale-0 transition-all duration-200 bg-white group-hover:scale-100"
              ></div>
            </div>
          ))}
        </div>
      </div>

      <motion.div
        onClick={() => setIsActive(!isActive)}
        className="fixed right-5 top-5 z-10 w-[80px] h-[80px] rounded-full bg-[#1c1d20] cursor-pointer flex items-center justify-center"
        variants={{
          show: {
            scale: 1,
          },
          hide: {
            scale: 0,
          },
        }}
        initial={{ scale: 0 }}
        animate={inView ? "hide" : "show"}
        exit={{ scale: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div
          className={`w-full relative z-1 
                        after:content-[''] after:block after:h-[1px] after:w-[40%] after:m-auto
                        after:bg-white after:relative after:transition-transform after:-top-[5px]
                        before:content-[''] before:block before:h-[1px] before:w-[40%] before:m-auto
                        before:bg-white before:relative before:transition-transform before:top-[5px]
                        ${
                          isActive
                            ? "after:rotate-45 after:-top-[1px] before:-rotate-45 before:top-0"
                            : ""
                        }`}
        ></div>
      </motion.div>

      {/* <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence> */}
    </>
  );
}
