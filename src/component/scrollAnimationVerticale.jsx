import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const VerticalScrollProgress = () => {
  const pathRef = useRef(null);
  const progressRef = useRef(null);
  const sectionRef = useRef(null);
  const [circlePosition, setCirclePosition] = useState({ x: 5, y: 4.5 });
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
      const rect = section.getBoundingClientRect();
      const triggerPoint = window.innerHeight * 0.8;

      if (rect.top <= triggerPoint) {
        setIsVisible(true);

        const scrolledPast = triggerPoint - rect.top;
        const sectionHeight = rect.height;

        const scrollPercent = Math.min(
          Math.max(scrolledPast / sectionHeight, 0),
          1
        );

        const drawLength = pathLength * (1 - scrollPercent);
        progress.style.strokeDashoffset = drawLength;

        const point = path.getPointAtLength(pathLength * scrollPercent);
        setCirclePosition({ x: point.x, y: point.y });
      } else {
        setIsVisible(false);
        progress.style.strokeDashoffset = 0;
        setCirclePosition({ x: 5, y: 4.5 });
      }
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen px-10 overflow-visible"
    >
      <div className="absolute left-0 top-0 w-10 h-[100vh] hidden lg:block">
        <svg
          className="w-full h-full overflow-visible"
          viewBox="0 0 10 1264"
          fill="none"
          preserveAspectRatio="none"
        >
          {/* Guide path (background) */}
          <path
            ref={pathRef}
            d="M5 4.5V1259"
            className="stroke-white/20 stroke-[9]"
            strokeLinecap="round"
          />

          {/* Progress path (foreground) */}
          <path
            ref={progressRef}
            d="M5 4.5V1259"
            className="stroke-white stroke-[9]"
            strokeLinecap="round"
          />

          {/* Circle that moves along the path */}
          <circle
            cx={circlePosition.x}
            cy={circlePosition.y}
            r="6"
            className="fill-white"
          />
        </svg>
      </div>

      {/* Section content */}
      <div className="z-10">
        <div className="absolute top-[30%] lg:top-[30%] right-[5%] w-xl flex flex-wrap justify-center items-center gap-10 lg:right-0 px-4">
          <motion.div
            className="backdrop-filter backdrop-blur-lg px-4 py-8 rounded-2xl border-2 border-blue-200"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            <h4 className="max-w-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
              praesentium facere accusantium, rerum accusamus ad? Ad blanditiis
              vitae animi.
            </h4>
          </motion.div>

          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
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

export default VerticalScrollProgress;
