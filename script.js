// Smooth scrolling for navigation links
// Firebase Configuration (same as admin.js)
    const firebaseConfig = {
        apiKey: "AIzaSyBmBjfRoYN8Oj2IK4XpjTONpoRIwfW9WIY",
        authDomain: "curryandgrill-c043d.firebaseapp.com",
        projectId: "curryandgrill-c043d",
        storageBucket: "curryandgrill-c043d.firebasestorage.app",
        messagingSenderId: "1063394384724",
        appId: "1:1063394384724:web:19cb1b6a1b596855c186c1",
        measurementId: "G-X8XLVPFRNP"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    // DOM Content Loaded Event
    document.addEventListener('DOMContentLoaded', function() {
        // Mobile menu functionality
        const mobileMenu = document.querySelector('.mobile-menu');
        const nav = document.querySelector('nav ul');
        
        if (mobileMenu) {
            mobileMenu.addEventListener('click', function() {
                nav.classList.toggle('active');
                mobileMenu.classList.toggle('active');
            });
        }

        // Smooth scrolling for navigation links
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu if open
                    nav.classList.remove('active');
                    mobileMenu.classList.remove('active');
                }
            });
        });

        // Fade in animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(el => observer.observe(el));

        // Gallery functionality
        const galleryItems = document.querySelectorAll('.gallery-item img');
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                // Create modal overlay
                const modal = document.createElement('div');
                modal.className = 'gallery-modal';
                modal.innerHTML = `
                    <div class="modal-content">
                        <span class="close-modal">&times;</span>
                        <img src="${this.src}" alt="${this.alt}">
                        <div class="modal-caption">${this.nextElementSibling.textContent}</div>
                    </div>
                `;
                
                document.body.appendChild(modal);
                modal.style.display = 'flex';
                
                // Close modal functionality
                const closeBtn = modal.querySelector('.close-modal');
                closeBtn.addEventListener('click', () => {
                    document.body.removeChild(modal);
                });
                
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        document.body.removeChild(modal);
                    }
                });
            });
        });

        // Contact form functionality
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = new FormData(this);
                const data = Object.fromEntries(formData);
                
                // Show loading state
                const submitBtn = this.querySelector('.submit-btn');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span class="btn-text">Sending...</span>';
                submitBtn.disabled = true;
                
                // Simulate form submission (replace with actual form submission logic)
                setTimeout(() => {
                    // Show success message
                    document.getElementById('successMessage').classList.add('show');
                    
                    // Reset form
                    this.reset();
                    
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        document.getElementById('successMessage').classList.remove('show');
                    }, 5000);
                }, 1000);
            });
        }

        // Parallax effect for hero section
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            const heroSection = document.getElementById('hero');
            if (heroSection) {
                heroSection.style.transform = `translateY(${rate}px)`;
            }
            
            // Parallax layers
            const layers = document.querySelectorAll('.parallax-layer');
            layers.forEach((layer, index) => {
                const speed = (index + 1) * 0.2;
                layer.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        // Load dynamic menu items from Firebase
        loadDailyMenu();
    });

    // Function to load daily menu items from Firebase
    async function loadDailyMenu() {
        const dailyMenuContainer = document.getElementById('todays-menu');
        
        if (!dailyMenuContainer) {
            console.log('Daily menu container not found');
            return;
        }

        try {
            // Show loading state
            dailyMenuContainer.innerHTML = '<li class="loading-item">Loading today\'s specials...</li>';
            
            // Fetch menu items from Firebase
            const snapshot = await db.collection('menu').get();
            
            // Clear loading state
            dailyMenuContainer.innerHTML = '';
            
            if (snapshot.empty) {
                dailyMenuContainer.innerHTML = '<li class="no-items">No special items available today</li>';
                return;
            }
            
            // Display menu items
            snapshot.forEach(doc => {
                const item = doc.data();
                const listItem = document.createElement('li');
                listItem.innerHTML = `${item.item} <span class="price">$${item.price}</span>`;
                dailyMenuContainer.appendChild(listItem);
            });
            
        } catch (error) {
            console.error('Error loading menu items:', error);
            dailyMenuContainer.innerHTML = '<li class="error-item">Unable to load today\'s specials</li>';
        }
    }

    // Function to refresh menu (can be called externally if needed)
    function refreshMenu() {
        loadDailyMenu();
    }

    // Auto-refresh menu every 5 minutes (optional)
    setInterval(refreshMenu, 5 * 60 * 1000);

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

    // Fade in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Form submission
    

    // Header background change on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });

    // Mobile menu toggle (basic implementation)
    const mobileMenu = document.querySelector('.mobile-menu');
    const navUl = document.querySelector('nav ul');
    
    mobileMenu?.addEventListener('click', function() {
        navUl.style.display = navUl.style.display === 'flex' ? 'none' : 'flex';
        navUl.style.flexDirection = 'column';
        navUl.style.position = 'absolute';
        navUl.style.top = '100%';
        navUl.style.left = '0';
        navUl.style.right = '0';
        navUl.style.background = 'white';
        navUl.style.padding = '1rem';
        navUl.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    });

    // Fixed: Dynamic daily menu rotation
    const dailyMenus = [
        [
            { item: "Fried Rice and Chilly Chicken", price: "$9.99" },
            { item: "Vegetable Korma with Parata", price: "$9.99" }
        ],
        [
            { item: "Jeera Rice/White Rice and Chicken Curry", price: "$9.99" },
            { item: "Chicken Curry with Parata", price: "$9.99" }
        ],
        [
            { item: "Yellow rice and Chicken Curry", price: "$9.99" },
            { item: "Cabbage Mallum with Parata", price: "$9.99" }
        ],
        [
            { item: "Fried Rice with Butter Chicken", price: "$9.99" },
            { item: "Salad with Parata", price: "$9.99" }
        ],
        [
            { item: "Jeera Rice/Noodles with Beef Fry", price: "$9.99" },
            { item: "Egg Curry with Parata", price: "$9.99" },
            { item: "Tempered Potatos", price: "$3.99" },
            { item: "Jeera Rice with Vegetable Koruma", price: "$9.99" }
        ],
        [
            { item: "Kottu Parata with Chicken Curry", price: "$9.99" },
            { item: "Noodles with Chicken Curry", price: "$9.99" }
        ]
    ];

    function updateDailyMenu() {
        const today = new Date().getDay(); // 0 = Sunday
        const menuIndex = today % dailyMenus.length;
        const dailyMenuElement = document.getElementById('daily-menu');

        if (!dailyMenuElement) return;

        dailyMenuElement.innerHTML = '';
        dailyMenuElement.classList.add('rotating-menu');

        dailyMenus[menuIndex].forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `${item.item} ${item.price ? `<span class="price">${item.price}</span>` : ''}`;
            dailyMenuElement.appendChild(li);
        });

        setTimeout(() => {
            dailyMenuElement.classList.remove('rotating-menu');
        }, 1000);
    }

    // Add hover effects to menu items
    document.querySelectorAll('.menu-section li').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.getElementById('hero');
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Typing effect in hero subtitle
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize typing effect after load
    // window.addEventListener('load', function() {
    //     const subtitle = document.querySelector('.hero-subtitle');
    //     const originalText = subtitle?.textContent;
    //     if (subtitle && originalText) {
    //         setTimeout(() => {
    //             typeWriter(subtitle, originalText, 30);
    //         }, 1000);
    //     }
    // });

    // Entrance animations
    window.addEventListener('load', function() {
        const menuSections = document.querySelectorAll('.menu-section');
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        menuSections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            setTimeout(() => {
                section.style.transition = 'all 0.6s ease';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 200);
        });
        
        galleryItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
                item.style.transition = 'all 0.4s ease';
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, index * 100 + 500);
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        // Show loading animation (optional custom function)
        // showLoading();

        // Initialize features
        updateDailyMenu();

        // Initial scroll animation check (if defined)
        if (typeof handleScrollAnimations === 'function') {
            handleScrollAnimations();
            window.addEventListener('scroll', throttle(handleScrollAnimations, 16));
        }

        // Update daily menu every hour
        setInterval(updateDailyMenu, 3600000);

        // Console log
        console.log('🍛 Welcome to Curry & Grill! 🔥');
        console.log('Website loaded successfully with all interactive features.');
    });

    // Pause/resume animations on visibility change
    document.addEventListener('visibilitychange', function() {
        const animations = document.querySelectorAll('.hero-title, .logo');
        animations.forEach(el => {
            el.style.animationPlayState = document.hidden ? 'paused' : 'running';
        });
    });

    // Global reference
    window.CurryGrillApp = {
        updateDailyMenu,
        dailyMenus
    };
    document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = this;
  const submitBtn = form.querySelector('.submit-btn');
  const btnText = submitBtn.querySelector('.btn-text');
  const successMessage = document.getElementById('successMessage');
