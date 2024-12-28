import { useEffect, useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SmoothScroll from "./component/SmoothScroll";
import { motion } from "framer-motion";
import ScrollProgressAnimation from "./component/scrollsvg";

gsap.registerPlugin(ScrollTrigger);

const ScrollColorChange = () => {
  const [pathLength, setPathLength] = useState(0);
  const [pathLength2, setPathLength2] = useState(0);
  const component = useRef();
  const slider = useRef();
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let panels = gsap.utils.toArray(".panel");
      gsap.to(slider.current, {
        x: `-${(panels.length - 1) * 100}vw`,
        ease: "none",
        scrollTrigger: {
          trigger: slider.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: "+=3000", // Adjust this value to control scroll length
        },
      });
    }, component);
    return () => ctx.revert();
  }, [component, slider]);
  useEffect(() => {
    const displaceDiv = document.querySelector(".follow-mouse");

    // Update displacement on mouse move
    document.addEventListener("mousemove", (event) => {
      const { clientX, clientY } = event;

      // Adjust translation
      const xDisplacement = (clientX - window.innerWidth / 2) * 0.05; // Sensitivity factor
      const yDisplacement = (clientY - window.innerHeight / 2) * 0.05;

      // Apply displacement
      displaceDiv.style.transform = `translate(${xDisplacement}px, ${yDisplacement}px)`;
    });
  }, []);
  useEffect(() => {
    const path2 = document.querySelector(".svg-path2");
    if (path2) {
      const totalLength2 = path2.getTotalLength();
      setPathLength2(totalLength2);

      gsap.fromTo(
        path2,
        { strokeDashoffset: totalLength2 },
        {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: path2.closest(".section2"),
            start: "top 80%",
            end: "+=800",
            scrub: 1,
          },
        }
      );
    }
    const path = document.querySelector(".svg-path");
    if (path) {
      const totalLength = path.getTotalLength();
      setPathLength(totalLength);

      gsap.fromTo(
        path,
        { strokeDashoffset: 0 },
        {
          strokeDashoffset: totalLength,
          scrollTrigger: {
            trigger: path.closest(".section"),
            start: "top 85%",
            end: "+=600",
            scrub: 1,
          },
        }
      );
    }
  }, []);

  useEffect(() => {
    const sections = gsap.utils.toArray(".section");

    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () =>
          gsap.to("body", {
            backgroundColor: section.dataset.bgColor,
            duration: 1,
          }),
        onEnterBack: () =>
          gsap.to("body", {
            backgroundColor: section.dataset.bgColor,
            duration: 1,
          }),
      });
    });
  }, []);

  return (
    <>
      <SmoothScroll>
        <div className=" font-mono overflow-x-hidden ">
          <div
            className="section flex flex-col justify-center items-center gap-2"
            data-bg-color="#f9e1ee"
            style={{ height: "100vh" }}
          >
            <div className=" w-full text-6xl self-stretch text-center font-extrabold follow-mouse ">
              Assignment Techsnap
            </div>
            <div>Move your cursor around</div>
          </div>
          <div
            className="section section2 relative"
            data-bg-color="#e0f0ff"
            style={{ height: "100vh" }}
          >
            {/* <div className="w-1440 flex justify-center items-center gap-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="1264"
                viewBox="0 0 10 1264"
                fill="none"
                className="w-full h-[100vh] absolute top-0 left-0 hidden lg:block"
              >
                <path
                  d="M5 4.5V1259"
                  stroke="white"
                  strokeWidth="9"
                  strokeLinecap="round"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="1264"
                viewBox="0 0 10 1264"
                fill="none"
                className="w-full h-[100vh] absolute top-0 left-0 hidden lg:block"
              >
                <path
                  d="M5 4.5V1259"
                  stroke="black"
                  strokeWidth="9"
                  strokeLinecap="round"
                  className="svg-path2"
                  style={{
                    transformOrigin: "0px 0px",
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    strokeDasharray: pathLength2,
                  }}
                />
              </svg> */}
            {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1217"
                height="1209"
                viewBox="0 0 1217 1209"
                fill="none"
                className="w-full h-[110vh] absolute top-0 left-0 lg:hidden"
              >
                <path
                  d="M1212.5 1204.5V1045.5C1212.5 1022.86 1194.14 1004.5 1171.5 1004.5H46C23.3563 1004.5 5 986.144 5 963.5V238.5C5 215.856 23.3563 197.5 46 197.5H633C655.644 197.5 674 179.144 674 156.5V5"
                  stroke="black"
                  strokeWidth="9"
                  strokeLinecap="round"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1217"
                height="1209"
                viewBox="0 0 1217 1209"
                fill="none"
                className="w-full h-[110vh] absolute top-0 left-0 lg:hidden"
              >
                <path
                  d="M1212.5 1204.5V1045.5C1212.5 1022.86 1194.14 1004.5 1171.5 1004.5H46C23.3563 1004.5 5 986.144 5 963.5V238.5C5 215.856 23.3563 197.5 46 197.5H633C655.644 197.5 674 179.144 674 156.5V5"
                  stroke="white"
                  strokeWidth="9"
                  strokeLinecap="round"
                  className="svg-path"
                  style={{
                    transformOrigin: "0px 0px",
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    strokeDasharray: pathLength,
                  }}
                />
              </svg> */}
            <ScrollProgressAnimation />
            {/* <div className=" absolute top-[45%] lg:top-[30%] right-[5%] w-xl flex flex-wrap justify-center items-center gap-10 lg:right-0 px-4">
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
                    praesentium facere accusantium, rerum accusamus ad? Ad
                    blanditiis vitae animi. Unde sit recusandae minima
                    voluptates, tenetur placeat expedita a eveniet magnam
                    eligendi. Doloremque deserunt error commodi debitis
                    voluptates minima minus libero consequuntur quas quaerat,
                    fuga quam laudantium veritatis, expedita, ab saepe velit
                    cupiditate.
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
              </div> */}
            {/* </div> */}
          </div>
        </div>
      </SmoothScroll>
      <div
        className="section border-2 h-[100vh] border-slate-500"
        data-bg-color="#ffeddf"
      >
        <div className="overflow-hidden" ref={component}>
          <div ref={slider} className="flex w-[400vw] h-[100vh]">
            <div className="panel red w-screen bg-red-500 flex justify-center items-center text-white text-4xl">
              ONE
            </div>
            <div className="panel orange w-screen h-full bg-orange-500 flex justify-center items-center text-white text-4xl">
              TWO
            </div>
            <div className="panel purple w-screen  bg-purple-500 flex justify-center items-center text-white text-4xl">
              THREE
            </div>
            <div className="panel green w-screen bg-green-500 flex justify-center items-center text-white text-4xl">
              FOUR
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScrollColorChange;
