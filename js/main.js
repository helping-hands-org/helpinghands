/* ===========================
   GLOBAL FUNCTIONS
   =========================== */

// Toggle Mobile Menu
function toggleMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (!mobileMenu) return;
    mobileMenu.classList.toggle('active');
}


// Close mobile menu when clicking on a link
document.addEventListener('DOMContentLoaded', function() {
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('mobileMenu').classList.remove('active');
        });
    });

    // Populate services on services page
    if (document.getElementById('servicesContainer')) {
        populateServices();
    }

    // Add event listeners for booking form
    const serviceType = document.getElementById('serviceType');
    const serviceDate = document.getElementById('serviceDate');
    if (serviceType) {
        serviceType.addEventListener('change', updateBookingSummary);
        serviceDate.addEventListener('change', updateBookingSummary);
        
        // Auto-select service if coming from Book Now button
        const selectedService = sessionStorage.getItem('selectedService');
        if (selectedService) {
            serviceType.value = selectedService;
            updateBookingSummary();
            sessionStorage.removeItem('selectedService');
        }
    }

    // Set minimum date to today
    if (serviceDate) {
        const today = new Date().toISOString().split('T')[0];
        serviceDate.setAttribute('min', today);
    }

    // Initialize dark mode from localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }
});

/* ===========================
   SERVICE DATA
   =========================== */

const servicesData = [
    {
        id: 1,
        name: 'Plumbing',
        category: 'Home',
        icon: '🔧',
        description: 'Professional plumbing repairs and installations',
        price: 'From ₹499',
        rating: '4.9/5',
        reviews: 2847,
        image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=300&h=300&fit=crop',
        features: ['Leak repairs', 'Pipe installation', 'Drain cleaning', 'Faucet replacement', 'Water heater service', 'Emergency repairs available 24/7']
    },
    {
        id: 2,
        name: 'Electrical',
        category: 'Home',
        icon: '⚡',
        description: 'Electrical installations and repair services',
        price: 'From ₹599',
        rating: '4.8/5',
        reviews: 3102,
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300&h=300&fit=crop',
        features: ['Wiring and installation', 'Circuit breaker repair', 'Light fixture setup', 'Power outlet replacement', 'Electrical safety inspection', 'Home rewiring']
    },
    {
        id: 3,
        name: 'Cleaning',
        category: 'Home',
        icon: '🧹',
        description: 'Deep cleaning and regular house cleaning',
        price: 'From ₹399',
        rating: '4.7/5',
        reviews: 4521,
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300&h=300&fit=crop',
        features: ['Deep cleaning', 'Weekly/monthly plans', 'Move-in cleaning', 'Window cleaning', 'Carpet shampooing', 'Eco-friendly products']
    },
    {
        id: 4,
        name: 'Carpentry',
        category: 'Home',
        icon: '🔨',
        description: 'Furniture repair and carpentry work',
        price: 'From ₹699',
        rating: '4.9/5',
        reviews: 1923,
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=300&fit=crop',
        features: ['Furniture repair', 'Cabinet installation', 'Shelving solutions', 'Door repair', 'Wood finishing', 'Custom carpentry']
    },
    {
        id: 5,
        name: 'Painting',
        category: 'Home',
        icon: '🎨',
        description: 'Interior and exterior painting services',
        price: 'From ₹549',
        rating: '4.8/5',
        reviews: 2341,
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300&h=300&fit=crop',
        features: ['Interior painting', 'Exterior painting', 'Wall texturing', 'Color consultation', 'Primer application', 'Weather protection']
    },
    {
        id: 6,
        name: 'Appliance Repair',
        category: 'Home',
        icon: '🔌',
        description: 'AC, washing machine, and appliance repair',
        price: 'From ₹799',
        rating: '4.9/5',
        reviews: 2756,
        image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=300&h=300&fit=crop',
        features: ['AC servicing', 'Refrigerator repair', 'Washing machine repair', 'Microwave repair', 'Warranty support', 'Genuine spare parts']
    },
    {
        id: 7,
        name: 'Driving',
        category: 'Vehicle',
        icon: '🚗',
        description: 'Professional driving services',
        price: 'From ₹299',
        rating: '4.8/5',
        reviews: 3845,
        image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=300&fit=crop',
        features: ['City tours', 'Airport transfers', 'Event transportation', 'Safe driving', 'Clean vehicle', 'Available 24/7']
    },
    {
        id: 8,
        name: 'Pest Control',
        category: 'Home',
        icon: '🐜',
        description: 'Safe and effective pest control',
        price: 'From ₹499',
        rating: '4.7/5',
        reviews: 1674,
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300&h=300&fit=crop',
        features: ['Termite treatment', 'Mosquito control', 'Cockroach elimination', 'Rodent control', 'Safe chemicals', 'Preventive spraying']
    }
];

/* ===========================
   SERVICES PAGE
   =========================== */