//   const errorMessage = document.getElementById('errorMessage');

  successMessage.style.display = 'none';
//   errorMessage.style.display = 'none';

  btnText.innerHTML = '<div class="loading"></div>';
  submitBtn.disabled = true;

  const formData = new FormData(form);
  const data = new URLSearchParams({
      name: formData.get('name'),
      mobile: formData.get('mobile'),
      email: formData.get('email'),
      message: formData.get('message'),
      timestamp: new Date().toISOString()
  });

  try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbx3hgpMwNVOP09abYRkrabb0OeY5jhHNrQkZj5H9QxUx8pCOZbc-OGWrc1HvO0IPNmswA/exec', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: data
      });

      if (response.ok) {
          successMessage.style.display = 'block';
          btnText.textContent = 'Message Sent! ✓';
          submitBtn.style.background = '#48bb78';

          setTimeout(() => {
              form.reset();
              btnText.textContent = 'Send Message';
              submitBtn.style.background = '';
              submitBtn.disabled = false;
              successMessage.style.display = 'none';
          }, 3000);
      } else {
          throw new Error('Network error');
      }
  } catch (error) {
      console.error('Error:', error);
      successMessage.style.display = 'block';
      btnText.textContent = 'Thank You';
      submitBtn.style.background = '#008000';
      submitBtn.disabled = false;
  }
});
document.addEventListener("mousemove", (e) => {
    const layers = document.querySelectorAll(".parallax-layer");
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    layers.forEach((layer, i) => {
      const depth = (i + 1) * 10;
      layer.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
    });
  });

let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll) {
    // Scrolling down - hide header
    header.style.transform = 'translateY(-100%)';
  } else {
    // Scrolling up - show header
    header.style.transform = 'translateY(0)';
  }
  lastScroll = currentScroll;
});