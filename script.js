// Inicializar Lenis (Scroll Suave)
const lenis = new Lenis();
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Cursor Personalizado
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (window.matchMedia("(min-width: 768px)").matches) {
    window.addEventListener("mousemove", function (e) {
        const posX = e.clientX;
        const posY = e.clientY;
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        cursorOutline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 500, fill: "forwards" });
    });
}

// Animaciones GSAP
gsap.registerPlugin(ScrollTrigger);

// Hero
gsap.from(".hero-title", { y: 100, opacity: 0, duration: 1, ease: "power4.out", delay: 0.2 });
gsap.from(".hero-desc", { y: 50, opacity: 0, duration: 1, delay: 0.5 });

// Cards de Experiencia
gsap.utils.toArray(".card").forEach(card => {
    gsap.from(card, {
        scrollTrigger: { trigger: card, start: "top 85%" },
        y: 50, opacity: 0, duration: 0.8, ease: "power2.out"
    });
});

// Bento Grid
gsap.utils.toArray(".bento-item").forEach((item, i) => {
    gsap.from(item, {
        scrollTrigger: { trigger: ".bento-grid", start: "top 80%" },
        y: 50, opacity: 0, duration: 0.8, delay: i * 0.1, ease: "power2.out"
    });
});
