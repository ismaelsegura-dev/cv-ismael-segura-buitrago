/* CV INTERACTIVO - ISMAEL SEGURA
   Stack: GSAP (Animaciones) + Lenis (Scroll) + Vanilla JS (Lógica)
*/

// --- 1. CONFIGURACIÓN DEL SCROLL SUAVE (LENIS) ---
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// --- 2. LOGICA DEL MODO OSCURO (CON MEMORIA) ---
const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const icon = toggleBtn.querySelector('i');

// Comprobar si el usuario ya tenía una preferencia guardada
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}

toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Cambiar icono y guardar en memoria
    if(body.classList.contains('dark-mode')){
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// --- 3. CURSOR PERSONALIZADO ---
// Solo activamos esto en escritorio (pantallas grandes)
if (window.matchMedia("(min-width: 768px)").matches) {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener("mousemove", function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        // El punto sigue al mouse instantáneamente
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // El círculo grande nos sigue con animación fluida usando GSAP
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Efecto "Hover" (Hacerse grande) en enlaces y botones
    const hoverables = document.querySelectorAll('a, button, .job-item');
    
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = "translate(-50%, -50%) scale(2.5)";
            cursorOutline.style.backgroundColor = "rgba(255, 255, 255, 0.1)"; // Sutil relleno
            cursorDot.style.opacity = "0"; // Ocultamos el punto pequeño
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
            cursorOutline.style.backgroundColor = "transparent";
            cursorDot.style.opacity = "1";
        });
    });
}

// --- 4. ANIMACIONES CINEMÁTICAS (GSAP) ---
gsap.registerPlugin(ScrollTrigger);

// A. Animación de Entrada (Hero Section)
const tl = gsap.timeline();

tl.from(".reveal-text", {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.15, // Retraso entre cada línea de texto
    ease: "power4.out",
    delay: 0.2
})
.from(".scroll-indicator", {
    opacity: 0,
    y: 20,
    duration: 1,
    ease: "power2.out"
}, "-=0.5"); // Empieza medio segundo antes de que termine la anterior

// B. Animación al hacer Scroll (Fade In Up)
const sections = document.querySelectorAll("section:not(.hero)");

sections.forEach(section => {
    // Animar título, párrafos y elementos de lista
    const elements = section.querySelectorAll("h2, p, .job-item, .stat-item, .big-text, .email-btn");
    
    gsap.from(elements, {
        scrollTrigger: {
            trigger: section,
            start: "top 85%", // La animación inicia cuando el top de la sección entra al 85% de la pantalla
            toggleActions: "play none none none" // Solo se reproduce una vez
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1, // Efecto cascada entre elementos
        ease: "power3.out"
    });
});

// C. Animación de la línea de tiempo (Barra lateral)
gsap.from(".timeline", {
    scrollTrigger: {
        trigger: ".experience",
        start: "top 70%",
    },
    scaleY: 0,
    transformOrigin: "top",
    duration: 1.5,
    ease: "power4.out"
});
