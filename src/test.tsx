import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

const ScrollMarquee = () => {
  const { scrollY } = useScroll(); // Track vertical scroll position
  const [lastScroll, setLastScroll] = useState(0);
  const [speed, setSpeed] = useState(1);

  // Calculate scroll direction and speed
  useEffect(() => {
    const handleScroll = () => {
      const scrollDiff = scrollY.get() - lastScroll;
      setSpeed(scrollDiff * 0.2); // Control speed sensitivity
      setLastScroll(scrollY.get());
    };

    return scrollY.on("change", handleScroll);
  }, [scrollY, lastScroll]);

  // Transform x position based on speed
  const x = useTransform(scrollY, [0, 5000], [0, -5000], { clamp: false });

  return (
    <div
      style={{ overflow: "hidden", whiteSpace: "nowrap", position: "relative" }}
    >
      <motion.div
        style={{ display: "flex", x }}
        animate={{ x: [0, -100] }} // Continuous marquee effect
        transition={{
          repeat: Infinity,
          duration: 5 / Math.abs(speed || 1),
          ease: "linear",
        }} // Adjust speed dynamically
      >
        <h1 style={{ marginRight: 40 }}>🚀 Scrolling Marquee</h1>
        <h1 style={{ marginRight: 40 }}>✨ Dynamic Speed</h1>
        <h1 style={{ marginRight: 40 }}>🔥 Reacts to Scroll</h1>
      </motion.div>
    </div>
  );
};

export default ScrollMarquee;
