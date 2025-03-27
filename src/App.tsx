import "./App.css";
import "lenis/dist/lenis.css";
import ReactLenis, { LenisRef, useLenis } from "lenis/react";
import { ParallaxText } from "./componenets/ParallaxText";
import {
  cancelFrame,
  frame,
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";
import Projects from "./componenets/Projects";

function App() {
  const lenis = useLenis((info) => {
    //called every scroll
  });

  const lenisRef = useRef<LenisRef>(null);
  useEffect(() => {
    function update(data: { timestamp: number }) {
      const time = data.timestamp;
      lenisRef.current?.lenis?.raf(time);
    }
    frame.update(update, true);
    return () => cancelFrame(update);
  }, []);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [1, 0], [-250, 0]);

  return (
    <>
      <ReactLenis
        root
        options={{
          autoRaf: false,
          wheelMultiplier: 0.5, // Adjusts scroll speed sensitivity
          touchMultiplier: 0.5, // Makes touch scrolling more natural
          lerp: 0.1,
          duration: 1.4,
          smoothWheel: true,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        }}
        ref={lenisRef}
      >
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
          <img
            draggable="false"
            className="object-cover h-full absolute left-1/2 -translate-x-1/2"
            src="/background.jpg"
            alt="background"
          />
          <motion.div
            style={{ y }}
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
          </motion.div>
          <motion.div style={{ y }} className="absolute bottom-[15%]">
            <ParallaxText baseVelocity={-3}>
              <h1 className="text-white select-none text-[clamp(9rem,15vw,14rem)] font-medium inline">
                Dennis Snellenberg—{" "}
              </h1>
            </ParallaxText>
          </motion.div>
        </motion.main>
        <Projects />
        <div className="mb-[100vh]"></div>
      </ReactLenis>
    </>
  );
}

export default App;
