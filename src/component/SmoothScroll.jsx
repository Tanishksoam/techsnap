import { useState, useRef, useEffect } from "react";
import { useScroll, useSpring, useTransform, motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
const SmoothScroll = ({ children }) => {
  const { scrollYProgress } = useScroll(); // Tracks the scroll progress (0 to 1)
  const smoothProgress = useSpring(scrollYProgress, { mass: 0.1 }); // Smoothens the progress
  const contentRef = useRef(null); // Reference to the content container
  const [contentHeight, setContentHeight] = useState(0); // Tracks content height

  useEffect(() => {
    const updateContentHeight = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    };

    updateContentHeight();
    window.addEventListener("resize", updateContentHeight);

    return () => {
      window.removeEventListener("resize", updateContentHeight);
    };
  }, [children]);

  // Transform the scroll progress to translateY based on content height
  const y = useTransform(smoothProgress, (value) => {
    return value * -(contentHeight - window.innerHeight);
  });

  return (
    <>
      <motion.div
        className="scrollBody"
        ref={contentRef} // Attach the ref to the scroll container
        style={{ y }} // Apply the smooth scroll effect
      >
        {children}
      </motion.div>
    </>
  );
};

export default SmoothScroll;
