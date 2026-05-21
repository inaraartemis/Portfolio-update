// Initialize Lucide Icons
lucide.createIcons();

// About Modal Logic (Placed here for immediate accessibility)
document.addEventListener('DOMContentLoaded', () => {    // Remove old modal logic as per user request (Fixed section instead)
    
    // Add Mouse Glow to 3D Skill Cards
    const skillCards = document.querySelectorAll('.skill-3d-card');
    skillCards.forEach(card => {
        card.onmousemove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        };
    });
});

// Typewriter Effect
const typewriterElement = document.getElementById('typewriter');
const roles = [
    'Data Scientist',
    'Machine Learning Engineer'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 1500; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500; // Pause before next role
    }

    setTimeout(type, typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    type();
    renderSkills('programming'); // Initial tab changed back to programming
    initCharts();
});

// Skills Data
const skillsData = {
    programming: [
        { name: 'Python', level: 98, icon: 'https://cdn.simpleicons.org/python/3776AB', desc: 'A versatile programming language widely used in data science and machine learning. Its simple syntax and powerful libraries make it industry-standard.' },
        { name: 'SQL', level: 95, icon: 'https://cdn.simpleicons.org/mysql/4479A1', desc: 'A powerful query language used for managing and analyzing structured data across relational databases like MySQL and PostgreSQL.' },
        { name: 'C++', level: 85, icon: 'https://cdn.simpleicons.org/cplusplus/00599C', desc: 'A high-performance programming language used for resource-intensive tasks and performance-critical systems.' },
        { name: 'Java', level: 80, icon: 'https://cdn.simpleicons.org/openjdk/ED8B00', desc: 'A class-based, object-oriented programming language designed to have as few implementation dependencies as possible.' }
    ],
    datascience: [
        { name: 'Data Analysis', level: 96, icon: 'search', desc: 'The process of inspecting, cleansing, transforming, and modeling data with the goal of discovering useful information and support decision-making.' },
        { name: 'Data Cleaning', level: 94, icon: 'filter', desc: 'The process of identifying and correcting corrupt, inaccurate, or irrelevant records from a recordset or database.' },
        { name: 'EDA', level: 95, icon: 'line-chart', desc: 'Exploratory Data Analysis is an approach to analyzing datasets to summarize their main characteristics, often with visual methods.' },
        { name: 'Data Visualization', level: 92, icon: 'bar-chart-3', desc: 'Communicating information clearly and efficiently via statistical graphics, plots, and information graphics.' }
    ],
    ml: [
        { name: 'Supervised Learning', level: 94, icon: 'brain', desc: 'The machine learning task of learning a function that maps an input to an output based on example input-output pairs.' },
        { name: 'Unsupervised Learning', level: 90, icon: 'cpu', desc: 'Machine learning algorithms used to find patterns in data that contains no labels.' },
        { name: 'Feature Engineering', level: 92, icon: 'settings-2', desc: 'Using domain knowledge to extract features from raw data via data mining techniques.' },
        { name: 'Model Evaluation', level: 91, icon: 'activity', desc: 'The process of using different evaluation metrics to understand a machine learning model\'s performance.' },
        { name: 'Deep Learning', level: 88, icon: 'layers', desc: 'A subset of machine learning based on artificial neural networks with representation learning.' }
    ],
    libraries: [
        { name: 'NumPy', level: 96, icon: 'https://cdn.simpleicons.org/numpy/013243', desc: 'A library for the Python programming language, adding support for large, multi-dimensional arrays and matrices.' },
        { name: 'Pandas', level: 98, icon: 'https://cdn.simpleicons.org/pandas/150458', desc: 'A software library written for the Python programming language for data manipulation and analysis.' },
        { name: 'Matplotlib', level: 90, icon: 'https://cdn.simpleicons.org/plotly/3F4F75', desc: 'A plotting library for the Python programming language and its numerical mathematics extension NumPy.' },
        { name: 'Seaborn', level: 92, icon: 'https://cdn.simpleicons.org/googlesheets/34A853', desc: 'A Python data visualization library based on matplotlib. It provides a high-level interface for drawing attractive and informative statistical graphics.' },
        { name: 'Scikit-learn', level: 95, icon: 'https://cdn.simpleicons.org/scikitlearn/F7931E', desc: 'A free software machine learning library for the Python programming language.' },
        { name: 'TensorFlow', level: 88, icon: 'https://cdn.simpleicons.org/tensorflow/FF6F00', desc: 'An end-to-end open source platform for machine learning.' },
        { name: 'PyTorch', level: 86, icon: 'https://cdn.simpleicons.org/pytorch/EE4C2C', desc: 'An open source machine learning library based on the Torch library.' }
    ],
    tools: [
        { name: 'Jupyter', level: 96, icon: 'https://cdn.simpleicons.org/jupyter/F37626', desc: 'The original web application for creating and sharing computational documents.' },
        { name: 'Google Colab', level: 94, icon: 'https://cdn.simpleicons.org/googlecolab/F9AB00', desc: 'A hosted Jupyter Notebook service that requires no setup to use and provides free access to computing resources.' },
        { name: 'VS Code', level: 95, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', desc: 'A code editor redefined and optimized for building and debugging modern web and cloud applications.' }
    ],
    databases: [
        { name: 'MySQL', level: 92, icon: 'https://cdn.simpleicons.org/mysql/4479A1', desc: 'An open-source relational database management system.' },
        { name: 'PostgreSQL', level: 90, icon: 'https://cdn.simpleicons.org/postgresql/4169E1', desc: 'A powerful, open source object-relational database system.' }
    ],
    devops: [
        { name: 'Docker', level: 85, icon: 'https://cdn.simpleicons.org/docker/2496ED', desc: 'A set of platform as a service products that use OS-level virtualization to deliver software in packages called containers.' },
        { name: 'CI/CD Pipelines', level: 82, icon: 'https://cdn.simpleicons.org/githubactions/2088FF', desc: 'Continuous Integration / Continuous Delivery automate the software development life cycle.' },
        { name: 'Git & GitHub', level: 94, icon: 'https://cdn.simpleicons.org/github/181717', desc: 'Distributed version control system for tracking changes in source code during software development.' }
    ],
    softskills: [
        { name: 'Problem Solving', level: 96, icon: 'puzzle', desc: 'Ability to analyze complex problems and design solutions. Involves logical thinking and creativity. Important for coding and data challenges. Enhances decision-making skills. Core skill for engineers.' },
        { name: 'Time Management', level: 92, icon: 'clock', desc: 'Managing tasks efficiently to meet deadlines. Helps prioritize work effectively. Improves productivity and focus. Important for handling multiple projects. Ensures timely delivery.' },
        { name: 'Adaptability', level: 95, icon: 'refresh-cw', desc: 'Ability to learn new tools and technologies quickly. Helps adjust to changing environments. Important in fast-paced industries. Encourages continuous learning. Key for growth.' }
    ]
};

const skillsGrid = document.getElementById('skills-grid');
const tabBtns = document.querySelectorAll('.tab-btn');

function renderSkills(category) {
    if (!skillsGrid) return;
    skillsGrid.innerHTML = '';
    const skills = skillsData[category];
    
    skills.forEach(skill => {
        const isUrlIcon = skill.icon.startsWith('http');
        const card = document.createElement('div');
        card.className = 'skill-card glass scroll-reveal';
        
        card.innerHTML = `
            <div class="skill-main">
                <div class="skill-icon-container">
                    ${isUrlIcon ? `<img src="${skill.icon}" alt="${skill.name}">` : `<i data-lucide="${skill.icon}"></i>`}
                </div>
                <div class="skill-info">
                    <span class="skill-name">${skill.name}</span>
                    <span class="skill-perc">${skill.level}%</span>
                </div>
            </div>
            <div class="progress-bg">
                <div class="progress-bar" style="width: 0%"></div>
            </div>
        `;
        
        // Modal logic on click
        card.addEventListener('click', () => {
            openSkillModal(skill);
        });
        
        skillsGrid.appendChild(card);
        
        // Trigger progress bar animation after append
        setTimeout(() => {
            const bar = card.querySelector('.progress-bar');
            if (bar) bar.style.width = skill.level + '%';
        }, 100);
    });
    lucide.createIcons();
}

function openSkillModal(skill) {
    const modal = document.getElementById('skill-modal');
    const modalTitle = document.getElementById('modal-skill-name');
    const modalDesc = document.getElementById('modal-skill-desc');
    const modalLevel = document.getElementById('modal-skill-level');
    const modalProgress = document.getElementById('modal-progress');
    const modalIcon = document.getElementById('modal-skill-icon');

    const isUrlIcon = skill.icon.startsWith('http');
    modalIcon.innerHTML = isUrlIcon ? `<img src="${skill.icon}" alt="${skill.name}">` : `<i data-lucide="${skill.icon}"></i>`;
    if (!isUrlIcon) lucide.createIcons();

    modalTitle.textContent = skill.name;
    modalDesc.textContent = skill.desc;
    modalLevel.textContent = skill.level + '% Proficiency';
    modalProgress.style.width = skill.level + '%';

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scroll
}

function closeSkillModal() {
    const modal = document.getElementById('skill-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scroll
}

// Close modal on click outside or close button
document.addEventListener('DOMContentLoaded', () => {
    const closeModalBtn = document.getElementById('close-modal');
    const modal = document.getElementById('skill-modal');

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeSkillModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeSkillModal();
        });
    }
});

