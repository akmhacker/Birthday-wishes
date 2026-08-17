// Custom cursor (desktop only)
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
if (!isTouchDevice) {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX - 11,
                y: e.clientY - 11,
                duration: 0.15,
                ease: "power2.out"
            });
        });
    }
} else {
    document.body.style.cursor = 'auto';
    const cursorEl = document.querySelector('.cursor');
    if (cursorEl) cursorEl.style.display = 'none';
}

// Typewriter effect
const greetingText = "Hey Sonam... You're the most wonderful human I know 💖";
const greetingElement = document.getElementById('greeting');
let charIndex = 0;

function typeGreeting() {
    if (charIndex < greetingText.length) {
        greetingElement.textContent += greetingText.charAt(charIndex);
        charIndex++;
        setTimeout(typeGreeting, 70);
    }
}

// Floating hearts & stars
const floatingEmojis = ['💖', '✨', '🌸', '💫', '💕', '🦋', '⭐', '💗'];
function createFloating() {
    const el = document.createElement('div');
    el.className = 'floating';
    el.textContent = floatingEmojis[Math.floor(Math.random() * floatingEmojis.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.top = Math.random() * 100 + 'vh';
    el.style.fontSize = (Math.random() * 18 + 16) + 'px';
    const container = document.getElementById('floatingContainer');
    if (container) container.appendChild(el);

    gsap.to(el, {
        y: -window.innerHeight - 100,
        x: (Math.random() - 0.5) * 200,
        rotation: Math.random() * 360,
        duration: Math.random() * 6 + 7,
        opacity: 1,
        ease: "none",
        onComplete: () => el.remove()
    });
}

// Soft confetti
function createConfetti() {
    const colors = ['#ff69b4', '#ff99cc', '#c084fc', '#f472b6', '#f9a8d4'];
    for (let i = 0; i < 35; i++) {
        const conf = document.createElement('div');
        conf.className = 'confetti';
        conf.style.background = colors[Math.floor(Math.random() * colors.length)];
        conf.style.left = Math.random() * 100 + 'vw';
        conf.style.top = '-20px';
        conf.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        document.body.appendChild(conf);

        gsap.to(conf, {
            y: window.innerHeight + 50,
            x: (Math.random() - 0.5) * 300,
            rotation: Math.random() * 720,
            duration: Math.random() * 3 + 2.5,
            opacity: 1,
            ease: "power1.out",
            onComplete: () => conf.remove()
        });
    }
}

// ====== TEASING MULTI-CLICK SYSTEM ======
const teaseMessages = [
    "Aww, not so fast… 😏 Try again 💕",
    "Hehe, you really want to enter that bad? 🥺 One more time…",
    "You're cute when you're determined 😘 Keep clicking~",
    "Almost there, beautiful… I like how persistent you are 💖",
    "Okay okay… last one. Ready for something special? ✨"
];

let clickCount = 0;
const maxClicks = teaseMessages.length; // 5 clicks before entering

const btn = document.getElementById('enterBtn');
const hint = document.querySelector('.hint');

btn.addEventListener('click', function(e) {
    e.preventDefault();

    // Play music on first interaction
    const music = document.getElementById('bgMusic');
    if (music) {
        music.volume = 0.25;
        music.play().catch(() => {});
    }

    clickCount++;

    // Button press animation
    gsap.to(btn, {
        scale: 0.92,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });

    if (clickCount <= maxClicks) {
        // Show teasing message
        const message = teaseMessages[clickCount - 1];
        
        // Update the greeting area temporarily with the tease
        gsap.to(greetingElement, {
            opacity: 0,
            duration: 0.25,
            onComplete: () => {
                greetingElement.textContent = message;
                greetingElement.style.color = '#ff69b4';
                greetingElement.style.fontWeight = '500';
                gsap.to(greetingElement, { opacity: 1, duration: 0.35 });
            }
        });

        // Update button text a bit
        if (clickCount === 1) btn.textContent = "Click again… 💕";
        if (clickCount === 2) btn.textContent = "Still not enough 😏";
        if (clickCount === 3) btn.textContent = "Keep going… 😘";
        if (clickCount === 4) btn.textContent = "One more… 💖";
        if (clickCount === 5) btn.textContent = "Enter Our World ✨";

        // Small confetti on each tease click
        for (let i = 0; i < 8; i++) {
            const conf = document.createElement('div');
            conf.className = 'confetti';
            conf.style.background = ['#ff69b4', '#c084fc', '#f9a8d4'][Math.floor(Math.random()*3)];
            conf.style.left = '50%';
            conf.style.top = '50%';
            conf.style.width = '8px';
            conf.style.height = '8px';
            conf.style.borderRadius = '50%';
            document.body.appendChild(conf);
            gsap.to(conf, {
                x: (Math.random() - 0.5) * 250,
                y: (Math.random() - 0.5) * 200 - 50,
                opacity: 0,
                duration: 1,
                ease: "power2.out",
                onComplete: () => conf.remove()
            });
        }

        if (clickCount === maxClicks) {
            // After last tease, change hint
            if (hint) hint.textContent = "Okay… now you can enter 💫";
        }
    } else {
        // Final click → go to reasons page
        gsap.to('body', {
            opacity: 0,
            duration: 0.9,
            ease: "power2.inOut",
            onComplete: () => {
                window.location.href = 'reasons.html';
            }
        });
    }
});

// Initialize
window.addEventListener('load', () => {
    gsap.to('.title', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "back.out(1.4)"
    });

    gsap.to('.cta-button', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.4,
        ease: "back.out(1.2)"
    });

    setTimeout(typeGreeting, 800);
    setInterval(createFloating, 900);
    setTimeout(createConfetti, 300);
});
