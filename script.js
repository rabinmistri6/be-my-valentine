// ================================
// Valentine's Day Website Script
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
const scrollIndicator = document.getElementById('scrollIndicator');
const gallerySection = document.getElementById('gallerySection');
const confettiCanvas = document.getElementById('confettiCanvas');
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
const heartsContainer = document.getElementById('heartsContainer');

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
    // Add 'moving' class to make it absolutely positioned
    if (!noBtn.classList.contains('moving')) {
        noBtn.classList.add('moving');
    }
    
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    
    // Calculate safe boundaries with more padding to ensure button stays visible
    const padding = 30; // Increase padding for safety
    const maxX = windowWidth - btnWidth - padding;
    const maxY = windowHeight - btnHeight - padding;
    const minX = padding;
    const minY = padding;
    
    // Ensure we have valid boundaries
    if (maxX <= minX || maxY <= minY) {
        console.log('Window too small for button movement');
        return;
    }
    
    // Generate random position within safe boundaries
    let randomX = Math.floor(Math.random() * (maxX - minX)) + minX;
    let randomY = Math.floor(Math.random() * (maxY - minY)) + minY;
    
    // Double-check boundaries (safety net)
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
// Move on hover (desktop)
noBtn.addEventListener('mouseenter', moveNoButton);

// Move on touch (mobile)
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Move on click attempt
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
            
            // Reset if out of bounds
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
// Swipeable Cards Functionality (WITH ARROWS)
// ================================
let cardsArray = [];
let currentCardNumber = 0;
let totalCardsCount = 0;

function initializeCardStack() {
    const cardStackElement = document.querySelector('.card-stack');
    if (!cardStackElement) return;
    
    cardsArray = Array.from(cardStackElement.querySelectorAll('.card'));
    totalCardsCount = cardsArray.length;
    currentCardNumber = 0;
    
    if (cardsArray.length === 0) return;
    
    // Update counter
    updateCardCounter();
    
    // Set up arrow button listeners
    const leftArrow = document.getElementById('cardArrowLeft');
    const rightArrow = document.getElementById('cardArrowRight');
    
    if (leftArrow) {
        leftArrow.addEventListener('click', () => moveCardLeft());
    }
    
    if (rightArrow) {
        rightArrow.addEventListener('click', () => moveCardRight());
    }
    
    // Optional: Keep swipe functionality for mobile
    cardsArray.forEach((card) => {
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;
        
        card.addEventListener('touchstart', (e) => {
            if (!isTopCard(card)) return;
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        card.addEventListener('touchmove', (e) => {
            if (!isTopCard(card)) return;
            touchEndX = e.touches[0].clientX;
            touchEndY = e.touches[0].clientY;
        }, { passive: true });
        
        card.addEventListener('touchend', () => {
            if (!isTopCard(card)) return;
            
            const deltaX = touchEndX - touchStartX;
            const deltaY = Math.abs(touchEndY - touchStartY);
            
            // Only swipe if horizontal movement is significant and vertical is minimal
            if (Math.abs(deltaX) > 80 && deltaY < 50) {
                if (deltaX > 0) {
                    moveCardRight();
                } else {
                    moveCardLeft();
                }
            }
        });
    });
}

function isTopCard(card) {
    return cardsArray.indexOf(card) === currentCardNumber;
}

function moveCardRight() {
    if (currentCardNumber >= cardsArray.length) return;
    
    const currentCard = cardsArray[currentCardNumber];
    if (!currentCard) return;
    
    currentCard.classList.add('removing', 'swipe-right');
    
    setTimeout(() => {
        currentCard.classList.add('removed');
        currentCardNumber++;
        updateCardCounter();
        reorganizeCards();
    }, 600);
}

function moveCardLeft() {
    if (currentCardNumber >= cardsArray.length) return;
    
    const currentCard = cardsArray[currentCardNumber];
    if (!currentCard) return;
    
    currentCard.classList.add('removing', 'swipe-left');
    
    setTimeout(() => {
        currentCard.classList.add('removed');
        currentCardNumber++;
        updateCardCounter();
        reorganizeCards();
    }, 600);
}

function reorganizeCards() {
    // Update data-card attributes for remaining cards
    cardsArray.forEach((card, index) => {
        if (index >= currentCardNumber) {
            const position = index - currentCardNumber + 1;
            card.setAttribute('data-card', position);
        }
    });
    
    // Disable arrows if all cards are gone
    updateArrowStates();
}

function updateCardCounter() {
    const currentCardSpan = document.getElementById('currentCard');
    const totalCardsSpan = document.getElementById('totalCards');
    
    if (currentCardSpan) {
        currentCardSpan.textContent = Math.min(currentCardNumber + 1, totalCardsCount);
    }
    
    if (totalCardsSpan) {
        totalCardsSpan.textContent = totalCardsCount;
    }
}

function updateArrowStates() {
    const leftArrow = document.getElementById('cardArrowLeft');
    const rightArrow = document.getElementById('cardArrowRight');
    
    // Disable both arrows when all cards are gone
    if (currentCardNumber >= cardsArray.length) {
        if (leftArrow) leftArrow.disabled = true;
        if (rightArrow) rightArrow.disabled = true;
    }
}

// Initialize cards when page 2 becomes active
const page2Observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.target.classList.contains('active')) {
            setTimeout(initializeCardStack, 100);
        }
    });
});

