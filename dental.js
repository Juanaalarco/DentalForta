// ============================================================================
// CONFIGURACIÓN Y DATOS
// ============================================================================
'use strict';

const CONFIG = {
    clinicName: 'Clínica Dental FORTA',
    phone: '+51902678354',
    email: 'fortasmile@gmail.com',
    address: 'Av. Manuel Villarán 1197 - Surquillo, Lima, Perú',
    promotionEndDate: new Date(new Date().getFullYear(), 0, 30) // 30 de Enero
};

const servicios = [
    {
        id: 'estetica',
        nombre: 'Estética dental',
        descripcion: 'Blanqueamiento dental, carillas de porcelana y composites para una sonrisa perfecta.',
        imagen: 'imagenes/Estetica dental.jpg'
    },
    {
        id: 'ortodoncia',
        nombre: 'Ortodoncia',
        descripcion: 'Tratamientos de ortodoncia invisible y brackets para corregir la alineación dental.',
        imagen: 'imagenes/ortodoncia.jpg'
    },
    {
        id: 'endodoncia',
        nombre: 'Endodoncia',
        descripcion: 'Tratamiento de conductos para salvar dientes dañados y eliminar el dolor.',
        imagen: 'imagenes/Endodoncia.avif'
    },
    {
        id: 'rehabilitacion',
        nombre: 'Rehabilitación oral',
        descripcion: 'Prótesis fijas y removibles para restaurar la función y estética dental.',
        imagen: 'imagenes/Rehabilitacion.jpg'
    },
    {
        id: 'cirugia',
        nombre: 'Cirugía Oral',
        descripcion: 'Extracción de cordales, cirugía de implantes y tratamientos quirúrgicos.',
        imagen: 'imagenes/Cirugia.jpg'
    },
    {
        id: 'implantes',
        nombre: 'Implantes dentales',
        descripcion: 'Reemplazo de dientes perdidos con implantes de titanio de última generación.',
        imagen: 'imagenes/implante.jpg'
    },
    {
        id: 'odontopediatria',
        nombre: 'Odontopediatría',
        descripcion: 'Cuidado dental especializado para niños y adolescentes.',
        imagen: 'imagenes/Odontopediatria.jpg'
    },
    {
        id: 'periodoncia',
        nombre: 'Periodoncia',
        descripcion: 'Prevención y tratamiento de enfermedades de las encías y tejidos de soporte.',
        imagen: 'imagenes/Periodoncia.jpg'
    }
];

const equipo = [
    {
        nombre: 'Dra. Ana Martínez',
        especialidad: 'Ortodoncista',
        descripcion: 'Especialista en ortodoncia invisible con más de 10 años de experiencia.',
        imagen: 'assets/team/dra-ana.jpg'
    },
    {
        nombre: 'Dr. Carlos López',
        especialidad: 'Cirujano Oral',
        descripcion: 'Experto en implantología y cirugía maxilofacial.',
        imagen: 'assets/team/dr-carlos.jpg'
    },
    {
        nombre: 'Dra. Sofía Ramírez',
        especialidad: 'Odontopediatra',
        descripcion: 'Especializada en el cuidado dental de niños y adolescentes.',
        imagen: 'assets/team/dra-sofia.jpg'
    },
    {
        nombre: 'Dr. Javier Torres',
        especialidad: 'Estética Dental',
        descripcion: 'Experto en carillas de porcelana y blanqueamiento dental.',
        imagen: 'assets/team/dr-javier.jpg'
    }
];

// ============================================================================
// MÓDULO PRINCIPAL
// ============================================================================
class DentalApp {
    constructor() {
        this.init();
    }

    init() {
        // Inicializar componentes
        this.setupCurrentYear();
        this.loadServices();
        this.loadTeam();
        this.setupMobileMenu();
        this.setupPromotionCountdown();
        this.setupTestimonialSlider();
        this.setupContactForm();
        this.setupHeaderScroll();
        this.setupSmoothScroll();
        this.setupBackToTop();
        this.setupChatBot();
        
        // Eventos globales
        this.setupGlobalEvents();
        
        console.log(`${CONFIG.clinicName} - Aplicación inicializada`);
    }

