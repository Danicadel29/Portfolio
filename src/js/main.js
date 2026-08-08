import "../scss/main.scss";

import {gsap} from "gsap";

import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const glassShapes = document.querySelectorAll(".hero__glass");

function animateGlass(shape) {
  return gsap.to(shape, {
    x: gsap.utils.random(-450, 450),
    y: gsap.utils.random(-250, 250),
    rotation: gsap.utils.random(-60, 60),

    duration: gsap.utils.random(8, 14),
    ease: "sine.inOut",

    repeat: -1,
    yoyo: true,
    repeatRefresh: true,
  });
}

const glassAnimations = [];

glassShapes.forEach((shape) => {
  const animation = animateGlass(shape);
  glassAnimations.push(animation);
});

ScrollTrigger.create({
  trigger: ".hero",
  start: "top bottom",
  end: "bottom top",

  onEnter: () => {
    glassAnimations.forEach((animation) => animation.play());
  },

  onLeave: () => {
    glassAnimations.forEach((animation) => animation.pause());
  },

  onEnterBack: () => {
    glassAnimations.forEach((animation) => animation.play());
  },

  onLeaveBack: () => {
    glassAnimations.forEach((animation) => animation.pause());
  },
});