const page2Element = document.getElementById('page2');
if (page2Element) {
    page2Observer.observe(page2Element, {
        attributes: true,
        attributeFilter: ['class']
    });
    
    if (page2Element.classList.contains('active')) {
        setTimeout(initializeCardStack, 100);
    }
}
// ================================
// Scroll to Gallery
// ================================
scrollIndicator.addEventListener('click', () => {
    gallerySection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
});

// ================================
// Music Toggle
// ================================
let isMusicPlaying = false;

musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
        musicToggle.textContent = '🎵';
        isMusicPlaying = false;
    } else {
        // Only try to play if audio source is set
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

// ================================
// Photo Gallery Animations
// ================================
// Animate photos when they come into view
const photoItems = document.querySelectorAll('.photo-item');

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const photoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, observerOptions);

photoItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    photoObserver.observe(item);
});

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
 * 1. PHOTOS:
 *    - Replace placeholder images in index.html
 *    - Find each <img src="https://via.placeholder.com...">
 *    - Replace with your own image URLs or local paths
 *    - Example: <img src="photos/our-first-date.jpg" alt="Our First Date">
 * 
 * 2. PHOTO CAPTIONS:
 *    - Edit the text inside <p class="photo-caption">...</p>
 *    - Keep them short and sweet!
 * 
 * 3. MESSAGES:
 *    - Edit beggingMessages array at the top of this file
 *    - Add your own playful messages
 *    - The more creative, the better!
 * 
 * 4. CELEBRATION GIF:
 *    - In index.html, find <img id="celebrationGif">
 *    - Replace the src with your favorite romantic GIF
 *    - Try searching on Giphy.com for "romantic celebration"
 * 
 * 5. MUSIC (Optional):
 *    - Add a romantic song file to your project folder
 *    - In index.html, uncomment the <source> line in <audio id="bgMusic">
 *    - Update the src to your music file: <source src="your-song.mp3" type="audio/mpeg">
 * 
 * 6. COLORS:
 *    - Edit CSS variables in style.css (lines 8-16)
 *    - Change --primary-pink, --heart-red, etc.
 * 
 * 7. LOVE MESSAGE:
 *    - In index.html, find <p class="love-message">
 *    - Write your own heartfelt message!
 */

// ================================
// DEPLOYMENT TO GITHUB PAGES
// ================================
/*
 * STEP-BY-STEP DEPLOYMENT GUIDE:
 * 
 * 1. Create a GitHub account (if you don't have one)
 *    - Go to github.com and sign up
 * 
 * 2. Create a new repository
 *    - Click "+" in top right → "New repository"
 *    - Name it something like "valentine-surprise"
 *    - Make it Public
 *    - Click "Create repository"
 * 
 * 3. Upload your files
 *    - Click "uploading an existing file"
 *    - Drag and drop: index.html, style.css, script.js
 *    - Add your photos folder too!
 *    - Click "Commit changes"
 * 
 * 4. Enable GitHub Pages
 *    - Go to repository Settings
 *    - Scroll to "Pages" in left sidebar
 *    - Under "Source", select "main" branch
 *    - Click Save
 * 
 * 5. Get your URL
 *    - After a few minutes, your site will be live at:
 *    - https://YOUR-USERNAME.github.io/valentine-surprise
 *    - Share this link with your girlfriend!
 * 
 * 6. IMPORTANT: Test first!
 *    - Open index.html in your browser before deploying
 *    - Make sure all photos load correctly
 *    - Check that everything works on mobile too
 * 
 * TIPS:
 * - Keep all files in the same folder
 * - If using local photos, create a "photos" folder
 * - Image files should be .jpg or .png
 * - File names should have no spaces (use dashes: my-photo.jpg)
 */
