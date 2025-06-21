// Hides the loader after the page has finished loading
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1000);
});

// Adds a 'scrolled' class to the navbar when the page is scrolled
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Updates the scroll progress bar based on the scroll position
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.transform = `scaleX(${scrollPercentage / 100})`;
});

// Updates CSS variables with the current mouse position for interactive effects
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    
    document.documentElement.style.setProperty('--mouse-x', `${x}%`);
    document.documentElement.style.setProperty('--mouse-y', `${y}%`);
});

// Creates a particle effect on mouse click
document.addEventListener('click', (e) => {
    createParticle(e.clientX, e.clientY);
});

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = Math.random() * 8 + 4 + 'px';
    particle.style.height = particle.style.width;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 4000);
}

// Manages the animated background canvas
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class BackgroundParticle {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    
    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#00d4ff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// Creates the initial set of background particles
for (let i = 0; i < 50; i++) {
    particles.push(new BackgroundParticle());
}

// Animates the background particles and their connections
function animateBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((particle, i) => {
        particle.update();
        particle.draw();
        
        // Connects nearby particles with lines
        particles.slice(i + 1).forEach(otherParticle => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                ctx.save();
                ctx.globalAlpha = (1 - distance / 150) * 0.2;
                ctx.strokeStyle = '#00d4ff';
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(otherParticle.x, otherParticle.y);
                ctx.stroke();
                ctx.restore();
            }
        });
    });
    
    requestAnimationFrame(animateBackground);
}

animateBackground();

// Enables smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer to fade in sections on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Applies initial styles for fade-in effect and observes all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// Applies animation delays to the letters in the hero title
const titleLetters = document.querySelectorAll('.hero-title span');
titleLetters.forEach((letter, i) => {
    letter.style.animationDelay = `${i * 0.1}s`;
});

console.log('%c Welcome to my portfolio! 🚀 ', 'background: linear-gradient(135deg, #00d4ff, #ff00ff); color: white; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 10px;');
console.log('%c Feel free to explore the code and reach out if you want to collaborate! ', 'color: #00d4ff; font-size: 14px; padding: 5px;');