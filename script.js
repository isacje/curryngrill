// Smooth scrolling for navigation links
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
            { item: "Fried Rice and Chilly Chicken", price: "$7.99" },
            { item: "Vegetable Korma with Parata", price: "$7.99" }
        ],
        [
            { item: "Jeera Rice/White Rice and Chicken Curry", price: "$7.99" },
            { item: "Chicken Curry with Parata", price: "$7.99" }
        ],
        [
            { item: "Yellow rice and Chicken Curry", price: "$7.99" },
            { item: "Cabbage Mallum with Parata", price: "$7.99" }
        ],
        [
            { item: "Fried Rice with Butter Chicken", price: "$7.99" },
            { item: "Salad with Parata", price: "$7.99" }
        ],
        [
            { item: "Jeera Rice/Noodles with Beef Fry", price: "$7.99" },
            { item: "Egg Curry with Parata", price: "$7.99" },
            { item: "Tempered Potatos", price: "$3.99" },
            { item: "Jeera Rice with Vegetable Koruma", price: "$7.99" }
        ],
        [
            { item: "Kottu Parata with Chicken Curry", price: "$7.99" },
            { item: "Noodles with Chicken Curry", price: "$7.99" }
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
    window.addEventListener('load', function() {
        const subtitle = document.querySelector('.hero-subtitle');
        const originalText = subtitle?.textContent;
        if (subtitle && originalText) {
            setTimeout(() => {
                typeWriter(subtitle, originalText, 30);
            }, 1000);
        }
    });

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