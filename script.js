// DOM Elements
const skillInput = document.getElementById('skillInput');
const progressInput = document.getElementById('progressInput');
const addSkillButton = document.getElementById('addSkillButton');
const skillsContainer = document.getElementById('skillsContainer');
const darkModeToggle = document.getElementById('darkModeToggle');

// Load saved skills from localStorage
let skills = JSON.parse(localStorage.getItem('skills')) || [];
let isDarkMode = JSON.parse(localStorage.getItem('isDarkMode')) || false;

// Initialize app
function initialize() {
  renderSkills();
  if (isDarkMode) {
    enableDarkMode();
  }
}

// Add skill function
function addSkill() {
  const skillName = skillInput.value.trim();
  const progressValue = parseInt(progressInput.value);

  if (skillName === '' || isNaN(progressValue) || progressValue < 0 || progressValue > 100) {
    alert('Please enter a valid skill name and progress (0-100).');
    return;
  }

  const existingSkill = skills.find(skill => skill.name === skillName);

  if (existingSkill) {
    alert('This skill already exists. Update it instead.');
    return;
  }

  skills.push({ name: skillName, progress: progressValue });
  localStorage.setItem('skills', JSON.stringify(skills));
  renderSkills();

  skillInput.value = '';
  progressInput.value = '';
}

// Render skills function
function renderSkills() {
  skillsContainer.innerHTML = '<h2>Your Skills</h2>';

  skills.forEach((skill, index) => {
    const skillCard = document.createElement('div');
    skillCard.classList.add('skill-card');

    skillCard.innerHTML = `
      <p>${skill.name} (${skill.progress}%)</p>
      <input type="range" min="0" max="100" value="${skill.progress}" data-index="${index}">
      <button class="update-button" data-index="${index}">Update</button>
    `;

    skillsContainer.appendChild(skillCard);
  });

  const updateButtons = document.querySelectorAll('.update-button');
  const sliders = document.querySelectorAll('input[type="range"]');

  updateButtons.forEach(button => button.addEventListener('click', updateSkill));
  sliders.forEach(slider => slider.addEventListener('input', handleSliderChange));
}

// Handle slider change
function handleSliderChange(event) {
  const index = event.target.dataset.index;
  skills[index].progress = parseInt(event.target.value);
  localStorage.setItem('skills', JSON.stringify(skills));
}

// Update skill progress
function updateSkill(event) {
  const index = event.target.dataset.index;
  const slider = document.querySelector(`input[type="range"][data-index="${index}"]`);
  const newProgress = parseInt(slider.value);

  skills[index].progress = newProgress;
  localStorage.setItem('skills', JSON.stringify(skills));
  renderSkills();
}

// Dark Mode toggle
function toggleDarkMode() {
  isDarkMode = !isDarkMode;

  if (isDarkMode) {
    enableDarkMode();
  } else {
    disableDarkMode();
  }

  localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
}

function enableDarkMode() {
  document.body.classList.add('dark-mode');
  darkModeToggle.textContent = 'Disable Dark Mode';
}

function disableDarkMode() {
  document.body.classList.remove('dark-mode');
  darkModeToggle.textContent = 'Enable Dark Mode';
}

// Event listeners
addSkillButton.addEventListener('click', addSkill);
darkModeToggle.addEventListener('click', toggleDarkMode);

// Initialize the app
initialize();
