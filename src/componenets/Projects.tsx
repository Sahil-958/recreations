import { motion, useMotionValue, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";

const projects = [
  {
    title: "C2 Montreal",
    src: "thumbnail-aanstekelijk.jpg",
    color: "#000000",
  },
  {
    title: "Office Studio",
    src: "thumbnail-fabric-darkgray.jpg",
    color: "#8C8C8C",
  },
  {
    title: "Locomotive",
    src: "thumbnail-thedamai-v2.jpg",
    color: "#EFE8D3",
  },
  {
    title: "Silencio",
    src: "thumbnail-twice.jpg",
    color: "#706D63",
  },
];

export default function Projects() {
  const [modal, setModal] = useState({ active: false, index: 0 });

  return (
    <main className="flex h-screen justify-center items-center">
      <div className="w-[1000px] flex flex-col items-center justify-center">
        {projects.map((project, index) => {
          return (
            <Project
              index={index}
              title={project.title}
              setModal={setModal}
              key={index}
            />
          );
        })}
      </div>
      <Modal modal={modal} projects={projects} />
    </main>
  );
}

interface ProjectProps {
  index: number; // Assuming it's a number
  title: string; // Assuming it's a string
  setModal: ({ active, index }: { active: boolean; index: number }) => void; // Function that updates modal state
}

function Project({ index, title, setModal }: ProjectProps) {
  return (
    <div
      onMouseEnter={() => {
        setModal({ active: true, index });
      }}
      onMouseLeave={() => {
        setModal({ active: false, index });
      }}
      className="flex group w-full justify-between items-center p-16 cursor-pointer border-t-2 transition-all
      hover:opacity-[0.5] 
      "
    >
      <h2 className="text-6xl m-0 font-[400] transition-all duration-700 group-hover:-translate-x-6">
        {title}
      </h2>
      <p className="font-light transition-all duration-700 group-hover:translate-x-6">
        Design & Development
      </p>
    </div>
  );
}

interface ModalProps {
  modal: { active: boolean; index: number };
  projects: { title: string; src: string; color: string }[];
}

function Modal({ modal, projects }: ModalProps) {
  const { active, index } = modal;
  const xModal = useMotionValue(0);
  const yModal = useMotionValue(0);
  const xModalSpring = useSpring(xModal, { stiffness: 100, damping: 15 });
  const yModalSpring = useSpring(yModal, { stiffness: 100, damping: 15 });

  // Motion values for the cursor
  const xCursor = useMotionValue(0);
  const yCursor = useMotionValue(0);
  const xCursorSpring = useSpring(xCursor, { stiffness: 120, damping: 20 });
  const yCursorSpring = useSpring(yCursor, { stiffness: 120, damping: 20 });

  // Motion values for the cursor label
  const xCursorLabel = useMotionValue(0);
  const yCursorLabel = useMotionValue(0);
  const xCursorLabelSpring = useSpring(xCursorLabel, {
    stiffness: 150,
    damping: 25,
  });
  const yCursorLabelSpring = useSpring(yCursorLabel, {
    stiffness: 150,
    damping: 25,
  });
  const { scrollX, scrollY } = useScroll();
  useEffect(() => {
    const unsubscribers = [
      scrollY.on("change", (current) => {
        const delta = current - (scrollY.getPrevious() ?? 0);
        yModal.set(yModal.get() + delta);
        yCursor.set(yCursor.get() + delta);
        yCursorLabel.set(yCursorLabel.get() + delta);
      }),
      scrollX.on("change", (current) => {
        const delta = current - (scrollX.getPrevious() ?? 0);
        xModal.set(xModal.get() + delta);
        xCursor.set(xCursor.get() + delta);
        xCursorLabel.set(xCursorLabel.get() + delta);
      }),
    ];

    return () => unsubscribers.forEach((unsub) => unsub());
  }, [
    scrollX,
    scrollY,
    xCursor,
    xCursorLabel,
    xModal,
    yCursor,
    yCursorLabel,
    yModal,
  ]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { pageX, pageY } = e;

      // Update motion values
      xModal.set(pageX);
      yModal.set(pageY);

      xCursor.set(pageX);
      yCursor.set(pageY);

      xCursorLabel.set(pageX);
      yCursorLabel.set(pageY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [xModal, yModal, xCursor, yCursor, xCursorLabel, yCursorLabel]);

  const scaleAnimation = {
    initial: { scale: 0, x: "-50%", y: "-50%" },
    enter: {
      scale: 1,
      x: "-50%",
      y: "-50%",
      transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
    },
    closed: {
      scale: 0,
      x: "-50%",
      y: "-50%",
      transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
    },
  };
  return (
    <>
      <motion.div
        variants={scaleAnimation}
        style={{ left: xModalSpring, top: yModalSpring }}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className="h-96 w-96 absolute bg-white overflow-hidden pointer-events-none flex items-center justify-center"
      >
        <div
          style={{ top: index * -100 + "%" }}
          className="h-full w-full absolute transition-[top] duration-700"
        >
          {projects.map((project, index) => {
            const { src, color } = project;
            return (
              <div
                className="h-full w-full flex items-center justify-center"
                style={{ background: color }}
                key={`modal_${index}`}
                data-idx={`${index}`}
              >
                <img className="h-auto w-72" src={`${src}`} alt="image" />
              </div>
            );
          })}
        </div>
      </motion.div>
      <motion.div
        style={{ left: xCursorSpring, top: yCursorSpring }}
        className="w-[80px] h-[80px] rounded-full bg-[#455ce9] text-white z-2 absolute 
        flex items-center justify-center text-2xl font-light pointer-events-none"
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
      ></motion.div>
      <motion.div
        style={{ left: xCursorLabelSpring, top: yCursorLabelSpring }}
        className="w-[80px] h-[80px] rounded-full bg-transparent text-white z-2 absolute 
        flex items-center justify-center text-xl font-light pointer-events-none"
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
      >
        View
      </motion.div>
    </>
  );
}
