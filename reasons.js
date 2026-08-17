// ====== CUSTOMIZE THESE MESSAGES ======
const reasons = [
    {
        text: "You’re such a kind and wonderful person. I feel lucky to have you in my life 💖",
        emoji: "🌟"
    },
    {
        text: "Your smile can light up any room — it’s pure magic ✨",
        emoji: "😊"
    },
    {
        text: "Thank you for always being there, for the laughs, the talks, and the support 💕",
        emoji: "🫂"
    },
    {
        text: "You make ordinary days feel special just by being you 🌸",
        emoji: "🦋"
    },
    {
        text: "May this year bring you endless happiness, success, and beautiful moments 🥳",
        emoji: "🎉"
    },
    {
        text: "Stay exactly the amazing, positive, and loving person you are 💫",
        emoji: "💖"
    }
];
// ======================================

let currentIndex = 0;
const container = document.getElementById('reasons-container');
const nextBtn = document.getElementById('nextBtn');
const counter = document.getElementById('counter');

// Disable custom cursor on touch devices (fixes mobile issues)
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
if (!isTouchDevice) {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX - 11,
                y: e.clientY - 11,
                duration: 0.15
            });
        });
    }
} else {
    // On mobile, restore normal cursor
    document.body.style.cursor = 'auto';
    const cursorEl = document.querySelector('.cursor');
    if (cursorEl) cursorEl.style.display = 'none';
}

// Floating elements
const emojis = ['💖', '✨', '🌸', '💫', '💕', '🦋', '⭐'];
function createFloating() {
    const el = document.createElement('div');
    el.className = 'floating';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = Math.random() * window.innerWidth + 'px';
    el.style.top = Math.random() * window.innerHeight + 'px';
    const floatContainer = document.getElementById('floatingContainer');
    if (floatContainer) floatContainer.appendChild(el);

    gsap.to(el, {
        y: -400,
        x: (Math.random() - 0.5) * 150,
        rotation: Math.random() * 360,
        duration: Math.random() * 5 + 6,
        opacity: 0.9,
        ease: "none",
        onComplete: () => el.remove()
    });
}
setInterval(createFloating, 1400);

function createCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';
    card.innerHTML = `<div class="reason-text"><span class="emoji">${reason.emoji}</span> ${reason.text}</div>`;
    
    gsap.from(card, {
        opacity: 0,
        y: 40,
        scale: 0.92,
        duration: 0.5,
        ease: "back.out(1.4)"
    });
    
    return card;
}

function showNextReason() {
    if (currentIndex < reasons.length) {
        const card = createCard(reasons[currentIndex]);
        container.appendChild(card);
        
        counter.textContent = `Reason ${currentIndex + 1} of ${reasons.length}`;
        currentIndex++;

        // Soft confetti
        for (let i = 0; i < 10; i++) {
            const conf = document.createElement('div');
            conf.style.cssText = `
                position: fixed;
                width: 8px; height: 8px;
                background: ${['#ff69b4','#c084fc','#f9a8d4','#a78bfa'][Math.floor(Math.random()*4)]};
                border-radius: 50%;
                left: 50%; top: 35%;
                z-index: 5;
                pointer-events: none;
            `;
            document.body.appendChild(conf);
            gsap.to(conf, {
                x: (Math.random() - 0.5) * 280,
                y: (Math.random() - 0.5) * 180 - 80,
                opacity: 0,
                duration: 1.1,
                ease: "power2.out",
                onComplete: () => conf.remove()
            });
        }

        // Change button text when finished
        if (currentIndex === reasons.length) {
            nextBtn.textContent = "See Our Memories 💫";
            nextBtn.classList.add('final');
        }
    } else {
        // Go to memories page
        gsap.to('body', {
            opacity: 0,
            duration: 0.7,
            onComplete: () => {
                window.location.href = 'memories.html';
            }
        });
    }
}

// Button click (works on both mouse and touch)
nextBtn.addEventListener('click', function(e) {
    e.preventDefault();
    gsap.to(nextBtn, {
        scale: 0.94,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    showNextReason();
});

// Also support touchend for better mobile response
nextBtn.addEventListener('touchend', function(e) {
    e.preventDefault();
    showNextReason();
});

// Auto-show the first reason
setTimeout(() => {
    showNextReason();
}, 500);
