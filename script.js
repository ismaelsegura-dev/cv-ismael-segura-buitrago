/* CV INTERACTIVO - ISMAEL SEGURA
   Stack: Vanta.js (Fondo 3D) + Lenis (Scroll) + GSAP (Animaciones)
*/

// --- 1. FONDO 3D (VANTA.JS - EFECTO SHADER) ---
// Configuración exacta con tus colores: Violeta y Rosa
if (window.matchMedia("(min-width: 768px)").matches) {
    VANTA.FOG({
        el: "#vanta-bg", // Apunta al ID que pusimos en el body
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        highlightColor: 0xd755db, // TU COLOR ROSA
        midtoneColor: 0x6536ff,   // TU COLOR VIOLETA
        lowlightColor: 0x000019,  // TU COLOR OSCURO
        baseColor: 0x050505,      // Fondo base
        blurFactor: 0.6,
        speed: 1.5,
        zoom: 1.0
    });
}

// --- 2. SCROLL SUAVE (LENIS) ---
const lenis = new Lenis();
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// --- 3. CURSOR PERSONALIZADO ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (window.matchMedia("(min-width: 768px)").matches) {
    window.addEventListener("mousemove", function (e) {
        const posX = e.clientX;
        const posY = e.clientY;
        
        // Punto central
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        
        // Círculo externo (con retraso fluido)
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });
}

// --- 4. ANIMACIONES CINEMÁTICAS (GSAP) ---
gsap.registerPlugin(ScrollTrigger);

// Hero (Título principal)
const heroTl = gsap.timeline();
heroTl.from(".hero-title", { 
    y: 100, 
    opacity: 0, 
    duration: 1, 
    ease: "power4.out", 
    delay: 0.2 
})
.from(".hero-desc", { 
    y: 50, 
    opacity: 0, 
    duration: 1, 
    ease: "power2.out" 
}, "-=0.5")
.from(".tech-stack", { 
    opacity: 0, 
    y: 20, 
    duration: 1 
}, "-=0.5");

// Cards de Experiencia (Efecto cascada)
gsap.utils.toArray(".card").forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 90%", // Aparecen antes para que no se vea vacío
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: i * 0.1 // Pequeño retraso entre una y otra
    });
});

// Bento Grid (Skills)
gsap.from(".bento-item", {
    scrollTrigger: {
        trigger: ".bento-grid",
        start: "top 85%",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1, // Aparecen uno tras otro
    ease: "power2.out"
});
