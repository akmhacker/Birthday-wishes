// ====== FLIRTY REASONS ======
const reasons = [
    {
        text: "You’re dangerously cute… I catch myself staring at you more than I should 💕",
        emoji: "🔥"
    },
    {
        text: "That smile of yours? It makes my heart do stupid things every single time 🖤",
        emoji: "😍"
    },
    {
        text: "I love how your presence alone can make a normal day feel special 🌷",
        emoji: "✨"
    },
    {
        text: "You’re the kind of beautiful that stays in my mind long after you’re gone 😘",
        emoji: "💖"
    },
    {
        text: "If I could, I’d steal a thousand more moments with you… and still want more 🌹",
        emoji: "🥺"
    },
    {
        text: "Happy Birthday, my favourite kind of trouble. Stay this irresistible forever 🖤🌷",
        emoji: "🎂"
    }
];
// ============================

let currentIndex = 0;
const container = document.getElementById('reasons-container');
const nextBtn = document.getElementById('nextBtn');
const counter = document.getElementById('counter');

// Cursor - desktop only
const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
if (!isTouchDevice) {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            if (typeof gsap !== 'undefined') {
                gsap.to(cursor, {
                    x: e.clientX - 9,
                    y: e.clientY - 9,
                    duration: 0.15
                });
            }
        });
    }
} else {
    document.body.style.cursor = 'auto';
    const cursorEl = document.querySelector('.cursor');
    if (cursorEl) cursorEl.style.display = 'none';
}

// Floating elements
const emojis = ['🌷', '💖', '✨', '🖤', '💕', '🌹', '💜', '💗'];
function createFloating() {
    const el = document.createElement('div');
    el.className = 'floating';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = Math.random() * window.innerWidth + 'px';
    el.style.top = Math.random() * window.innerHeight + 'px';
    const floatContainer = document.getElementById('floatingContainer');
    if (floatContainer) floatContainer.appendChild(el);

    if (typeof gsap !== 'undefined') {
        gsap.to(el, {
            y: -400,
            x: (Math.random() - 0.5) * 150,
            rotation: Math.random() * 360,
            duration: Math.random() * 5 + 6,
            opacity: 0.85,
            ease: "none",
            onComplete: () => el.remove()
        });
    } else {
        setTimeout(() => el.remove(), 8000);
    }
}
setInterval(createFloating, 1400);

function createCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';
    card.innerHTML = `<div class="reason-text"><span class="emoji">${reason.emoji}</span> ${reason.text}</div>`;
    
    if (typeof gsap !== 'undefined') {
        gsap.from(card, {
            opacity: 0,
            y: 35,
            scale: 0.95,
            duration: 0.45,
            ease: "back.out(1.3)"
        });
    }
    
    return card;
}

function showNextReason() {
    if (currentIndex < reasons.length) {
        const card = createCard(reasons[currentIndex]);
        container.appendChild(card);
        
        counter.textContent = `Reason ${currentIndex + 1} of ${reasons.length}`;
        currentIndex++;

        // small confetti
        if (typeof gsap !== 'undefined') {
            for (let i = 0; i < 8; i++) {
                const conf = document.createElement('div');
                conf.style.cssText = `
                    position: fixed;
                    width: 8px; height: 8px;
                    background: ${['#e11d48','#a855f7','#f472b6','#be123c'][Math.floor(Math.random()*4)]};
                    border-radius: 50%;
                    left: 50%; top: 40%;
                    z-index: 5;
                    pointer-events: none;
                `;
                document.body.appendChild(conf);
                gsap.to(conf, {
                    x: (Math.random() - 0.5) * 260,
                    y: (Math.random() - 0.5) * 160 - 60,
                    opacity: 0,
                    duration: 1,
                    ease: "power2.out",
                    onComplete: () => conf.remove()
                });
            }
        }

        if (currentIndex === reasons.length) {
            nextBtn.textContent = "See Our Memories 💫🌷";
            nextBtn.classList.add('final');
        }
    } else {
        // Go to memories
        if (typeof gsap !== 'undefined') {
            gsap.to('body', {
                opacity: 0,
                duration: 0.65,
                onComplete: () => {
                    window.location.href = 'memories.html';
                }
            });
        } else {
            window.location.href = 'memories.html';
        }
    }
}

// Button click - works on both mouse and touch
function handleNext(e) {
    if (e) e.preventDefault();
    if (typeof gsap !== 'undefined') {
        gsap.to(nextBtn, {
            scale: 0.94,
            duration: 0.1,
            yoyo: true,
            repeat: 1
        });
    }
    showNextReason();
}

nextBtn.addEventListener('click', handleNext);
nextBtn.addEventListener('touchend', handleNext);

// Show first reason automatically
setTimeout(showNextReason, 400);
