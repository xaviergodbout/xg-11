document.addEventListener("DOMContentLoaded", function () {
  document.getElementById('currentYear').textContent = new Date().getFullYear();


  


function updateFavicon() {
  const favicon = document.getElementById('favicon');
  const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  favicon.href = darkMode ? '/img/x-g_favicon_dark.svg' : '/img/x-g_favicon_light.svg';
}

// Run on load
updateFavicon();

// Listen for changes in the theme
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateFavicon);







const html = document.documentElement;

// Function to apply theme based on system preference
function applySystemTheme() {
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // User prefers dark mode
    html.classList.add('dark-theme');
    html.classList.remove('light-theme');
} else {
    // User prefers light mode or no preference
    html.classList.add('light-theme');
    html.classList.remove('dark-theme');
}
}

// Apply the system theme on initial load
applySystemTheme();

// Optional: Listen for changes to the preference and update dynamically
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
applySystemTheme();
});

// Your existing toggle button code
const btn = document.getElementById('toggle-theme');
btn.onclick = () => {
if (html.classList.contains('dark-theme')) {
    html.classList.remove('dark-theme');
    html.classList.add('light-theme');
} else {
    html.classList.remove('light-theme');
    html.classList.add('dark-theme');
}
};





// Select all section headers and their corresponding ULs
document.querySelectorAll('section.links').forEach(section => {
  // For each h2 inside the section
  section.querySelectorAll('h2').forEach(header => {
    // The next sibling UL after this header
    const ul = header.nextElementSibling;
    if (ul && ul.tagName === 'UL') {
      // Count how many <a> tags are inside this ul
      const linkCount = ul.querySelectorAll('a').length;
      // Append the count to the header text (only if > 0)
      if (linkCount > 0) {
        header.textContent += `(${linkCount})`;
      }
    }
  });
});

});

