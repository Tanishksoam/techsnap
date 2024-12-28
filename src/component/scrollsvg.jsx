import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const ScrollProgressAnimation = () => {
  const pathRef = useRef(null);
  const progressRef = useRef(null);
  const sectionRef = useRef(null);
  const [circlePosition, setCirclePosition] = useState({ x: 674, y: 5 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const path = pathRef.current;
    const progress = progressRef.current;
    const section = sectionRef.current;

    if (!path || !progress || !section) return;

    const pathLength = path.getTotalLength();
    progress.style.strokeDasharray = `${pathLength} ${pathLength}`;
    progress.style.strokeDashoffset = 0;

    const updateProgress = () => {
      // Get section position relative to viewport
      const rect = section.getBoundingClientRect();
      const triggerPoint = window.innerHeight * 0.8; // 80% from top

      // Check if section has reached trigger point
      if (rect.top <= triggerPoint) {
        setIsVisible(true);

        // Calculate how far past the trigger point we've scrolled
        const scrolledPast = triggerPoint - rect.top;
        const sectionHeight = rect.height;

        // Calculate progress based on section visibility
        const scrollPercent = Math.min(
          Math.max(scrolledPast / sectionHeight, 0),
          1
        );

        // Calculate how much of the path to hide (from the end)
        const drawLength = pathLength * (1 - scrollPercent);

        // Draw the progress from top to bottom
        progress.style.strokeDashoffset = drawLength;

        // Update circle position
        const point = path.getPointAtLength(pathLength * scrollPercent);
        setCirclePosition({ x: point.x, y: point.y });
      } else {
        setIsVisible(false);
        progress.style.strokeDashoffset = 0;
        setCirclePosition({ x: 674, y: 5 });
      }
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress(); // Initial check

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen px-10 overflow-visible"
    >
      <div className="absolute left-0 top-0 w-full h-[100vh] px-10">
        <svg
          className="w-full h-full overflow-visible "
          viewBox="0 0 1217 1209"
          fill="none"
          preserveAspectRatio="none"
        >
          {/* Guide path (background) */}
          <path
            ref={pathRef}
            d="M674 5V156.5C674 179.144 655.644 197.5 633 197.5H46C23.3563 197.5 5 215.856 5 238.5V963.5C5 986.144 23.3563 1004.5 46 1004.5H1171.5C1194.14 1004.5 1212.5 1022.86 1212.5 1045.5V1204.5"
            className="stroke-black/20 stroke-[9] rounded-lg p-2"
            strokeLinecap="round"
          />

          {/* Progress path (foreground) */}
          <path
            ref={progressRef}
            d="M674 5V156.5C674 179.144 655.644 197.5 633 197.5H46C23.3563 197.5 5 215.856 5 238.5V963.5C5 986.144 23.3563 1004.5 46 1004.5H1171.5C1194.14 1004.5 1212.5 1022.86 1212.5 1045.5V1204.5"
            className="stroke-black stroke-[9]"
            strokeLinecap="round"
          />

          {/* Circle that moves along the path */}
          <circle
            cx={circlePosition.x}
            cy={circlePosition.y}
            r="20"
            className="fill-black"
          />
        </svg>
      </div>

      {/* Your section content goes here */}
      <div className=" z-10">
        <div className=" absolute top-[30%] lg:top-[20%] right-[5%] w-xl flex flex-wrap justify-center items-center gap-10 lg:right-0 px-4">
          <motion.div
            className="backdrop-filter backdrop-blur-lg px-4 py-8 rounded-2xl border-2 border-blue-200 "
            animate={{
              y: [0, -10, 0], // Keyframes for floating effect
            }}
            transition={{
              duration: 2, // Duration for one full float cycle
              repeat: Infinity, // Infinite looping
              ease: "easeInOut",
              delay: 1, // Smooth easing
            }}
          >
            <h4 className=" max-w-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
              praesentium facere accusantium, rerum accusamus ad? Ad blanditiis
              vitae animi. Unde sit recusandae minima voluptates, tenetur
              placeat expedita a eveniet magnam eligendi. Doloremque deserunt
              error commodi debitis voluptates minima minus libero consequuntur
              quas quaerat, fuga quam laudantium veritatis, expedita, ab saepe
              velit cupiditate.
            </h4>
          </motion.div>
          <motion.div
            animate={{
              y: [0, -10, 0], // Keyframes for floating effect
            }}
            transition={{
              duration: 2, // Duration for one full float cycle
              repeat: Infinity, // Infinite looping
              ease: "easeInOut", // Smooth easing
            }}
          >
            <aside className="bg-black text-white p-6 rounded-lg w-full max-w-lg font-mono">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2 text-red-500">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <p className="text-sm">bash</p>
              </div>
              <div className="mt-4">
                <p className="text-green-400">$ npm install next</p>
                <p className="text-white">+ next@10.2.3</p>
                <p className="text-white">
                  added 1 package, and audited 2 packages in 3s
                </p>
                <p className="text-green-400">$</p>
              </div>
            </aside>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ScrollProgressAnimation;
