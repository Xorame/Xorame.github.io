// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Форма предложения идей
document.getElementById('ideaForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('idea-name').value,
        contact: document.getElementById('idea-contact').value,
        type: document.getElementById('idea-type').value,
        text: document.getElementById('idea-text').value,
        date: new Date().toLocaleString('ru-RU')
    };
    
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
    submitBtn.disabled = true;
    
    // Создаем ссылку для отправки на почту
    const subject = `Идея для стрима: ${formData.type}`;
    const body = `
Имя: ${formData.name}
Контакты: ${formData.contact}
Тип: ${formData.type}
Дата: ${formData.date}

Идея:
${formData.text}
    `.trim();
    
    const mailtoLink = `mailto:xorame.x.x@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Открываем почтовый клиент
    setTimeout(() => {
        window.location.href = mailtoLink;
        
        // Через 3 секунды возвращаем кнопку
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Показываем сообщение об успехе
            alert('Спасибо за идею! Проверьте ваш почтовый клиент. Если письмо не открылось, отправьте его вручную на xorame.x.x@gmail.com');
        }, 3000);
    }, 1000);
});

// Анимация статистики
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                if (text.includes('+')) {
                    // Анимация для чисел с плюсом
                    const baseNumber = parseInt(text);
                    let current = 0;
                    const increment = baseNumber / 20;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= baseNumber) {
                            current = baseNumber;
                            clearInterval(timer);
                        }
                        stat.textContent = Math.floor(current) + '+';
                    }, 50);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Анимация при скролле
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.mod-card, .feature, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s, transform 0.6s';
    
    observer.observe(el);
});

// Добавляем CSS для анимации
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Тайпинг эффект в терминале
const terminalLines = [
    "whoami",
    "cat role.txt",
    "cat experience.txt", 
    "cat contacts.txt",
    "help --moderation",
    "status --online"
];

let lineIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 60;
const deletingSpeed = 40;
const pauseBetweenLines = 2000;

function typeEffect() {
    const cursor = document.querySelector('.cursor');
    const promptElement = cursor ? cursor.previousElementSibling : null;
    
    if (!promptElement || !cursor) return;
    
    const currentLine = terminalLines[lineIndex];
    
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
            setTimeout(typeEffect, 300);
        }
    }
}

// Запуск после загрузки
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 1500);
    
    // Добавляем анимацию гирлянде
    const garland = document.querySelector('.garland');
    if (garland) {
        setInterval(() => {
            garland.style.background = `linear-gradient(90deg, 
                transparent 0%, 
                ${Math.random() > 0.5 ? 'var(--primary-color)' : 'var(--accent-color)'} 10%,
                ${Math.random() > 0.5 ? 'var(--accent-color)' : 'var(--primary-color)'} 20%,
                ${Math.random() > 0.5 ? 'var(--primary-color)' : 'var(--accent-color)'} 30%,
                ${Math.random() > 0.5 ? 'var(--accent-color)' : 'var(--primary-color)'} 40%,
                ${Math.random() > 0.5 ? 'var(--primary-color)' : 'var(--accent-color)'} 50%,
                ${Math.random() > 0.5 ? 'var(--accent-color)' : 'var(--primary-color)'} 60%,
                ${Math.random() > 0.5 ? 'var(--primary-color)' : 'var(--accent-color)'} 70%,
                ${Math.random() > 0.5 ? 'var(--accent-color)' : 'var(--primary-color)'} 80%,
                ${Math.random() > 0.5 ? 'var(--primary-color)' : 'var(--accent-color)'} 90%,
                transparent 100%
            )`;
        }, 5000);
    }
});
