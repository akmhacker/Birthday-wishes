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

let currentIndex = 0;
const container = document.getElementById('reasons-container');
const nextBtn = document.getElementById('nextBtn');
const counter = document.getElementById('counter');

// Show next reason
function showNextReason() {
    if (currentIndex < reasons.length) {
        const reason = reasons[currentIndex];
        
        // Create card
        const card = document.createElement('div');
        card.className = 'reason-card';
        card.innerHTML = `<div class="reason-text"><span class="emoji">${reason.emoji}</span> ${reason.text}</div>`;
        
        container.appendChild(card);
        
        // Update counter
        currentIndex++;
        counter.textContent = `Reason ${currentIndex} of ${reasons.length}`;
        
        // Change button text when finished
        if (currentIndex === reasons.length) {
            nextBtn.textContent = "See Our Memories 💫🌷";
            nextBtn.classList.add('final');
        }
    } else {
        // Go to memories page
        window.location.href = 'memories.html';
    }
}

// Button click
nextBtn.addEventListener('click', function() {
    showNextReason();
});

// Show first reason automatically
setTimeout(function() {
    showNextReason();
}, 400);
