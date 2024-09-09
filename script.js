// script.js

// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Navbar highlighting
    highlightCurrentPage();
    
    // Skill bar animation
    animateSkillBars();
    
    // Form validation
    setupFormValidation();
    
    // Dark mode toggle
    // setupDarkModeToggle();
    
    // Lazy loading images
    setupLazyLoading();
    
    // Dynamic content loading
    setupDynamicContent();
});

// Function to highlight the current page in the navigation
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Function to animate skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-level-fill');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.getAttribute('data-level') + '%';
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

// Function to set up form validation
function setupFormValidation() {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm()) {
                // Simulate form submission
                console.log('Form submitted successfully');
                form.reset();
            }
        });
    }
}

// Function to validate form fields
function validateForm() {
    let isValid = true;
    const inputs = document.querySelectorAll('form input, form textarea');
    inputs.forEach(input => {
        if (input.value.trim() === '') {
            isValid = false;
            showError(input, 'This field is required');
        } else {
            clearError(input);
        }
    });
    return isValid;
}

// Function to show error message
function showError(input, message) {
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = message;
    } else {
        const error = document.createElement('span');
        error.classList.add('error-message');
        error.textContent = message;
        input.parentNode.insertBefore(error, input.nextSibling);
    }
    input.classList.add('error');
}

// Function to clear error message
function clearError(input) {
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.remove();
    }
    input.classList.remove('error');
}

// Function to set up dark mode toggle
function setupDarkModeToggle() {
    const toggle = document.createElement('button');
    toggle.textContent = 'Toggle Dark Mode';
    toggle.classList.add('dark-mode-toggle');
    document.body.appendChild(toggle);

    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}

// Function to set up lazy loading for images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Function to set up dynamic content loading
function setupDynamicContent() {
    const loadMoreBtn = document.querySelector('.load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreContent);
    }
}

// Function to load more content dynamically
function loadMoreContent() {
    // Simulating an API call to get more content
    setTimeout(() => {
        const contentContainer = document.querySelector('.dynamic-content');
        const newContent = document.createElement('div');
        newContent.textContent = 'New dynamically loaded content';
        newContent.classList.add('fade-in');
        contentContainer.appendChild(newContent);
    }, 1000);
}

// Advanced feature: Custom event system
const eventBus = {
    events: {},
    subscribe: function(eventName, fn) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(fn);
    },
    publish: function(eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(fn => fn(data));
        }
    }
};

// Example usage of the event system
eventBus.subscribe('contentLoaded', function(data) {
    console.log('Content loaded:', data);
});

// Publish an event when dynamic content is loaded
function loadMoreContent() {
    setTimeout(() => {
        const newContent = 'New dynamically loaded content';
        const contentContainer = document.querySelector('.dynamic-content');
        if (contentContainer) {
            const newDiv = document.createElement('div');
            newDiv.textContent = newContent;
            newDiv.classList.add('fade-in');
            contentContainer.appendChild(newDiv);
            eventBus.publish('contentLoaded', newContent);
        }
    }, 1000);
}
