import { useState } from "react";

const projects = [
  {
    title: "C2 Montreal",
    src: "c2montreal.png",
    color: "#000000",
  },
  {
    title: "Office Studio",
    src: "officestudio.png",
    color: "#8C8C8C",
  },
  {
    title: "Locomotive",
    src: "locomotive.png",
    color: "#EFE8D3",
  },
  {
    title: "Silencio",
    src: "silencio.png",
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
      {/* <Modal modal={modal} projects={projects} /> */}
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
