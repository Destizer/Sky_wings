// Мобильное меню
const burger = document.querySelector('.burger');
const navMenu = document.querySelector('.nav-menu');

if (burger) {
    burger.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        // Анимация бургера
        burger.classList.toggle('active');
    });

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            burger.classList.remove('active');
        });
    });
}

// Валидация формы поиска
const searchForm = document.getElementById('searchForm');

if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const from = document.getElementById('from').value;
        const to = document.getElementById('to').value;
        const departure = document.getElementById('departure').value;
        const returnDate = document.getElementById('return').value;
        const passengers = document.getElementById('passengers').value;
        const flightClass = document.getElementById('class').value;

        // Проверка на заполненность обязательных полей
        if (!from || !to || !departure) {
            alert('Пожалуйста, заполните все обязательные поля');
            return;
        }

        // Проверка дат
        const departureDate = new Date(departure);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (departureDate < today) {
            alert('Дата вылета не может быть в прошлом');
            return;
        }

        if (returnDate) {
            const returnDateTime = new Date(returnDate);
            if (returnDateTime < departureDate) {
                alert('Дата возврата не может быть раньше даты вылета');
                return;
            }
        }

        // Если все проверки пройдены
        alert(`Поиск билетов:\nОткуда: ${from}\nКуда: ${to}\nВылет: ${departure}\nВозврат: ${returnDate || 'не указана'}\nПассажиры: ${passengers}\nКласс: ${flightClass}`);

        // Здесь можно добавить отправку данных на сервер
    });
}

// Установка минимальной даты для полей ввода дат
const today = new Date().toISOString().split('T')[0];
const departureInput = document.getElementById('departure');
const returnInput = document.getElementById('return');

if (departureInput) {
    departureInput.setAttribute('min', today);
}

if (returnInput) {
    returnInput.setAttribute('min', today);
}

// Обновление минимальной даты возврата при выборе даты вылета
if (departureInput && returnInput) {
    departureInput.addEventListener('change', () => {
        returnInput.setAttribute('min', departureInput.value);
    });
}

// Плавная прокрутка для якорных ссылок
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

// Анимация появления элементов при прокрутке
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

// Наблюдаем за карточками направлений и функций
document.querySelectorAll('.destination-card, .feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Липкий header с изменением прозрачности
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        header.style.backdropFilter = 'none';
    }

    lastScroll = currentScroll;
});

// Кнопки "Подробнее" для направлений
document.querySelectorAll('.btn-small').forEach(button => {
    button.addEventListener('click', function () {
        const card = this.closest('.destination-card');
        const destination = card.querySelector('h3').textContent;
        const price = card.querySelector('.price').textContent;

        alert(`Подробнее о направлении:\n${destination}\nЦена: ${price}\n\nЗдесь будет подробная информация о направлении`);
    });
});

// Динамическое изменение цвета header при наведении на разные секции
const sections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionIndex = Array.from(sections).indexOf(entry.target);
            // Можно добавить дополнительную логику для изменения стилей
        }
    });
}, {
    threshold: 0.5
});

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Добавление эффекта печати для заголовка hero
const heroTitle = document.querySelector('.hero-content h1');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;

    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };

    // Запускаем эффект после загрузки страницы
    setTimeout(typeWriter, 500);
}

// Сохранение данных формы в localStorage для восстановления при возврате на страницу
if (searchForm) {
    // Восстановление данных при загрузке
    const savedData = localStorage.getItem('searchFormData');
    if (savedData) {
        const data = JSON.parse(savedData);
        document.getElementById('from').value = data.from || '';
        document.getElementById('to').value = data.to || '';
        document.getElementById('departure').value = data.departure || '';
        document.getElementById('return').value = data.return || '';
        document.getElementById('passengers').value = data.passengers || '1';
        document.getElementById('class').value = data.class || 'economy';
    }

    // Сохранение данных при изменении
    searchForm.addEventListener('input', () => {
        const formData = {
            from: document.getElementById('from').value,
            to: document.getElementById('to').value,
            departure: document.getElementById('departure').value,
            return: document.getElementById('return').value,
            passengers: document.getElementById('passengers').value,
            class: document.getElementById('class').value
        };
        localStorage.setItem('searchFormData', JSON.stringify(formData));
    });
}

console.log('Скрипты загружены успешно!');