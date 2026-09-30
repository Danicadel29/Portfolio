import "../scss/main.scss";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


// Animation des formes glass
// Uniquement sur ordinateur

const isMobileOrTablet = window.matchMedia("(max-width: 64rem)").matches;

if (!isMobileOrTablet) {

  const glassSections = document.querySelectorAll(
    ".hero, .dataplays, .celestia, .souffle, .see"
  );

  glassSections.forEach((section) => {

    const glassShapes = section.querySelectorAll(".glass");

    const glassAnimations = [];

    glassShapes.forEach((shape) => {

      const animation = gsap.to(shape, {
        x: gsap.utils.random(-450, 450),
        y: gsap.utils.random(-250, 250),
        rotation: gsap.utils.random(-60, 60),

        duration: gsap.utils.random(8, 14),
        ease: "sine.inOut",

        repeat: -1,
        yoyo: true,
        repeatRefresh: true,
      });

      glassAnimations.push(animation);
    });


    ScrollTrigger.create({
      trigger: section,

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

  });

}



// Carousel projets

const projectImages = gsap.utils.toArray(".projects__image");

const previousButton = document.querySelector(".projects__arrow--left");
const nextButton = document.querySelector(".projects__arrow--right");

const projectTitle = document.querySelector(".projects__title");
const projectContent = document.querySelector(".projects__content");

const projectNames = [
  "Titanic",
  "Souffle coupé",
  "Try not to See",
  "Celestia Travel",
];

let activeProject = 1;


// Tablette + téléphone
const isTablet = window.matchMedia("(max-width: 64rem)").matches;


function updateCarousel() {

  // Le carrousel s'adapte automatiquement
  // à la largeur du bloc projects__content

  const ratio = Math.min(projectContent.offsetWidth / 1200, 1);

  const sidePosition = 320 * ratio;

  const sideWidth = 25 * ratio;
  const sideHeight = 18.75 * ratio;

  const centerWidth = 31 * ratio;
  const centerHeight = 23.5 * ratio;


  const leftIndex =
    (activeProject - 1 + projectImages.length) % projectImages.length;

  const rightIndex =
    (activeProject + 1) % projectImages.length;


  projectImages.forEach((image, index) => {

    // Gauche
    if (index === leftIndex) {

      gsap.to(image, {
        x: -sidePosition,
        rotation: -5,

        width: `${sideWidth}rem`,
        height: `${sideHeight}rem`,

        opacity: 1,

        filter: "grayscale(100%) blur(2px)",

        zIndex: 1,

        duration: 0.8,
        ease: "power3.inOut",
      });

    }


    // Centre
    else if (index === activeProject) {

      gsap.to(image, {
        x: 0,
        rotation: 0,

        width: `${centerWidth}rem`,
        height: `${centerHeight}rem`,

        opacity: 1,

        filter: "grayscale(100%) blur(0px)",

        zIndex: 3,

        duration: 0.8,
        ease: "power3.inOut",
      });

    }


    // Droite
    else if (index === rightIndex) {

      gsap.to(image, {
        x: sidePosition,
        rotation: 5,

        width: `${sideWidth}rem`,
        height: `${sideHeight}rem`,

        opacity: 1,

        filter: "grayscale(100%) blur(2px)",

        zIndex: 1,

        duration: 0.8,
        ease: "power3.inOut",
      });

    }


    // Cachée
    else {

      gsap.to(image, {
        x: 0,

        opacity: 0,

        zIndex: 0,

        duration: 0.8,
        ease: "power3.inOut",
      });

    }

  });


  projectTitle.textContent = projectNames[activeProject];
}


// Le carrousel fonctionne uniquement sur ordinateur

if (
  projectImages.length > 0 &&
  projectTitle &&
  projectContent &&
  !isTablet
) {
  updateCarousel();
}


// Flèche droite

nextButton?.addEventListener("click", () => {

  if (isTablet) return;

  activeProject++;

  if (activeProject >= projectImages.length) {
    activeProject = 0;
  }

  updateCarousel();
});


// Flèche gauche

previousButton?.addEventListener("click", () => {

  if (isTablet) return;

  activeProject--;

  if (activeProject < 0) {
    activeProject = projectImages.length - 1;
  }

  updateCarousel();
});


// Adapte le carrousel quand la fenêtre change de taille

window.addEventListener("resize", () => {

  if (window.innerWidth > 1024 && projectContent) {
    updateCarousel();
  }

});