function populateServices() {
    const container = document.getElementById('servicesContainer');
    if (!container) {
        console.error('servicesContainer not found!');
        alert('Error: servicesContainer element not found!');
        return;
    }
    
    console.log('Populating services, total:', servicesData.length);
    if (!servicesData || servicesData.length === 0) {
        console.error('servicesData is empty or undefined!');
        container.innerHTML = '<p style="text-align: center; color: red;">Error: No services data available</p>';
        return;
    }
    
    container.innerHTML = '';

    servicesData.forEach(service => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.style.cursor = 'pointer';
        card.innerHTML = `
            <img src="${service.image}" alt="${service.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 15px;">
            <div class="card-icon">${service.icon}</div>
            <h3>${service.name}</h3>
            <p>${service.description}</p>
            <div class="rating" style="color: #ffc107; margin: 10px 0;">
                ⭐ ${service.rating} (${service.reviews} reviews)
            </div>
            <span class="service-price">${service.price}</span>
            <div style="display: grid; gap: 10px; margin-top: 15px;">
                <button class="btn-primary" style="width: 100%; cursor: pointer;" data-service-id="${service.id}">
                    View Details
                </button>
                <button class="btn-secondary" style="width: 100%; background: linear-gradient(135deg, var(--secondary-color), #45b7a8); border: none; color: white; padding: 12px 30px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: var(--transition);" data-service-name="${service.name}">
                    Book Now
                </button>
            </div>
        `;
        
        // Add event listeners for buttons
        const viewDetailsBtn = card.querySelector('[data-service-id]');
        const bookNowBtn = card.querySelector('[data-service-name]');
        
        viewDetailsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            viewServiceDetails(service.id);
        });
        
        bookNowBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            selectService(service.name);
        });
        
        // Card click handler for details view
        card.addEventListener('click', () => {
            viewServiceDetails(service.id);
        });
        
        container.appendChild(card);
    });
    
    console.log('Services populated, total cards:', container.children.length);
}

function filterServices() {
    const searchInput = document.getElementById('serviceSearch').value.toLowerCase();
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(searchInput) ? 'block' : 'none';
    });
}

function filterByCategory() {
    const category = document.getElementById('categoryFilter').value;
    const cards = document.querySelectorAll('.service-card');
    
    if (!category) {
        populateServices();
        return;
    }

    const filtered = servicesData.filter(service => service.category === category);
    const container = document.getElementById('servicesContainer');
    container.innerHTML = '';
    
    filtered.forEach(service => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.style.cursor = 'pointer';
        card.innerHTML = `
            <img src="${service.image}" alt="${service.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 15px;">
            <div class="card-icon">${service.icon}</div>
            <h3>${service.name}</h3>
            <p>${service.description}</p>
            <div class="rating" style="color: #ffc107; margin: 10px 0;">
                ⭐ ${service.rating} (${service.reviews} reviews)
            </div>
            <span class="service-price">${service.price}</span>
            <div style="display: grid; gap: 10px; margin-top: 15px;">
                <button class="btn-primary" style="width: 100%; cursor: pointer;" data-service-id="${service.id}">
                    View Details
                </button>
                <button class="btn-secondary" style="width: 100%; background: linear-gradient(135deg, var(--secondary-color), #45b7a8); border: none; color: white; padding: 12px 30px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: var(--transition);" data-service-name="${service.name}">
                    Book Now
                </button>
            </div>
        `;
        
        // Add event listeners for buttons
        const viewDetailsBtn = card.querySelector('[data-service-id]');
        const bookNowBtn = card.querySelector('[data-service-name]');
        
        viewDetailsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            viewServiceDetails(service.id);
        });
        
        bookNowBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            selectService(service.name);
        });
        
        // Card click handler for details view
        card.addEventListener('click', () => {
            viewServiceDetails(service.id);
        });
        
        container.appendChild(card);
    });
}

function viewServiceDetails(serviceId) {
    const service = servicesData.find(s => s.id === serviceId);
    if (service) {
        sessionStorage.setItem('selectedServiceDetail', JSON.stringify(service));
        window.location.href = 'service-details.html';
    }
}

/* ===========================
   HOME PAGE
   =========================== */

function selectService(serviceName) {
    // Store selected service in sessionStorage for booking page
    if (serviceName) {
        sessionStorage.setItem('selectedService', serviceName);
    }
    
    // Always navigate to booking page
    window.location.href = 'booking.html';
}

function searchService() {
    const searchInput = document.getElementById('serviceInput').value;
    if (searchInput) {
        window.location.href = 'services.html';
    }
}

/* ===========================
   BOOKING PAGE
   =========================== */

const servicePrices = {
    'Plumbing': '₹499 - ₹999',
    'Electrical': '₹599 - ₹1299',
    'Cleaning': '₹399 - ₹899',
    'Carpentry': '₹699 - ₹1599',
    'Painting': '₹549 - ₹1199',
    'Appliance Repair': '₹799 - ₹1899',
    'Driving': '₹299 - ₹599',
    'Pest Control': '₹499 - ₹999'
};

