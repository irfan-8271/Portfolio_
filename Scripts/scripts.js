// Mode Toggle with New Modes & Local Storage
const modeToggle = document.getElementById('mode-toggle');
const body = document.body;

const modes = [
    { name: "malware-mode", icon: "fa-biohazard", primary: "#00ff99", background: "#161b22" }, // Green & Dark Blue
    { name: "pentester-mode", icon: "fa-skull", primary: "#ff4d4d", background: "#22272e" }, // Red & Dark Gray
    { name: "software-mode", icon: "fa-code", primary: "#3498db", background: "#2c3e50" }, // Blue & Navy
    { name: "cyberpunk-mode", icon: "fa-gamepad", primary: "#ff007f", background: "#121212" }, // Neon Pink & Black
    { name: "hacker-mode", icon: "fa-terminal", primary: "#39ff14", background: "#000000" }, // Bright Green & Black
    { name: "red-team-mode", icon: "fa-user-secret", primary: "#ff3333", background: "#1a1a1a" }, // Red & Dark Black
    { name: "blue-team-mode", icon: "fa-shield-alt", primary: "#0066ff", background: "#1c2331" }, // Deep Blue & Dark Navy
    { name: "osint-mode", icon: "fa-search", primary: "#ffcc00", background: "#14213d" }, // Yellow & Deep Blue
    { name: "forensics-mode", icon: "fa-microscope", primary: "#00e1ff", background: "#1b1b1b" }, // Cyan & Dark Gray
    { name: "exploitdev-mode", icon: "fa-bug", primary: "#ff5500", background: "#101820" }, // Orange & Deep Navy
    { name: "terminal-mode", icon: "fa-desktop", primary: "#33ff33", background: "#0a0a0a" }, // Green & Very Dark Gray
    { name: "stealth-mode", icon: "fa-user-ninja", primary: "#5c677d", background: "#131417" }, // Grayish Blue & Dark
    { name: "cve-mode", icon: "fa-exclamation-triangle", primary: "#ff1100", background: "#2a1e1e" }, // Deep Red & Dark Brown
    { name: "re-mode", icon: "fa-tools", primary: "#00eaff", background: "#1e1b2d" }, // Electric Blue & Dark Purple
    { name: "ctf-mode", icon: "fa-flag", primary: "#ff00ff", background: "#121826" }, // Purple & Dark Blue
    { name: "aiml-mode", icon: "fa-robot", primary: "#1abc9c", background: "#1a1a2e" }, // Turquoise & Deep Blue
    { name: "space-mode", icon: "fa-moon", primary: "#bb86fc", background: "#0b0f1e" }, // Soft Purple & Deep Space
    { name: "darknet-mode", icon: "fa-mask", primary: "#ff0066", background: "#0f0f0f" }, // Neon Pink & Deep Black
];

// Retrieve last selected mode from localStorage or default to software-mode
let currentModeIndex = parseInt(localStorage.getItem('modeIndex')) || 2;

// Function to apply mode
function applyMode(index) {
    const { name, icon, primary, background } = modes[index];
    body.className = name;
    body.style.setProperty('--primary-color', primary);
    body.style.setProperty('--background-color', background);
    modeToggle.innerHTML = `<i class="fas ${icon}"></i>`;
    
    // Save mode preference
    localStorage.setItem('modeIndex', index);
    
    // Update the header and footer colors based on the current mode
    const headerBg = background ? adjustColorBrightness(background, 10) : background;
    const footerBg = background ? adjustColorBrightness(background, -10) : background;
    
    body.style.setProperty('--header-bg', headerBg);
    body.style.setProperty('--footer-bg', footerBg);
}

// Function to adjust color brightness
function adjustColorBrightness(hex, percent) {
    // Convert hex to RGB
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);

    // Adjust brightness
    r = Math.min(255, Math.max(0, r + percent));
    g = Math.min(255, Math.max(0, g + percent));
    b = Math.min(255, Math.max(0, b + percent));

    // Convert back to hex
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Initialize mode on page load
document.addEventListener('DOMContentLoaded', function() {
    applyMode(currentModeIndex);
    
    // Create overlay element for mobile menu
    const menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    document.body.appendChild(menuOverlay);
    
    // Now that we've added the overlay to DOM, set up the event listener
    setupMenuInteractions();
    
    // Initialize scroll listener for header effects
    setupScrollEffects();
});

