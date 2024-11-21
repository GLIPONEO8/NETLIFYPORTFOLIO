document.addEventListener('DOMContentLoaded', function() {
    // Typing animation for profile
    const text = "| Hi, I'm Kurt Russel";
    const profileInfo = document.querySelector('.profile-info h2');
    let index = 0;

    function typeText() {
        if (index < text.length) {
            profileInfo.textContent = text.slice(0, index + 1);
            index++;
            setTimeout(typeText, 100);
        }
    }
    typeText();

    // Skills Implementation
    const skillsData = [
        { 
            name: 'C', 
            percentage: 90,
            icon: '💻',
            description: 'Systems programming and low-level development'
        },
        { 
            name: 'HTML', 
            percentage: 60,
            icon: '🌐',
            description: 'Web markup and structure'
        },
        { 
            name: 'C++', 
            percentage: 60,
            icon: '🖥️',
            description: 'Object-oriented programming and game development'
        },
        { 
            name: 'SQL', 
            percentage: 30,
            icon: '📊',
            description: 'Database querying and management'
        },
        { 
            name: 'Java', 
            percentage: 30,
            icon: '☕',
            description: 'Enterprise and application development'
        }
    ];

    function createSkillElement(skill) {
        const skillItem = document.createElement('div');
        skillItem.classList.add('skill-item');
        
        skillItem.innerHTML = `
            <div class="skill-name">
                <span class="skill-icon">${skill.icon}</span>
                <span class="skill-name-text">${skill.name}</span>
            </div>
            <div class="skill-gauge">
                <div class="skill-gauge-fill" style="width: 0%"></div>
            </div>
            <div class="skill-percentage">${skill.percentage}%</div>
        `;

        skillItem.setAttribute('title', skill.description);
        return skillItem;
    }

    function animateSkills() {
        const skillsGrid = document.getElementById('skillsGrid');
        
        // Create and append skill elements
        skillsData.forEach(skill => {
            const skillElement = createSkillElement(skill);
            skillsGrid.appendChild(skillElement);
        });

        // Trigger skill gauge animations after a short delay
        setTimeout(() => {
            document.querySelectorAll('.skill-gauge-fill').forEach((gauge, index) => {
                gauge.style.width = `${skillsData[index].percentage}%`;
            });
        }, 100);
    }
    animateSkills();

    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const section = document.querySelector(this.getAttribute('href'));
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('hidden');
        observer.observe(section);
    });

    // Project hover effects
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        project.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        project.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Form validation and submission
    const contactForm = document.querySelector('.contact-section form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        
        // Simple validation
        let isValid = true;
        formData.forEach((value, key) => {
            if (!value) isValid = false;
        });

        if (isValid) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            this.appendChild(successMessage);
            
            // Reset form
            this.reset();
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        }
    });

    // Particle background effect
    const canvas = document.createElement('canvas');
    canvas.id = 'particles';
    document.body.prepend(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Photo Gallery Implementation
    const galleryImages = [
        { src: 'Assets/College.jpg', caption: 'College Life' },
        { src: 'Assets/Friends.jpg', caption: 'With Friends' },
        { src: 'Assets/Graduation.jpg', caption: 'Graduation Day' },
        { src: 'Assets/Family.jpg', caption: 'Family Time' },
        { src: 'Assets/Hobbies.jpg', caption: 'Hobbies' },
        { src: 'Assets/Adventure.jpg', caption: 'Adventures' }
    ];

    // Create gallery section
    const gallerySection = document.createElement('section');
    gallerySection.className = 'gallery-section';
    gallerySection.innerHTML = `
        <h2>Photo Gallery</h2>
        <div class="gallery-grid"></div>
        <div class="gallery-modal">
            <span class="close-modal">&times;</span>
            <img class="modal-image" src="" alt="Gallery Image">
            <div class="modal-caption"></div>
            <button class="prev-button">&#10094;</button>
            <button class="next-button">&#10095;</button>
        </div>
    `;

    // Insert gallery section before contact section
    const contactSection = document.querySelector('.contact-section');
    contactSection.parentNode.insertBefore(gallerySection, contactSection);

    // Populate gallery grid
    const galleryGrid = gallerySection.querySelector('.gallery-grid');
    galleryImages.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${image.src}" alt="${image.caption}" data-index="${index}">
            <div class="gallery-caption">${image.caption}</div>
        `;
        galleryGrid.appendChild(galleryItem);
    });

    // Gallery modal functionality
    const modal = document.querySelector('.gallery-modal');
    const modalImage = modal.querySelector('.modal-image');
    const modalCaption = modal.querySelector('.modal-caption');
    const closeButton = modal.querySelector('.close-modal');
    const prevButton = modal.querySelector('.prev-button');
    const nextButton = modal.querySelector('.next-button');
    let currentImageIndex = 0;

    function showImage(index) {
        currentImageIndex = index;
        modalImage.src = galleryImages[index].src;
        modalCaption.textContent = galleryImages[index].caption;
    }

    galleryGrid.addEventListener('click', (e) => {
        const clickedImage = e.target.closest('.gallery-item img');
        if (clickedImage) {
            currentImageIndex = parseInt(clickedImage.dataset.index);
            showImage(currentImageIndex);
            modal.style.display = 'flex';
        }
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    prevButton.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(currentImageIndex);
    });

    nextButton.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex') {
            if (e.key === 'ArrowLeft') prevButton.click();
            if (e.key === 'ArrowRight') nextButton.click();
            if (e.key === 'Escape') closeButton.click();
        }
    });
});