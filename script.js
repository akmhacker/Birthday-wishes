// Custom cursor (desktop only)
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
if (!isTouchDevice) {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX - 9,
                y: e.clientY - 9,
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

// Typewriter
const greetingText = "Hey Sonam... You have no idea what you do to me 💕";
const greetingElement = document.getElementById('greeting');
let charIndex = 0;

function typeGreeting() {
    if (charIndex < greetingText.length) {
        greetingElement.textContent += greetingText.charAt(charIndex);
        charIndex++;
        setTimeout(typeGreeting, 65);
    }
}

// Floating elements (tulips + hearts)
const floatingEmojis = ['🌷', '💖', '✨', '🖤', '💕', '🌹', '💜', '💗', '🦋'];
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
        opacity: 0.9,
        ease: "none",
        onComplete: () => el.remove()
    });
}

// Confetti
function createConfetti() {
    const colors = ['#e11d48', '#be123c', '#a855f7', '#f472b6', '#7c3aed'];
    for (let i = 0; i < 40; i++) {
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

// ===== FLIRTY MULTI-CLICK TEASE =====
const teaseMessages = [
    "Mmm… not yet, baby 😏 Try again 💕",
    "You really want me that bad? 🥺 Keep going…",
    "I like how impatient you are for me 😘",
    "Almost there… you’re making me blush 🖤",
    "One last click… then I’m all yours ✨🌷"
];

let clickCount = 0;
const maxClicks = teaseMessages.length;

const btn = document.getElementById('enterBtn');
const hint = document.querySelector('.hint');

btn.addEventListener('click', function(e) {
    e.preventDefault();

    const music = document.getElementById('bgMusic');
    if (music) {
        music.volume = 0.3;
        music.play().catch(() => {});
    }

    clickCount++;

    gsap.to(btn, {
        scale: 0.92,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });

    if (clickCount <= maxClicks) {
        const message = teaseMessages[clickCount - 1];

        gsap.to(greetingElement, {
            opacity: 0,
            duration: 0.22,
            onComplete: () => {
                greetingElement.textContent = message;
                greetingElement.style.color = '#fb7185';
                greetingElement.style.fontWeight = '500';
                gsap.to(greetingElement, { opacity: 1, duration: 0.3 });
            }
        });

        if (clickCount === 1) btn.textContent = "Again… 💕";
        if (clickCount === 2) btn.textContent = "Still not enough 😏";
        if (clickCount === 3) btn.textContent = "Keep going baby… 😘";
        if (clickCount === 4) btn.textContent = "One more… 🖤";
        if (clickCount === 5) btn.textContent = "Enter Our World ✨🌷";

        // small confetti
        for (let i = 0; i < 10; i++) {
            const conf = document.createElement('div');
            conf.className = 'confetti';
            conf.style.background = ['#e11d48', '#a855f7', '#f472b6'][Math.floor(Math.random()*3)];
            conf.style.left = '50%';
            conf.style.top = '50%';
            conf.style.width = '8px';
            conf.style.height = '8px';
            conf.style.borderRadius = '50%';
            document.body.appendChild(conf);
            gsap.to(conf, {
                x: (Math.random() - 0.5) * 260,
                y: (Math.random() - 0.5) * 200 - 40,
                opacity: 0,
                duration: 1,
                ease: "power2.out",
                onComplete: () => conf.remove()
            });
        }

        if (clickCount === maxClicks && hint) {
            hint.textContent = "Okay… come in 💫";
        }
    } else {
        gsap.to('body', {
            opacity: 0,
            duration: 0.85,
            ease: "power2.inOut",
            onComplete: () => {
                window.location.href = 'reasons.html';
            }
        });
    }
});

// Init
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
        delay: 0.35,
        ease: "back.out(1.2)"
    });

    setTimeout(typeGreeting, 700);
    setInterval(createFloating, 850);
    setTimeout(createConfetti, 250);
});