// Animate coding stats difficulty bars on scroll into view
const statsBarsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.diff-bar').forEach(bar => {
                const target = bar.getAttribute('data-width');
                if (target) {
                    setTimeout(() => { bar.style.width = target; }, 200);
                }
            });
            statsBarsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.stats-card').forEach(card => statsBarsObserver.observe(card));

// Project filter tabs
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
            const categories = card.getAttribute('data-category') || '';
            if (filter === 'all' || categories.includes(filter)) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

if (tabBtns) {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderSkills(btn.dataset.tab);
        });
    });
}

// Charts Initialization
function initCharts() {
    const radarEl = document.getElementById('radarChart');
    const barEl = document.getElementById('barChart');
    if (!radarEl || !barEl) return;

    const isDark = document.body.classList.contains('dark');
    const textColor = isDark ? '#f8fafc' : '#1e293b';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

    // Radar Chart
    const radarCtx = radarEl.getContext('2d');
    new Chart(radarCtx, {
        type: 'radar',
        data: {
            labels: ['Math', 'Stat', 'Coding', 'Business', 'Domain', 'Communication'],
            datasets: [{
                label: 'Proficiency',
                data: [95, 90, 85, 80, 92, 88],
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderColor: '#3b82f6',
                borderWidth: 2,
                pointBackgroundColor: '#3b82f6'
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: { color: gridColor },
                    grid: { color: gridColor },
                    pointLabels: { color: textColor },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });

    // Bar Chart
    const barCtx = barEl.getContext('2d');
    new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: ['Random Forest', 'XGBoost', 'LightGBM', 'CNN', 'LSTM'],
            datasets: [{
                data: [94, 96, 95, 92, 89],
                backgroundColor: [
                    '#3b82f6', '#8b5cf6', '#22d3ee', '#f59e0b', '#ec4899'
                ],
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: gridColor },
                    ticks: { color: textColor }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: textColor }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// Theme Toggle
const themeBtn = document.getElementById('theme-toggle');
if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        document.body.classList.toggle('light');
        const icon = themeBtn.querySelector('i');
        const isDark = document.body.classList.contains('dark');
        if (icon) icon.setAttribute('data-lucide', isDark ? 'moon' : 'sun');
        lucide.createIcons();
        
        // Refresh charts colors
        initCharts();
    });
}

// Scroll Reveal Observer
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-reveal').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.8s ease-out';
    observer.observe(el);
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    if (window.scrollY > 50) {
        navbar.style.padding = '0.5rem 2rem';
        navbar.style.background = 'rgba(15, 23, 42, 0.8)';
    } else {
        navbar.style.padding = '0.8rem 2rem';
        navbar.style.background = 'rgba(255, 255, 255, 0.05)';
    }
});

