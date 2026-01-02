// Configuration
const blueColor = '#2A00FF';

// Projects data
const projects = [
  {
    id: 1,
    title: 'Lorem Ipsum Dolor',
    year: '2025',
    tags: ['Creative Code', 'Chatbot Creation', 'Web Design', 'Game Design'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    id: 2,
    title: 'Consectetur Adipiscing',
    year: '2025',
    tags: ['Interactive', 'Generative Art', 'Web Design'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    id: 3,
    title: 'Sed Do Eiusmod',
    year: '2024',
    tags: ['Music Production', 'Sound Design', 'Audio'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    id: 4,
    title: 'Tempor Incididunt',
    year: '2024',
    tags: ['UI/UX Design', 'Prototyping', 'Mobile'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    id: 5,
    title: 'Ut Labore Magna',
    year: '2024',
    tags: ['Animation', 'Motion Graphics', 'Video'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    id: 6,
    title: 'Aliqua Enim Minim',
    year: '2023',
    tags: ['Data Visualization', 'Creative Code', 'Interactive'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    id: 7,
    title: 'Veniam Quis Nostrud',
    year: '2023',
    tags: ['Web Development', 'Full Stack', 'API Design'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    id: 8,
    title: 'Exercitation Ullamco',
    year: '2023',
    tags: ['3D Design', 'Blender', 'Rendering'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    id: 9,
    title: 'Laboris Nisi Aliquip',
    year: '2023',
    tags: ['Game Design', 'Unity', 'Interactive'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  }
];

// Scrolling text words
const scrollingWords = [
  'GRAPHIC DESIGNER',
  'INTERACTION ARTIST',
  'CREATIVE CODER',
  'MUSIC CREATOR',
  'FILM ENTHUSIAST',
  'VIDEO GAME LOVER'
];

// State
let scrollDelta = 0;
let scrollDirection = 1;
let scrollProgress = 0;
let showWorkButton = true;
let isMobile = window.innerWidth < 768;
let viewportWidth = window.innerWidth;
let viewportHeight = window.innerHeight;

// Scrolling text animation
let scrollingTextOffset = 0;
let scrollBoost = 0;
let currentDirection = 1;
let directionResetTimeout = null;

// Clover animation
let cloverRotation = 0;
let cloverRotationSpeed = 0.5;
let mouseActive = false;

// DOM elements
const container = document.getElementById('container');
const clover = document.getElementById('clover');
const cloverStalk = document.querySelector('.clover-stalk');
const cloverLeaves = document.querySelector('.clover-leaves');
const mainTitle = document.getElementById('mainTitle');
const scrollingTextContainer = document.getElementById('scrollingTextContainer');
const scrollingText = document.getElementById('scrollingText');
const workButton = document.getElementById('workButton');
const workSection = document.getElementById('workSection');
const projectsList = document.getElementById('projectsList');
const headerGradient = document.getElementById('headerGradient');
const bottomGradient = document.getElementById('bottomGradient');
const topLine = document.getElementById('topLine');
const footer = document.getElementById('footer');

// Initialize
function init() {
  // Render projects
  renderProjects();
  
  // Setup scrolling text
  const text = scrollingWords.join('  ✦  ');
  const fullText = `${text}  ✦  ${text}  ✦  ${text}  ✦  ${text}`;
  scrollingText.textContent = fullText;
  
  // Event listeners
  container.addEventListener('scroll', handleScroll);
  container.addEventListener('wheel', handleWheel);
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('resize', handleResize);
  clover.addEventListener('click', handleCloverClick);
  workButton.addEventListener('click', scrollToWork);
  
  // Start animations
  animateScrollingText();
  animateClover();
  
  // Initial update
  updateLayout();
}

// Render projects
function renderProjects() {
  projectsList.innerHTML = projects.map((project, index) => `
    <div>
      <div class="project-card">
        <div class="project-image"></div>
        <div class="project-content">
          <div class="project-header">
            <div class="project-tags">
              ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
            <div class="project-year">${project.year}</div>
          </div>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.description}</p>
        </div>
      </div>
      ${index < projects.length - 1 ? '<div class="project-divider"></div>' : ''}
    </div>
  `).join('');
}

// Handle scroll
function handleScroll() {
  const scrollPosition = container.scrollTop;
  
  if (scrollPosition > 100) {
    scrollProgress = 1;
    showWorkButton = false;
  } else {
    scrollProgress = scrollPosition / 100;
    showWorkButton = scrollProgress < 0.5;
  }
  
  updateLayout();
}

// Handle wheel for scroll delta
function handleWheel(e) {
  scrollDelta = Math.abs(e.deltaY);
  scrollDirection = e.deltaY > 0 ? 1 : -1;
  
  // Add boost to scrolling text
  const boost = scrollDelta * 0.3;
  scrollBoost = Math.min(boost, 30);
  currentDirection = scrollDirection;
  
  // Clear existing timeout
  if (directionResetTimeout) {
    clearTimeout(directionResetTimeout);
  }
  
  // Reset direction after scrolling stops
  directionResetTimeout = setTimeout(() => {
    currentDirection = 1;
  }, 150);
  
  // Boost clover rotation
  cloverRotationSpeed = Math.min(5 + (scrollDelta * 0.1), 15);
  
  // Decay scroll delta
  setTimeout(() => {
    scrollDelta = 0;
  }, 100);
}

// Handle mouse move
let mouseTimeout;
function handleMouseMove() {
  mouseActive = true;
  clearTimeout(mouseTimeout);
  mouseTimeout = setTimeout(() => {
    mouseActive = false;
  }, 150);
}

// Handle resize
function handleResize() {
  isMobile = window.innerWidth < 768;
  viewportWidth = window.innerWidth;
  viewportHeight = window.innerHeight;
  updateLayout();
}

// Handle clover click
function handleCloverClick() {
  window.location.reload();
}

// Scroll to work section
function scrollToWork() {
  scrollProgress = 1;
  updateLayout();
  setTimeout(() => {
    workSection.scrollIntoView({ behavior: 'smooth' });
  }, 50);
}

// Update layout based on scroll progress
function updateLayout() {
  // Title opacity and scale
  const titleOpacity = Math.max(0, 1 - (scrollProgress * 1.3));
  const titleScale = 1 - (scrollProgress * 0.15);
  mainTitle.style.opacity = titleOpacity;
  mainTitle.style.transform = `scale(${titleScale})`;
  
  // Scrolling text opacity and position
  const scrollingTextOpacity = Math.max(0, 1 - (scrollProgress * 1.2));
  const scrollingTextTranslateY = scrollProgress * 80;
  scrollingTextContainer.style.opacity = scrollingTextOpacity;
  scrollingTextContainer.style.transform = `translateY(${scrollingTextTranslateY}px)`;
  
  // Clover positioning
  const cloverScale = 1 - (scrollProgress * 0.35);
  
  const startY = isMobile ? viewportHeight * 0.38 : viewportHeight * 0.50;
  const endY = 80;
  const cloverY = startY - ((startY - endY) * scrollProgress);
  
  const startX = isMobile ? viewportWidth * 0.5 : viewportWidth * 0.26;
  const endX = viewportWidth * 0.5;
  const cloverX = startX - ((startX - endX) * scrollProgress);
  
  clover.style.top = `${cloverY}px`;
  clover.style.left = `${cloverX}px`;
  clover.style.transform = `translate(-50%, -50%) scale(${cloverScale})`;
  
  // Work content opacity
  const workContentOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.1) / 0.5));
  const workContentTranslateY = Math.max(0, (1 - scrollProgress) * 40);
  
  projectsList.style.opacity = workContentOpacity;
  projectsList.style.transform = `translateY(${workContentTranslateY}px)`;
  topLine.style.opacity = workContentOpacity;
  topLine.style.transform = `translateY(${workContentTranslateY}px)`;
  footer.style.opacity = workContentOpacity;
  
  // Header gradient opacity
  const headerGradientOpacity = Math.min(0.95, scrollProgress * 3);
  headerGradient.style.opacity = headerGradientOpacity;
  
  // Bottom gradient opacity
  const bottomGradientOpacity = Math.max(0, 1 - (scrollProgress * 2.5));
  bottomGradient.style.opacity = bottomGradientOpacity;
  
  // Work button visibility
  workButton.style.opacity = showWorkButton ? 1 : 0;
  workButton.style.pointerEvents = showWorkButton ? 'auto' : 'none';
}

// Animate scrolling text
function animateScrollingText() {
  // Decay scroll boost
  scrollBoost *= 0.95;
  
  // Calculate current speed
  const baseSpeed = 0.8;
  const currentSpeed = (baseSpeed + scrollBoost) * currentDirection;
  
  // Update offset
  scrollingTextOffset += currentSpeed;
  
  // Normalize offset for looping
  const textWidth = 2000;
  const normalizedOffset = ((scrollingTextOffset % textWidth) + textWidth) % textWidth;
  
  // Apply transform
  scrollingText.style.transform = `translateX(-${normalizedOffset}px)`;
  
  requestAnimationFrame(animateScrollingText);
}

// Animate clover rotation
function animateClover() {
  // Decay rotation speed back to base
  if (!mouseActive && scrollDelta === 0) {
    cloverRotationSpeed += (0.5 - cloverRotationSpeed) * 0.1;
  }
  
  // Update rotation
  cloverRotation += cloverRotationSpeed;
  
  // Apply rotation to leaves only
  if (cloverLeaves) {
    cloverLeaves.style.transform = `rotate(${cloverRotation}deg)`;
  }
  
  requestAnimationFrame(animateClover);
}

// Start
init();