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

// Animation des textes au scroll

gsap.utils.toArray("h2, h3, p").forEach((text) => {

    gsap.from(text, {
        opacity: 0,
        y: 30,
        duration: 1,

        scrollTrigger: {
            trigger: text,
            start: "top 90%",
            once: true
        }
    });

});


// Loading entre les pages

const loader = document.querySelector(".loader");
const logo = loader?.querySelector("img");

if (loader && logo) {

    // Animation du logo
    const animerLogo = async (image) => {

        const response = await fetch(image.src);
        if (!response.ok) throw new Error("Logo introuvable");

        const code = await response.text();
        const parent = image.parentElement;

        image.outerHTML = code;

        const svg = parent.querySelector("svg");
        if (!svg) throw new Error("SVG introuvable");

        const petales = gsap.utils.toArray(
            svg.querySelectorAll("circle")
        ).slice(0, 7);

        gsap.set(svg, {
            width: 120,
            height: 120,
            overflow: "visible"
        });

        // Rotation et mouvement des pétales
        gsap.timeline({ repeat: -1 })
            .to(petales, {
                x: i => (Number(petales[i].getAttribute("cx")) - 30.5) * 0.6,
                y: i => (Number(petales[i].getAttribute("cy")) - 30.5) * 0.6,
                duration: 0.6,
                ease: "power2.out"
            })
            .to(petales, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: "back.out(2)"
            });

        // Rotation continue du logo
        gsap.to(svg, {
            rotation: "+=360",
            duration: 1.2,
            repeat: -1,
            ease: "none"
        });
    };

    // Attendre le chargement de la page
    const chargementPage = new Promise(resolve => {
        if (document.readyState === "complete") {
            resolve();
        } else {
            window.addEventListener("load", resolve, { once: true });
        }
    });

    // Afficher la page quand tout est prêt
    Promise.all([
        animerLogo(logo),
        chargementPage,
        document.fonts.ready
    ]).then(() => {

        gsap.to(loader, {
            autoAlpha: 0,
            duration: 0.6,
            ease: "power2.inOut",
            onComplete: () => loader.remove()
        });

    }).catch(error => {
        console.error(error);
        loader.remove();
    });

    // Changement de page
    document.querySelectorAll('a[href^="./"]').forEach(link => {

        link.addEventListener("click", async event => {

            if (event.ctrlKey || event.metaKey ||
                event.shiftKey || event.altKey ||
                link.target === "_blank") return;

            event.preventDefault();

            // Créer un nouveau loader
            const nouveauLoader = document.createElement("div");
            nouveauLoader.className = "loader";

            nouveauLoader.innerHTML = `
                <img src="/public/Logo.svg" alt="Chargement">
            `;

            document.body.appendChild(nouveauLoader);

            try {
                // Préparer l'animation du logo
                await animerLogo(nouveauLoader.querySelector("img"));
            } catch (error) {
                console.error(error);
            }

            // Transition vers la nouvelle page
            gsap.fromTo(nouveauLoader,
                { autoAlpha: 0 },
                {
                    autoAlpha: 1,
                    duration: 0.5,
                    ease: "power2.inOut",
                    onComplete: () => {
                        window.location.href = link.href;
                    }
                }
            );

        });

    });
}