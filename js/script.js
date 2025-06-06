

document.addEventListener('DOMContentLoaded', function() {
    
    //  mobilee nav 
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // .. close mobil menuwhenever navigations links are clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    //  Navigation Links scrolling smoother
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    //navigation bar background chnage scrolling
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // background opacity on scrolling
        if (scrollTop > 50) {
            navbar.style.backgroundColor = 'rgba(46, 125, 50, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = '#2E7D32';
            navbar.style.backdropFilter = 'none';
        }
        
        // hide or show navbar on scroll 
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });
    
    // animated cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // animation applied on cards
    document.querySelectorAll('.card, .lifestyle-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    //  interactive cta with effects
    const ctaButton = document.querySelector('.cta-button');
    
    ctaButton.addEventListener('click', function(e) {
        // riple effects
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        // show perform action
        showGreenJourneyModal();
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
    
    //  ripple animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // modal for green journey
    function showGreenJourneyModal() {
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div class="modal-overlay" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2000;
                backdrop-filter: blur(5px);
            ">
                <div class="modal-content" style="
                    background: #FAFAFA;
                    padding: 3rem;
                    border-radius: 20px;
                    max-width: 500px;
                    width: 90%;
                    text-align: center;
                    box-shadow: 0 20px 60px rgba(46, 125, 50, 0.3);
                    animation: modalSlideIn 0.3s ease;
                ">
                    <h3 style="color: #2E7D32; margin-bottom: 1rem; font-size: 1.8rem;">🌱 Welcome to Your Green Journey!</h3>
                    <p style="color: #555; margin-bottom: 2rem; line-height: 1.6;">
                        Thank you for choosing a sustainable lifestyle! Here are your first steps:
                    </p>
                    <div class="green-tips" style="text-align: left; margin-bottom: 2rem;">
                        <div style="margin-bottom: 1rem;">✅ Start with one eco-friendly habit</div>
                        <div style="margin-bottom: 1rem;">✅ Reduce single-use plastics</div>
                        <div style="margin-bottom: 1rem;">✅ Choose local, organic products</div>
                        <div>✅ Share your journey with others</div>
                    </div>
                    <button class="modal-close" style="
                        background: #2E7D32;
                        color: white;
                        border: none;
                        padding: 1rem 2rem;
                        border-radius: 25px;
                        cursor: pointer;
                        font-weight: 600;
                        transition: background 0.3s ease;
                    ">Start Now!</button>
                </div>
            </div>
        `;
        
        // modal animation added
        const modalStyle = document.createElement('style');
        modalStyle.textContent = `
            @keyframes modalSlideIn {
                from {
                    transform: translateY(-50px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(modalStyle);
        
        document.body.appendChild(modal);
        
        // close modal function
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');
        
        function closeModal() {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(modal);
                document.head.removeChild(modalStyle);
            }, 300);
        }
        
        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) closeModal();
        });
        
        // fadeOut animation
        const fadeStyle = document.createElement('style');
        fadeStyle.textContent = `
            @keyframes fadeOut {
                to {
                    opacity: 0;
                    transform: scale(0.9);
                }
            }
        `;
        document.head.appendChild(fadeStyle);
    }
    
    // dynamic  tips rotation
    const ecoTips = [
        "💡 Switch to LED bulbs - they use 75% less energy!",
        "🚿 A 5-minute shower saves 10-25 gallons of water!",
        "🌱 One tree can absorb 48 lbs of CO2 per year!",
        "♻️ Recycling one aluminum can saves enough energy to power a TV for 3 hours!",
        "🚲 Biking just 10 miles a week saves 500 lbs of CO2 annually!",
        "🥬 Eating one plant-based meal a day saves 1,100 lbs of CO2 per year!"
    ];
    
    let tipIndex = 0;
    
    function createFloatingTip() {
        const tip = document.createElement('div');
        tip.textContent = ecoTips[tipIndex];
        tip.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #2E7D32, #388E3C);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 25px;
            box-shadow: 0 10px 30px rgba(46, 125, 50, 0.3);
            z-index: 1500;
            max-width: 300px;
            font-size: 0.9rem;
            animation: tipSlideIn 0.5s ease, tipSlideOut 0.5s ease 4.5s;
            cursor: pointer;
        `;
        
        document.body.appendChild(tip);
        
        tip.addEventListener('click', function() {
            this.style.animation = 'tipSlideOut 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(this)) {
                    document.body.removeChild(this);
                }
            }, 300);
        });
        
        setTimeout(() => {
            if (document.body.contains(tip)) {
                document.body.removeChild(tip);
            }
        }, 5000);
        
        tipIndex = (tipIndex + 1) % ecoTips.length;
    }
    
    // tip animationss
    const tipStyle = document.createElement('style');
    tipStyle.textContent = `
        @keyframes tipSlideIn {
            from {
                transform: translateX(350px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes tipSlideOut {
            to {
                transform: translateX(350px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(tipStyle);
    
    // first tip is displayedafter 3 seconds then after every 15 secs
    setTimeout(() => {
        createFloatingTip();
        setInterval(createFloatingTip, 15000);
    }, 3000);
    
    //  for contact form function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // themes for dark and light modes
    function createThemeToggle() {
    const toggle = document.createElement('button');
    toggle.innerHTML = '🌙';
    toggle.setAttribute('aria-label', 'Toggle dark mode');
    toggle.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: #2E7D32;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(46, 125, 50, 0.3);
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    
    const isDarkStored = localStorage.getItem('darkMode') === 'true';
    let isDark = isDarkStored;
    
    
    if (isDark) {
        applyDarkMode();
        toggle.innerHTML = '☀️';
        toggle.style.background = '#FB8C00';
    }
    
    function applyDarkMode() {
        //  update for  dark mode styles
        let darkModeStyle = document.getElementById('dark-mode-styles');
        if (!darkModeStyle) {
            darkModeStyle = document.createElement('style');
            darkModeStyle.id = 'dark-mode-styles';
            document.head.appendChild(darkModeStyle);
        }
        
        darkModeStyle.textContent = `
            body.dark-mode {
                background-color: #1a1a1a !important;
                color: #e0e0e0 !important;
            }
            
            .dark-mode .navbar {
                background-color: #0d4f12 !important;
            }
            
            .dark-mode .hero {
                background: linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%) !important;
            }
            
            .dark-mode .card,
            .dark-mode .lifestyle-card {
                background-color: #2d2d2d !important;
                border-color: #404040 !important;
                color: #e0e0e0 !important;
            }
            
            .dark-mode .card h4,
            .dark-mode .lifestyle-card h4 {
                color: #A5D6A7 !important;
            }
            
            .dark-mode .card p,
            .dark-mode .lifestyle-card p {
                color: #b0b0b0 !important;
            }
            
            .dark-mode .content-section h3 {
                color: #A5D6A7 !important;
            }
            
            .dark-mode .contact-section {
                background-color: #1B5E20 !important;
            }
            
            .dark-mode .footer {
                background-color: #0d4f12 !important;
            }
            
            .dark-mode .card-icon {
                color: #A5D6A7 !important;
            }
            
            .dark-mode .card:hover .card-icon {
                color: #FB8C00 !important;
            }
        `;
        
        document.body.classList.add('dark-mode');
    }
    
    function applyLightMode() {
        document.body.classList.remove('dark-mode');
        const darkModeStyle = document.getElementById('dark-mode-styles');
        if (darkModeStyle) {
            darkModeStyle.textContent = '';
        }
    }
    
    toggle.addEventListener('click', function() {
        isDark = !isDark;
        
        if (isDark) {
            applyDarkMode();
            this.innerHTML = '☀️';
            this.style.background = '#FB8C00';
            localStorage.setItem('darkMode', 'true');
        } else {
            applyLightMode();
            this.innerHTML = '🌙';
            this.style.background = '#2E7D32';
            localStorage.setItem('darkMode', 'false');
        }
    });
    
    // hover effects
    toggle.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    toggle.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(toggle);
    }
    
    // ..theme toggle
    createThemeToggle();
    
    //  performance optimization for Images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    //  Enhanced Accessibility
    
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #2E7D32;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1001;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    //loading animation
    function showPageLoader() {
        const loader = document.createElement('div');
        loader.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #FAFAFA;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                transition: opacity 0.5s ease;
            ">
                <div style="
                    width: 50px;
                    height: 50px;
                    border: 5px solid #e0e0e0;
                    border-top: 5px solid #2E7D32;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                "></div>
            </div>
        `;
        
        const spinStyle = document.createElement('style');
        spinStyle.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(spinStyle);
        document.body.appendChild(loader);
        
        // hides loader te page loads 
        window.addEventListener('load', function() {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    if (document.body.contains(loader)) {
                        document.body.removeChild(loader);
                    }
                    if (document.head.contains(spinStyle)) {
                        document.head.removeChild(spinStyle);
                    }
                }, 500);
            }, 1000);
        });
    }
    
    // shows loader only at the start of page
    if (!sessionStorage.getItem('visited')) {
        showPageLoader();
        sessionStorage.setItem('visited', 'true');
    }
    
    console.log('🌱 EcoHaven JavaScript loaded successfully! Live clean. Live green.');
});