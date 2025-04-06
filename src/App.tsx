import "./App.css";
import { ParallaxText } from "./componenets/ParallaxText";
import { motion } from "motion/react";
import Projects from "./componenets/Projects";
import LocomotiveScroll from "locomotive-scroll";
import { useEffect } from "react";
import Header from "./componenets/Header";
import Description from "./componenets/Description";

function App() {
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll({
      lenisOptions: {
        wrapper: window,
        content: document.documentElement,
        lerp: 0.1,
        duration: 1.8,
        smoothWheel: true,
        wheelMultiplier: 0.4,
        touchMultiplier: 0.6,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      },
    });
    return () => locomotiveScroll.destroy();
  }, []);

  return (
    <>
      <motion.main
        variants={{
          initial: {
            y: 300,
          },
          enter: {
            y: 0,
            transition: {
              duration: 0.6,
              ease: [0.33, 1, 0.68, 1],
              //  delay: 2.5,
            },
          },
        }}
        initial="initial"
        animate="enter"
        className="relative h-[115vh] flex overflow-hidden bg-[#999d9e]"
      >
        <Header />
        <img
          data-scroll
          data-scroll-speed={-0.4}
          draggable="false"
          className="object-cover h-full absolute left-1/2 -translate-x-1/2"
          src="background.jpg"
          alt="background"
        />
        <div
          data-scroll
          data-scroll-speed={0.2}
          className="absolute top-[30%] left-[70%] text-white text-[clamp(1.5rem,2.2vw,2rem)] font-[400] "
        >
          <svg
            className="scale-[2.5] mb-[50px]"
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
          </svg>
          <p className="m-0 mb-3 select-none">Freelance</p>
          <p className="m-0 mb-3 select-none">Designer & Developer</p>
        </div>
        <div
          data-scroll
          data-scroll-speed={0.2}
          className="absolute bottom-[15%]"
        >
          <ParallaxText baseVelocity={-3}>
            <h1 className="text-white select-none text-[clamp(9rem,15vw,14rem)] font-medium inline">
              Dennis Snellenberg—{" "}
            </h1>
          </ParallaxText>
        </div>
      </motion.main>
      <Description />
      <Projects />
      <div className="mb-[100vh]"></div>
    </>
  );
}

export default App;
