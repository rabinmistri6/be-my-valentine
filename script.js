// ================================
// Valentine's Day Website Script
// REDESIGNED - Envelope & Flippable Gallery
// ================================

// Begging messages that appear when No button is avoided
const beggingMessages = [
    "Hey… that's not nice 🥺",
    "Are you sure?? 😭",
    "My heart can't take this 💔",
    "Just click yes already 😘",
    "I promise snacks and hugs 🍫🤗",
    "Please? Pretty please? 🥹",
    "You're breaking my heart here... 💔",
    "Don't make me cry! 😢",
    "I'll even do the dishes! 🍽️",
    "What if I said... I love you? ❤️",
    "Come on, you know you want to! 😊",
    "I'll give you all my fries! 🍟",
    "This is emotional blackmail! 😤",
    "Fine, I'll stop... just kidding! 😜",
    "You're just making this harder! 😩"
];

let currentMessageIndex = 0;

// ================================
// DOM Elements
// ================================
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const beggingMessage = document.getElementById('beggingMessage');
const confettiCanvas = document.getElementById('confettiCanvas');
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
const heartsContainer = document.getElementById('heartsContainer');

// Envelope elements
const envelope = document.getElementById('envelope');
const letter = document.getElementById('letter');
const closeLetterBtn = document.getElementById('closeLetterBtn');

// Photo card elements
const photoCards = document.querySelectorAll('.photo-card');

// ================================
// Floating Hearts Background
// ================================
function createFloatingHearts() {
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💓', '💝'];
    
    // Create 15 floating hearts
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
            heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
            heart.style.animationDelay = Math.random() * 2 + 's';
            heartsContainer.appendChild(heart);
            
            // Remove heart after animation completes
            setTimeout(() => {
                heart.remove();
            }, 10000);
        }, i * 600);
    }
    
    // Continue creating hearts every 8 seconds
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 10000);
    }, 8000);
}

// ================================
// No Button Movement Logic
// ================================
function moveNoButton() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    
    // Add 'moving' class to make it absolutely positioned
    if (!noBtn.classList.contains('moving')) {
        noBtn.classList.add('moving');
    }
    
    // Calculate safe boundaries with more padding
    const padding = 30;
    const maxX = windowWidth - btnWidth - padding;
    const maxY = windowHeight - btnHeight - padding;
    const minX = padding;
    const minY = padding;
    
    // Ensure we have valid boundaries
    if (maxX <= minX || maxY <= minY) {
        return;
    }
    
    // Generate random position within safe boundaries
    let randomX = Math.floor(Math.random() * (maxX - minX)) + minX;
    let randomY = Math.floor(Math.random() * (maxY - minY)) + minY;
    
    // Double-check boundaries
    randomX = Math.max(minX, Math.min(randomX, maxX));
    randomY = Math.max(minY, Math.min(randomY, maxY));
    
    // Apply new position
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    
    // Show begging message
    showBeggingMessage();
}

// ================================
// Begging Message Display
// ================================
function showBeggingMessage() {
    // Hide current message
    beggingMessage.classList.remove('show');
    
    setTimeout(() => {
        // Update message text
        beggingMessage.textContent = beggingMessages[currentMessageIndex];
        
        // Show message with animation
        beggingMessage.classList.add('show');
        
        // Move to next message
        currentMessageIndex = (currentMessageIndex + 1) % beggingMessages.length;
    }, 200);
}

// ================================
// No Button Event Listeners
// ================================
noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
});

// ================================
// Yes Button - Transition to Page 2
// ================================
yesBtn.addEventListener('click', () => {
    // Trigger confetti
    triggerConfetti();
    
    // Transition to page 2
    setTimeout(() => {
        page1.classList.remove('active');
        
        setTimeout(() => {
            page1.style.display = 'none';
            page2.style.display = 'flex';
            
            setTimeout(() => {
                page2.classList.add('active');
            }, 50);
        }, 600);
    }, 500);
});

