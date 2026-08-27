// ===== TEASING RUNAWAY BUTTON =====

const teaseMessages = [
    "Hehe… not so fast 😏",
    "Catch me if you can 💕",
    "Too slow, Sonam 😘",
    "Almost… but not yet 🖤",
    "Okay okay… you win ✨🌷"
];

const buttonTexts = [
    "Try again 💕",
    "Come on, catch me 😏",
    "Still not enough 😘",
    "One more time… 🖤",
    "Fine… Enter Our World ✨"
];

let clickCount = 0;
const maxTeases = 5;

const btn = document.getElementById('enterBtn');
const greeting = document.getElementById('greeting');
const hint = document.getElementById('hintText');

// Typewriter for first message
const firstMessage = "Hey Sonam... You have no idea what you do to me 💕";
let charIndex = 0;

function typeGreeting() {
    if (charIndex < firstMessage.length) {
        greeting.textContent += firstMessage.charAt(charIndex);
        charIndex++;
        setTimeout(typeGreeting, 60);
    }
}

// Move button to random position
function moveButtonRandomly() {
    const maxX = window.innerWidth - btn.offsetWidth - 40;
    const maxY = window.innerHeight - btn.offsetHeight - 80;
    
    const randomX = Math.max(20, Math.random() * maxX);
    const randomY = Math.max(100, Math.random() * maxY);
    
    btn.style.position = 'fixed';
    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';
    btn.style.transition = 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)';
}

// Button click handler
btn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    clickCount++;
    
    if (clickCount <= maxTeases) {
        // Show teasing message
        greeting.textContent = teaseMessages[clickCount - 1];
        greeting.style.color = '#fb7185';
        greeting.style.fontWeight = '500';
        
        // Change button text
        btn.textContent = buttonTexts[clickCount - 1];
        
        // Move the button
        if (clickCount < maxTeases) {
            moveButtonRandomly();
            hint.textContent = "She's trying to catch the button 😂";
        } else {
            // Last click - stop running and center it
            btn.style.position = 'relative';
            btn.style.left = 'auto';
            btn.style.top = 'auto';
            hint.textContent = "Okay… now you can enter 💫";
        }
        
    } else {
        // Final click → go to reasons page
        document.body.style.transition = 'opacity 0.8s';
        document.body.style.opacity = '0';
        setTimeout(() => {
            window.location.href = 'reasons.html';
        }, 800);
    }
});

// Also prevent the button from being too easy on mobile
btn.addEventListener('touchstart', function(e) {
    // small delay feel
}, {passive: true});

// Floating hearts/tulips
const floatingEmojis = ['🌷', '💖', '✨', '🖤', '💕', '🌹', '💜', '💗'];
function createFloating() {
    const el = document.createElement('div');
    el.className = 'floating';
    el.textContent = floatingEmojis[Math.floor(Math.random() * floatingEmojis.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.top = Math.random() * 100 + 'vh';
    el.style.fontSize = (Math.random() * 16 + 16) + 'px';
    document.getElementById('floatingContainer').appendChild(el);

    if (typeof gsap !== 'undefined') {
        gsap.to(el, {
            y: -window.innerHeight - 80,
            x: (Math.random() - 0.5) * 180,
            rotation: Math.random() * 360,
            duration: Math.random() * 6 + 7,
            opacity: 0.9,
            ease: "none",
            onComplete: () => el.remove()
        });
    } else {
        setTimeout(() => el.remove(), 9000);
    }
}

// Init
window.addEventListener('load', () => {
    if (typeof gsap !== 'undefined') {
        gsap.to('.title', {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "back.out(1.4)"
        });
    } else {
        document.querySelector('.title').style.opacity = '1';
    }
    
    setTimeout(typeGreeting, 600);
    setInterval(createFloating, 900);
});