// Toggle mode on button click
if (modeToggle) {
    modeToggle.addEventListener('click', () => {
        currentModeIndex = (currentModeIndex + 1) % modes.length;
        applyMode(currentModeIndex);

        // Smooth button animation
        modeToggle.style.transform = 'scale(1.2)';
        setTimeout(() => modeToggle.style.transform = 'scale(1)', 200);
    });
}

// Setup menu interactions (extracted to function so it can be called after DOM is ready)
function setupMenuInteractions() {
    const menuIcon = document.getElementById('menu-icon');
    const headerLinks = document.getElementById('header-links');
    const menuOverlay = document.querySelector('.menu-overlay');

    if (menuIcon && headerLinks && menuOverlay) {
        // Toggle menu when clicking menu icon
        menuIcon.addEventListener('click', () => {
            headerLinks.classList.toggle('active');
            menuIcon.classList.toggle('active');
            menuOverlay.classList.toggle('active');
        });
        
        // Close menu when clicking on overlay
        menuOverlay.addEventListener('click', () => {
            headerLinks.classList.remove('active');
            menuIcon.classList.remove('active');
            menuOverlay.classList.remove('active');
        });
        
        // Close menu when clicking anywhere on the document (outside menu)
        document.addEventListener('click', (event) => {
            // Only close if menu is active and click is outside menu and menu icon
            if (
                headerLinks.classList.contains('active') && 
                !headerLinks.contains(event.target) && 
                !menuIcon.contains(event.target)
            ) {
                headerLinks.classList.remove('active');
                menuIcon.classList.remove('active');
                menuOverlay.classList.remove('active');
            }
        });
        
        // Close menu when clicking on a link
        const menuLinks = headerLinks.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                headerLinks.classList.remove('active');
                menuIcon.classList.remove('active');
                menuOverlay.classList.remove('active');
            });
        });
    }
}


// Function to set up scroll effects for header
function setupScrollEffects() {
    const header = document.getElementById('header');
    const scrollToTopButton = document.getElementById('scroll-to-top');
    let lastScroll = 0;
    
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Scroll-to-top button visibility
        if (scrollToTopButton) {
            if (currentScroll > 300) {
                scrollToTopButton.classList.add('visible');
            } else {
                scrollToTopButton.classList.remove('visible');
            }
        }
        
        // Header effects
        if (currentScroll > 50) {
            header.classList.add('scroll-header');
        } else {
            header.classList.remove('scroll-header');
        }
        
        // Optional opacity effect
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down - slight opacity
            header.style.opacity = '0.95';
        } else {
            // Scrolling up - full opacity
            header.style.opacity = '1';
        }
        
        lastScroll = currentScroll;
    });
}





// Responsive about box handling
function handleResize() {
    const aboutBox = document.querySelector('.about-box');
    if (!aboutBox) return;

    if (window.innerWidth <= 768) {
        aboutBox.style.flexDirection = 'column';
        aboutBox.style.textAlign = 'center';
    } else {
        aboutBox.style.flexDirection = 'row';
        aboutBox.style.textAlign = 'left';
    }
}

// Add event listener for window resize
window.addEventListener('resize', handleResize);

// Call handleResize on page load to apply the correct layout
document.addEventListener('DOMContentLoaded', handleResize);

// Trigger the effect on page load and window resize
window.addEventListener('resize', handleResize);
window.addEventListener('load', handleResize);

// Scroll-to-Top Button (Fixed)
const scrollToTopButton = document.getElementById('scroll-to-top');

if (scrollToTopButton) {
    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Add Intersection Observer for animations
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__fadeIn');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        // Remove the class first
        section.classList.remove('animate__fadeIn');
        // Then observe the element
        observer.observe(section);
    });
});

// Fix RTL layout issues
document.addEventListener('DOMContentLoaded', () => {
    // For RTL layout, ensure proper alignment in smaller screens
    if (document.documentElement.dir === 'rtl') {
        const menuIcon = document.querySelector('.menu-icon');
        const headerLinks = document.querySelector('.header-links');
        
        if (menuIcon && headerLinks && window.innerWidth <= 768) {
            headerLinks.style.right = 'auto';
            headerLinks.style.left = '20px';
        }
    }
});