// ================================
// Confetti Animation
// ================================
function triggerConfetti() {
    confettiCanvas.classList.add('active');
    const ctx = confettiCanvas.getContext('2d');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    
    const confettiColors = ['#FF6B9D', '#FFB6C1', '#FF1744', '#FFC0CB', '#FF69B4'];
    const confettiPieces = [];
    const confettiCount = 150;
    
    // Confetti piece class
    class ConfettiPiece {
        constructor() {
            this.x = Math.random() * confettiCanvas.width;
            this.y = Math.random() * confettiCanvas.height - confettiCanvas.height;
            this.size = Math.random() * 8 + 4;
            this.speedY = Math.random() * 3 + 2;
            this.speedX = Math.random() * 2 - 1;
            this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
        }
        
        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;
            
            if (this.y > confettiCanvas.height) {
                this.y = -20;
                this.x = Math.random() * confettiCanvas.width;
            }
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            
            // Draw heart shape
            const size = this.size;
            ctx.beginPath();
            ctx.moveTo(0, size / 4);
            ctx.bezierCurveTo(-size / 2, -size / 4, -size, size / 4, 0, size);
            ctx.bezierCurveTo(size, size / 4, size / 2, -size / 4, 0, size / 4);
            ctx.fill();
            
            ctx.restore();
        }
    }
    
    // Create confetti pieces
    for (let i = 0; i < confettiCount; i++) {
        confettiPieces.push(new ConfettiPiece());
    }
    
    // Animation loop
    let animationId;
    function animateConfetti() {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        
        confettiPieces.forEach(piece => {
            piece.update();
            piece.draw();
        });
        
        animationId = requestAnimationFrame(animateConfetti);
    }
    
    animateConfetti();
    
    // Stop confetti after 5 seconds
    setTimeout(() => {
        cancelAnimationFrame(animationId);
        confettiCanvas.classList.remove('active');
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }, 5000);
}

// ================================
// Envelope Opening Functionality
// ================================
if (envelope) {
    envelope.addEventListener('click', () => {
        // Open envelope
        envelope.classList.add('opening');
        
        // Show letter after envelope opens
        setTimeout(() => {
            letter.classList.add('show');
        }, 600);
    });
}

// Close letter button
if (closeLetterBtn) {
    closeLetterBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        letter.classList.remove('show');
        
        // Reset envelope after letter closes
        setTimeout(() => {
            envelope.classList.remove('opening');
        }, 600);
    });
}

// Close letter when clicking outside
if (letter) {
    letter.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// ================================
// Flippable Photo Cards
// ================================
photoCards.forEach((card) => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});

// ================================
// Music Toggle
// ================================
let isMusicPlaying = false;

if (musicToggle) {
    musicToggle.addEventListener('click', () => {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicToggle.classList.remove('playing');
            musicToggle.textContent = '🎵';
            isMusicPlaying = false;
        } else {
            if (bgMusic.src) {
                bgMusic.play().catch(err => {
                    console.log('Music play failed:', err);
                });
                musicToggle.classList.add('playing');
                musicToggle.textContent = '🎶';
                isMusicPlaying = true;
            }
        }
    });
}

// ================================
// Initialize on Page Load
// ================================
window.addEventListener('load', () => {
    createFloatingHearts();
});

// ================================
// Resize Handler for Confetti Canvas
// ================================
window.addEventListener('resize', () => {
    if (confettiCanvas.classList.contains('active')) {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    }
});

// ================================
// CUSTOMIZATION GUIDE
// ================================
/*
 * HOW TO CUSTOMIZE THIS WEBSITE:
 * 
 * 1. LOVE LETTER MESSAGE:
 *    - In index.html, find the <div class="letter-text"> section
 *    - Replace all the <p> paragraphs with your own heartfelt message
 *    - Edit the signature at the bottom
 * 
 * 2. PHOTOS:
 *    - Replace placeholder images in index.html
 *    - Find each <img src="https://via.placeholder.com...">
 *    - Replace with your own image URLs or local paths
 *    - Example: <img src="photos/our-first-date.jpg" alt="Our First Date">
 * 
 * 3. PHOTO MESSAGES (on flip side):
 *    - Find each <div class="photo-card-back"> section
 *    - Edit the <h3> title and <p> message
 *    - Make them personal and meaningful!
 * 
 * 4. ADD MORE PHOTOS:
 *    - Copy the entire <!-- Photo Card X --> section
 *    - Paste it before the closing </div> of photo-grid
 *    - Update the image and messages
 * 
 * 5. CELEBRATION GIF:
 *    - In index.html, find <img id="celebrationGif">
 *    - Replace the src with your favorite romantic GIF
 * 
 * 6. BEGGING MESSAGES:
 *    - Edit beggingMessages array at the top of this file
 *    - Add your own playful messages
 * 
 * 7. MUSIC (Optional):
 *    - Add a romantic song file to your project folder
 *    - In index.html, uncomment the <source> line in <audio id="bgMusic">
 *    - Update the src to your music file
 * 
 * 8. COLORS:
 *    - Edit CSS variables in style.css (lines 8-16)
 *    - Change --primary-pink, --heart-red, etc.
 */