    // ============================================================================
    // MÉTODOS DE CONFIGURACIÓN
    // ============================================================================

    setupCurrentYear() {
        document.getElementById('currentYear').textContent = new Date().getFullYear();
    }

    setupGlobalEvents() {
        // Cerrar menús al hacer clic fuera
        document.addEventListener('click', (e) => {
            const navMenu = document.querySelector('.nav-menu');
            const menuToggle = document.getElementById('menuToggle');
            
            if (window.innerWidth <= 768 && 
                navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Prevenir envío de formulario con Enter
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName !== 'TEXTAREA' && e.key === 'Enter') {
                e.preventDefault();
            }
        });
    }

    // ============================================================================
    // COMPONENTES DE INTERFAZ
    // ============================================================================

    loadServices() {
        const servicesGrid = document.querySelector('.services-grid');
        if (!servicesGrid) return;

        servicesGrid.innerHTML = servicios.map(servicio => `
            <div class="service-card" id="${servicio.id}">
                <div class="service-image">
                    <img src="${servicio.imagen}" alt="${servicio.nombre}" loading="lazy">
                </div>
                <div class="service-content">
                    <h3>${servicio.nombre}</h3>
                    <p>${servicio.descripcion}</p>
                    <a href="#contacto" class="btn btn-secondary" style="margin-top: 10px;">
                        Solicitar información
                    </a>
                </div>
            </div>
        `).join('');
    }

    loadTeam() {
        const teamGrid = document.querySelector('.team-grid');
        if (!teamGrid) return;

        teamGrid.innerHTML = equipo.map(miembro => `
            <div class="team-member">
                <div class="member-image">
                    <img src="${miembro.imagen}" alt="${miembro.nombre}" loading="lazy">
                </div>
                <div class="member-info">
                    <h3>${miembro.nombre}</h3>
                    <p class="member-specialty">${miembro.especialidad}</p>
                    <p class="member-description">${miembro.descripcion}</p>
                </div>
            </div>
        `).join('');
    }

