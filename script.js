// Плавная прокрутка для навигации
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Обработка формы
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        contact: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Здесь можно добавить отправку на сервер
    // Вместо этого покажем сообщение
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Отправляется...';
    submitBtn.disabled = true;
    
    // Имитация отправки
    setTimeout(() => {
        alert('Спасибо! Сообщение отправлено. Я свяжусь с вами в течение 24 часов.');
        
        // Сброс формы
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

// Анимация при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Добавляем анимацию для карточек
document.querySelectorAll('.service-card, .project-card, .skill-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s, transform 0.5s';
    
    observer.observe(el);
    
    // Класс для анимации
    el.classList.add('animate-on-scroll');
});

// Добавляем CSS для анимации
const style = document.createElement('style');
style.textContent = `
    .animate-on-scroll.animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Тайпинг эффект в терминале
const terminalLines = [
    "whoami",
    "cat specialization.txt",
    "ls -la projects/",
    "tail -f twitch_logs.txt"
];

let lineIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 50;
const deletingSpeed = 30;
const pauseBetweenLines = 1500;

function typeEffect() {
    const currentLine = terminalLines[lineIndex];
    const promptElement = document.querySelector('.cursor').previousElementSibling;
    
    if (!isDeleting) {
        if (charIndex < currentLine.length) {
            promptElement.textContent += currentLine.charAt(charIndex);
            charIndex++;
            setTimeout(typeEffect, typingSpeed);
        } else {
            isDeleting = true;
            setTimeout(typeEffect, pauseBetweenLines);
        }
    } else {
        if (charIndex > 0) {
            promptElement.textContent = promptElement.textContent.slice(0, -1);
            charIndex--;
            setTimeout(typeEffect, deletingSpeed);
        } else {
            isDeleting = false;
            lineIndex = (lineIndex + 1) % terminalLines.length;
            setTimeout(typeEffect, 500);
        }
    }
}

// Запускаем эффект после загрузки
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 1000);
});

// Обновление статуса проектов
document.querySelectorAll('.project-status').forEach(status => {
    const text = status.textContent.trim();
    status.setAttribute('data-status', text);
});

// Анимация для статистики
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current) + (stat.textContent.includes('∞') ? '' : '+');
                }, 30);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}
