// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
let isDarkTheme = false;

function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.documentElement.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
    themeIcon.textContent = isDarkTheme ? '☀️' : '🌙';
}

themeToggle.addEventListener('click', toggleTheme);

// Particle Animation
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.background = 'rgba(255, 255, 255, 0.5)';
    particle.style.borderRadius = '50%';
    
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    
    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;
    
    document.getElementById('particles').appendChild(particle);
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = 0.5 + Math.random();
    let x = startX;
    let y = startY;
    
    function animate() {
        x += Math.cos(angle) * velocity;
        y += Math.sin(angle) * velocity;
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        if (x < 0 || x > window.innerWidth || y < 0 || y > window.innerHeight) {
            particle.remove();
        } else {
            requestAnimationFrame(animate);
        }
    }
    
    animate();
}

function initParticles() {
    setInterval(createParticle, 100);
}

initParticles();

// Mobile Menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// Success Stories Slider
const slider = document.querySelector('.success-slider');
const slides = document.querySelectorAll('.success-card');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;

function updateSlider() {
    slides.forEach((slide, index) => {
        if (index === currentSlide) {
            slide.style.display = 'flex';
        } else {
            slide.style.display = 'none';
        }
    });
}

prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
});

nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
});

// Auto-advance slider
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
}, 5000);

// Initialize slider
updateSlider();

// Statistics Animation
const stats = document.querySelectorAll('.stat-number');
const observerOptions = {
    threshold: 0.5
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateValue(entry.target, 0, target, 2000);
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

stats.forEach(stat => statsObserver.observe(stat));

function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    function update() {
        current += increment;
        element.textContent = Math.round(current);
        
        if (current < end) {
            requestAnimationFrame(update);
        } else {
            element.textContent = end;
        }
    }
    
    update();
}

// Modal
const modal = document.getElementById('consultationModal');
const consultationBtn = document.getElementById('consultationBtn');
const closeModal = document.querySelector('.close-modal');
const consultationForm = document.getElementById('consultationForm');
const bookButtons = document.querySelectorAll('.book-btn');

function openModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModalHandler() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

consultationBtn.addEventListener('click', openModal);
bookButtons.forEach(button => button.addEventListener('click', openModal));
closeModal.addEventListener('click', closeModalHandler);

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalHandler();
    }
});

// Form submission with validation
consultationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        service: document.getElementById('service').value,
        level: document.getElementById('level').value,
        goals: document.getElementById('goals').value
    };
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData);
    alert('Thank you for your interest! We will contact you soon to discuss your academic goals.');
    
    consultationForm.reset();
    closeModalHandler();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 60;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Add animation to sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    sectionObserver.observe(section);
});