// EmailJS Form Handling
document.addEventListener('DOMContentLoaded', () => {
    // Injecting your actual keys!
    emailjs.init("Gf7ZRhL8OHbg-J7Ej");  
    
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('contact-submit-btn');
    const btnText = document.getElementById('submit-btn-text');
    const statusDiv = document.getElementById('contact-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form reload
            
            // Show loading state
            const originalText = btnText.innerText;
            btnText.innerText = 'Sending...';
            submitBtn.style.opacity = '0.7';
            submitBtn.style.pointerEvents = 'none';
            statusDiv.innerText = '';

            // Send form data
            emailjs.sendForm('service_adhuu3b', 'template_c6467og', this)
                .then(function() {
                    // Success
                    statusDiv.innerText = 'Message sent successfully 🚀';
                    statusDiv.style.color = '#34d399'; // Success Green
                    contactForm.reset(); // Clear the form
                }, function(error) {
                    // Error
                    statusDiv.innerText = 'Failed to send message ❌';
                    statusDiv.style.color = '#ef4444'; // Error Red
                    console.error('EmailJS Error:', error);
                })
                .finally(function() {
                    // Restore button state
                    btnText.innerText = originalText;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.pointerEvents = 'auto';
                    
                    // Clear status message strictly after 5 seconds
                    setTimeout(() => {
                        statusDiv.innerText = '';
                    }, 5000);
                });
        });
    }
});

// Advanced 3D Tilt & Mouse Glow Effect for About/Education
document.addEventListener('DOMContentLoaded', () => {
    const advancedCards = document.querySelectorAll('.about-card, .education-card, .feature-modal-card');

    advancedCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Update Mouse Glow Position
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            // Calculate Rotation
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (centerY - y) / 15; // Subtle rotate
            const rotateY = (x - centerX) / 15;

            card.style.transform = `scale3d(1.02, 1.02, 1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg)`;
            if (card.classList.contains('about-card')) {
                card.style.animation = 'float3d 6s ease-in-out infinite';
            }
        });

        card.addEventListener('mouseenter', () => {
            if (card.classList.contains('about-card')) {
                card.style.animation = 'none'; // Pause floating while tilting
            }
        });
    });

    // About Modal Logic
    const aboutBtn = document.getElementById('about-btn');
    const aboutModal = document.getElementById('about-modal');
    const closeAboutBtn = document.getElementById('close-about');

    if (aboutBtn && aboutModal) {
        aboutBtn.addEventListener('click', () => {
            aboutModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeAboutBtn.addEventListener('click', () => {
            aboutModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        aboutModal.addEventListener('click', (e) => {
            if (e.target === aboutModal) {
                aboutModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
});

