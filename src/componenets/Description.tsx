import { useInView, motion } from "framer-motion";
import { useRef } from "react";

const slideUp = {
  initial: {
    y: "100%",
  },
  open: (i: number) => ({
    y: "0%",
    transition: { duration: 0.5, delay: 0.02 * i },
  }),
  closed: {
    y: "100%",
    transition: { duration: 0.5 },
  },
};

const opacity = {
  initial: {
    opacity: 0,
  },
  open: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
  closed: {
    opacity: 0,
    transition: { duration: 0.5 },
  },
};
export default function Description() {
  const phrase =
    "Helping brands to stand out in the digital era. Together we will set the new status quo. No nonsense, always on the cutting edge.";
  const description = useRef(null);
  const isInView = useInView(description);
  return (
    <div ref={description} className="px-16 lg:px-52 py-32 md:py-0 md:pt-42">
      <div className="flex flex-col md:flex-row relative max-w-[1400px] gap-16 items-baseline">
        <p className="m-0 text-[clamp(1.5rem,2.3vw,2.5rem)] gap-8 leading-[1.3]">
          {phrase.split(" ").map((word, index) => {
            return (
              <motion.span
                className="mr-[3px] relative overflow-hidden inline-flex"
                variants={slideUp}
                custom={index}
                animate={isInView ? "open" : "closed"}
                key={index}
              >
                {word}
              </motion.span>
            );
          })}
        </p>
        <div className="flex md:flex-col flex-row gap-16 md:items-center justify-center">
          <motion.p
            className="m-0 font-light"
            variants={opacity}
            animate={isInView ? "open" : "closed"}
          >
            The combination of my passion for design, code & interaction
            positions me in a unique place in the web design world.
          </motion.p>
          <div data-scroll data-scroll-speed={0.1}>
            <div
              className="w-[180px] h-[180px] bg-[#1c1d20] text-white
            rounded-full flex items-center justify-center cursor-pointer "
            >
              <span className="z-1 relative font-light text-sm">About me</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