function updateBookingSummary() {
    const serviceType = document.getElementById('serviceType')?.value;
    const serviceDate = document.getElementById('serviceDate')?.value;
    const serviceTime = document.getElementById('serviceTime')?.value;

    if (serviceType) {
        document.getElementById('summaryService').textContent = serviceType;
        document.getElementById('summaryPrice').textContent = servicePrices[serviceType] || 'Contact for price';
    }
    if (serviceDate) {
        const date = new Date(serviceDate);
        document.getElementById('summaryDate').textContent = date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }
    if (serviceTime) {
        document.getElementById('summaryTime').textContent = serviceTime;
    }
}

function handleBooking(event) {
    event.preventDefault();

    // Validate form
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const serviceType = document.getElementById('serviceType').value;
    const serviceDate = document.getElementById('serviceDate').value;
    const serviceTime = document.getElementById('serviceTime').value;

    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

    let isValid = true;

    if (!fullName || fullName.length < 3) {
        document.getElementById('nameError').textContent = 'Please enter a valid name';
        isValid = false;
    }

    if (!validateEmail(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email';
        isValid = false;
    }

    if (!validatePhone(phone)) {
        document.getElementById('phoneError').textContent = 'Please enter a valid phone number';
        isValid = false;
    }

    if (!address) {
        document.getElementById('addressError').textContent = 'Please enter your address';
        isValid = false;
    }

    if (!serviceType) {
        document.getElementById('serviceError').textContent = 'Please select a service';
        isValid = false;
    }

    if (!serviceDate) {
        document.getElementById('dateError').textContent = 'Please select a date';
        isValid = false;
    }

    if (!serviceTime) {
        document.getElementById('timeError').textContent = 'Please select a time slot';
        isValid = false;
    }

    if (!isValid) return;

    // Show success modal
    showBookingSuccess(fullName, serviceType, serviceDate);
}

function showBookingSuccess(name, service, date) {
    const bookingId = 'BH' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    document.getElementById('bookingId').textContent = bookingId;
    document.getElementById('confirmService').textContent = service;
    document.getElementById('confirmDate').textContent = new Date(date).toLocaleDateString();
    
    const modal = document.getElementById('successModal');
    modal.style.display = 'block';

    // Reset form
    document.getElementById('bookingForm').reset();
    updateBookingSummary();
}

function closeModal() {
    document.getElementById('successModal').style.display = 'none';
}

/* ===========================
   CONTACT PAGE
   =========================== */

function handleContactSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;

    if (name && email && subject && message) {
        alert('Thank you for your message! We will get back to you soon.');
        document.getElementById('contactForm').reset();
    }
}

function toggleFAQ(element) {
    element.classList.toggle('active');
}

/* ===========================
   AUTH PAGES
   =========================== */

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validate email
    if (!validateEmail(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email';
        return;
    }

    // Validate password
    if (password.length < 6) {
        document.getElementById('passwordError').textContent = 'Password must be at least 6 characters';
        return;
    }

    // Mock login
    localStorage.setItem('user', JSON.stringify({ email, name: email.split('@')[0] }));
    alert('Login successful! Redirecting...');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 500);
}

function handleSignup(event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

    let isValid = true;

    if (!fullName || fullName.length < 3) {
        document.getElementById('nameError').textContent = 'Please enter a valid name';
        isValid = false;
    }

    if (!validateEmail(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email';
        isValid = false;
    }

    if (!validatePhone(phone)) {
        document.getElementById('phoneError').textContent = 'Please enter a valid phone number';
        isValid = false;
    }

    if (password.length < 8) {
        document.getElementById('passwordError').textContent = 'Password must be at least 8 characters';
        isValid = false;
    }

    if (password !== confirmPassword) {
        document.getElementById('confirmError').textContent = 'Passwords do not match';
        isValid = false;
    }

    if (!isValid) return;

    // Mock signup
    const user = {
        name: fullName,
        email: email,
        phone: phone
    };
    localStorage.setItem('user', JSON.stringify(user));
    alert('Account created successfully! Redirecting to login...');
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 500);
}

/* ===========================
   VALIDATION FUNCTIONS
   =========================== */

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
    return re.test(phone);
}

/* ===========================
   DARK MODE
   =========================== */

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');

    // Save preference
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
}

/* ===========================
   SCROLL ANIMATIONS
   =========================== */

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.service-card, .feature-card, .stat-item, .testimonial-card, .value-card, .trust-card, .team-card').forEach(el => {
        observer.observe(el);
    });
});

/* ===========================
   URL PARAMETERS
   =========================== */

document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const service = params.get('service');
    
    if (service && document.getElementById('serviceType')) {
        document.getElementById('serviceType').value = service;
        updateBookingSummary();
    }
});

/* ===========================
   SMOOTH SCROLL
   =========================== */

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

/* ===========================
   PREVENT FORM RESUBMISSION
   =========================== */

document.addEventListener('DOMContentLoaded', function() {
    if (window.history.replaceState) {
        window.history.replaceState(null, null, window.location.href);
    }
});
