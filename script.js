// Плавная прокрутка
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

// Форма идей
document.getElementById('ideaForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('ideaName').value,
        contact: document.getElementById('ideaContact').value,
        type: document.getElementById('ideaType').value,
        text: document.getElementById('ideaText').value
    };
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalHTML = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
    submitBtn.disabled = true;
    
    // Создаем письмо
    const subject = `Идея для стрима от ${formData.name}`;
    const body = `Тип: ${formData.type}\nКонтакты: ${formData.contact}\n\nИдея:\n${formData.text}`;
    
    const mailtoLink = `mailto:xorame.x.x@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Открываем почтовый клиент
    setTimeout(() => {
        window.open(mailtoLink, '_blank');
        
        // Сбрасываем форму
        setTimeout(() => {
            this.reset();
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
            
            // Показываем уведомление
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <span>Спасибо за идею! Проверьте ваш почтовый клиент.</span>
            `;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--primary-color);
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                display: flex;
                align-items: center;
                gap: 10px;
                z-index: 9999;
                animation: slideIn 0.3s ease;
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }, 1000);
    }, 500);
});

// Тайпинг эффект в терминале
const terminalLines = [
    "whoami",
    "fastfetch",
    "cat about.txt",
    "help --moderation",
    "status --online"
];

let lineIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const cursor = document.querySelector('.cursor');
    const promptElement = cursor?.previousElementSibling;
    
    if (!promptElement || !cursor) return;
    
    const currentLine = terminalLines[lineIndex];
    
    if (!isDeleting) {
        if (charIndex < currentLine.length) {
            promptElement.textContent += currentLine.charAt(charIndex);
            charIndex++;
            setTimeout(typeEffect, 60);
        } else {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
        }
    } else {
        if (charIndex > 0) {
            promptElement.textContent = promptElement.textContent.slice(0, -1);
            charIndex--;
            setTimeout(typeEffect, 40);
        } else {
            isDeleting = false;
            lineIndex = (lineIndex + 1) % terminalLines.length;
            setTimeout(typeEffect, 500);
        }
    }
}

// Анимации при скролле
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Наблюдаем за карточками
document.querySelectorAll('.feature, .card, .skill-category, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s, transform 0.5s';
    observer.observe(el);
});

// Анимация статистики
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = document.querySelectorAll('.stat-number');
            stats.forEach(stat => {
                const text = stat.textContent;
                if (text.includes('+')) {
                    const num = parseInt(text);
                    let current = 0;
                    const step = num / 30;
                    
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= num) {
                            current = num;
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

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Запуск при загрузке
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 1000);
    
    // Добавляем стили для уведомлений
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