    setupMobileMenu() {
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.querySelector('.nav-menu');
        const submenuToggles = document.querySelectorAll('.has-submenu > a');

        if (!menuToggle || !navMenu) return;

        // Toggle menú principal
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            
            // Cambiar ícono
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // Submenús en móvil
        submenuToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const parent = toggle.parentElement;
                    parent.classList.toggle('active');
                    
                    // Actualizar atributos ARIA
                    const isExpanded = parent.classList.contains('active');
                    toggle.setAttribute('aria-expanded', isExpanded);
                }
            });
        });
    }

    closeMobileMenu() {
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.querySelector('.nav-menu');
        
        menuToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
        
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        
        // Cerrar submenús
        document.querySelectorAll('.has-submenu.active').forEach(item => {
            item.classList.remove('active');
        });
    }

    setupPromotionCountdown() {
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (!daysEl) return;

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = CONFIG.promotionEndDate - now;

            if (distance < 0) {
                daysEl.textContent = '00';
                hoursEl.textContent = '00';
                minutesEl.textContent = '00';
                secondsEl.textContent = '00';
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            daysEl.textContent = days.toString().padStart(2, '0');
            hoursEl.textContent = hours.toString().padStart(2, '0');
            minutesEl.textContent = minutes.toString().padStart(2, '0');
            secondsEl.textContent = seconds.toString().padStart(2, '0');
        };

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    setupTestimonialSlider() {
        const testimonials = document.querySelectorAll('.testimonial');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.slider-prev');
        const nextBtn = document.querySelector('.slider-next');
        
        if (!testimonials.length) return;

        let currentSlide = 0;
        let slideInterval;

        const showSlide = (index) => {
            // Validar índice
            if (index < 0) index = testimonials.length - 1;
            if (index >= testimonials.length) index = 0;

            // Ocultar todos
            testimonials.forEach(testimonial => {
                testimonial.classList.remove('active');
                testimonial.setAttribute('aria-hidden', 'true');
            });
            
            // Desactivar dots
            dots.forEach(dot => dot.classList.remove('active'));

            // Mostrar slide actual
            testimonials[index].classList.add('active');
            testimonials[index].setAttribute('aria-hidden', 'false');
            
            if (dots[index]) {
                dots[index].classList.add('active');
            }
            
            currentSlide = index;
        };

        // Event listeners para dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(slideInterval);
                showSlide(index);
                startAutoSlide();
            });
        });

        // Botones prev/next
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                clearInterval(slideInterval);
                showSlide(currentSlide - 1);
                startAutoSlide();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                clearInterval(slideInterval);
                showSlide(currentSlide + 1);
                startAutoSlide();
            });
        }

        // Auto slide
        const startAutoSlide = () => {
            clearInterval(slideInterval);
            slideInterval = setInterval(() => {
                showSlide(currentSlide + 1);
            }, 5000);
        };

        // Iniciar
        showSlide(0);
        startAutoSlide();

        // Pausar en hover
        const slider = document.querySelector('.testimonials-slider');
        if (slider) {
            slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
            slider.addEventListener('mouseleave', startAutoSlide);
        }
    }

    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        const formMessage = document.getElementById('formMessage');

        if (!contactForm) return;

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Validación
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                this.showFormMessage('Por favor, completa todos los campos obligatorios.', 'error');
                return;
            }

            if (!this.validateEmail(email)) {
                this.showFormMessage('Por favor, ingresa un correo electrónico válido.', 'error');
                return;
            }

            // Simular envío
            this.showFormMessage('Enviando mensaje...', 'info');

            try {
                // En producción, reemplazar con fetch a tu backend
                await this.simulateApiCall();
                
                this.showFormMessage('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.', 'success');
                contactForm.reset();
                
                // Ocultar mensaje después de 5 segundos
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);

            } catch (error) {
                this.showFormMessage('Error al enviar el mensaje. Por favor, intenta nuevamente.', 'error');
            }
        });
    }

    showFormMessage(text, type) {
        const formMessage = document.getElementById('formMessage');
        if (!formMessage) return;

        formMessage.textContent = text;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        formMessage.focus();
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    async simulateApiCall() {
        return new Promise((resolve) => {
            setTimeout(resolve, 1500);
        });
    }

    setupHeaderScroll() {
        const header = document.querySelector('.header');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#' || href === '#!') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Cerrar menú móvil si está abierto
                    if (window.innerWidth <= 768) {
                        this.closeMobileMenu();
                    }
                }
            });
        });
    }

    setupBackToTop() {
        const backToTop = document.querySelector('.back-to-top');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
    }

    // ============================================================================
    // ASISTENTE VIRTUAL (CHATBOT) - PRIORIDAD MÁXIMA
    // ============================================================================

    setupChatBot() {
        const chatFab = document.getElementById('chat-fab');
        const chatVentana = document.getElementById('chat-ventana');
        const cerrarChatBtn = document.getElementById('cerrar-chat');
        const chatCuerpo = document.getElementById('chat-cuerpo');
        const chatEntrada = document.getElementById('chat-entrada');
        const enviarMensajeBtn = document.getElementById('enviar-mensaje');

        if (!chatFab) return;

        // Estado del chat
        let isChatOpen = false;

        const toggleChat = () => {
            isChatOpen = !isChatOpen;
            
            if (isChatOpen) {
                chatVentana.classList.add('abierto');
                chatVentana.removeAttribute('hidden');
                chatEntrada.focus();
                chatFab.setAttribute('aria-expanded', 'true');
            } else {
                chatVentana.classList.remove('abierto');
                setTimeout(() => chatVentana.setAttribute('hidden', ''), 300);
                chatFab.setAttribute('aria-expanded', 'false');
            }
        };

        const addMessage = (text, sender) => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `mensaje ${sender}`;
            messageDiv.innerHTML = `<p>${this.escapeHtml(text)}</p>`;
            chatCuerpo.appendChild(messageDiv);
            chatCuerpo.scrollTop = chatCuerpo.scrollHeight;
        };

        const getBotResponse = (userMessage) => {
            const msg = userMessage.toLowerCase();
            
            const responses = {
                greetings: ['¡Hola! Soy el asistente virtual de Clínica Dental FORTA. ¿En qué puedo ayudarte hoy?',
                           '¡Buenos días! ¿Cómo puedo asistirte?',
                           '¡Hola! ¿En qué te puedo ayudar hoy?'],
                
                services: 'Ofrecemos: Ortodoncia, Implantes, Estética Dental, Endodoncia, Cirugía Oral, Rehabilitación, Odontopediatría y Periodoncia.',
                
                schedule: 'Nuestro horario: Lunes a Viernes 9:00 am - 8:00 pm, Sábados 9:00 am - 2:00 pm.',
                
                location: `Estamos en: ${CONFIG.address}`,
                
                phone: `Puedes llamarnos al: ${CONFIG.phone}`,
                
                email: `Escríbenos a: ${CONFIG.email}`,
                
                appointment: 'Para agendar una cita, puedes llamarnos, escribirnos al WhatsApp 902 678 354 o completar el formulario de contacto.',
                
                thanks: '¡De nada! ¿Hay algo más en lo que pueda ayudarte?',
                
                goodbye: '¡Que tengas un excelente día! Esperamos verte pronto en Clínica Dental FORTA.',
                
                default: `Entiendo que preguntas sobre: "${userMessage}". Te recomiendo contactarnos directamente para una respuesta precisa al correo electrónico fortasmile@gmail.com. ¿Te gustaría que te ayude con algo más?`
            };

            if (msg.includes('hola') || msg.includes('buenos') || msg.includes('buenas')) {
                return responses.greetings[Math.floor(Math.random() * responses.greetings.length)];
            }
            if (msg.includes('servicio') || msg.includes('tratamiento')) {
                return responses.services;
            }
            if (msg.includes('horario') || msg.includes('hora') || msg.includes('abierto')) {
                return responses.schedule;
            }
            if (msg.includes('dirección') || msg.includes('ubicación') || msg.includes('mapa')) {
                return responses.location;
            }
            if (msg.includes('teléfono') || msg.includes('llamar') || msg.includes('número')) {
                return responses.phone;
            }
            if (msg.includes('correo') || msg.includes('email') || msg.includes('mail')) {
                return responses.email;
            }
            if (msg.includes('cita') || msg.includes('agendar') || msg.includes('consulta')) {
                return responses.appointment;
            }
            if (msg.includes('gracias')) {
                return responses.thanks;
            }
            if (msg.includes('adiós') || msg.includes('chao') || msg.includes('hasta luego')) {
                return responses.goodbye;
            }
            
            return responses.default;
        };

        const handleSendMessage = () => {
            const messageText = chatEntrada.value.trim();
            if (!messageText) return;

            // Mensaje del usuario
            addMessage(messageText, 'usuario');
            chatEntrada.value = '';

            // Respuesta del bot con delay
            setTimeout(() => {
                const botResponse = getBotResponse(messageText);
                addMessage(botResponse, 'bot');
            }, 800);
        };

        // Event Listeners
        chatFab.addEventListener('click', toggleChat);
        cerrarChatBtn.addEventListener('click', toggleChat);
        
        chatEntrada.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSendMessage();
        });
        
        enviarMensajeBtn.addEventListener('click', handleSendMessage);

        // Cerrar con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isChatOpen) {
                toggleChat();
            }
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// ============================================================================
// INICIALIZACIÓN
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Cargar imágenes críticas
    const preloadImages = [
        'imagenes/Clinica dental FORTA.png',
        'imagenes/Promocion.jpg',
        'imagenes/Interior de la clínica.jpg'
    ];

    preloadImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Iniciar aplicación
    new DentalApp();
});

// Service Worker para PWA (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(error => {
            console.log('Service Worker registration failed:', error);
        });
    });
}

 // Corrección de error

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    navigator.serviceWorker.register('service-worker.js')
        .then(registration => {
            console.log('Service Worker registrado:', registration);
        })
        .catch(error => {
            console.error('Error al registrar el Service Worker:', error);
        });
} else {
    console.warn('Service Worker no soportado o ejecutándose desde file://');
}
