document.addEventListener("DOMContentLoaded", function () {
  document.getElementById('currentYear').textContent = new Date().getFullYear();

  // Service Worker Registration for PWA
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
          // Continue without service worker
        });
    });
  }

  // PWA Install Button
  let deferredPrompt;
  let installButton = null;

  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    // Show install button
    showInstallButton();
  });

  function showInstallButton() {
    if (!installButton) {
      installButton = document.createElement('button');
      installButton.innerHTML = '📱 Install App';
      installButton.id = 'install-button';
      installButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #00ff88;
        color: #1a1a1a;
        border: none;
        padding: 12px 16px;
        border-radius: 8px;
        font-family: 'Azeret Mono', monospace;
        font-weight: 600;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 255, 136, 0.3);
        transition: all 0.3s ease;
      `;
      
      installButton.addEventListener('mouseover', () => {
        installButton.style.transform = 'translateY(-2px)';
        installButton.style.boxShadow = '0 6px 16px rgba(0, 255, 136, 0.4)';
      });
      
      installButton.addEventListener('mouseout', () => {
        installButton.style.transform = 'translateY(0)';
        installButton.style.boxShadow = '0 4px 12px rgba(0, 255, 136, 0.3)';
      });

      installButton.addEventListener('click', () => {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the install prompt');
            } else {
              console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
            installButton.style.display = 'none';
          });
        }
      });

      document.body.appendChild(installButton);
    }
  }

  window.addEventListener('appinstalled', (evt) => {
    console.log('PWA was installed');
    if (installButton) {
      installButton.style.display = 'none';
    }
  });


  


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





// View Toggle Functionality
const listViewBtn = document.getElementById('list-view-btn');
const galleryViewBtn = document.getElementById('gallery-view-btn');
const linksSection = document.querySelector('section.links');

// Debug logging
console.log('View toggle elements found:', {
  listViewBtn: !!listViewBtn,
  galleryViewBtn: !!galleryViewBtn,
  linksSection: !!linksSection
});

// Set initial view (list view is default)
let currentView = 'list';
if (listViewBtn) {
  listViewBtn.classList.add('active');
}

function switchToListView() {
  if (currentView === 'list') return;
  
  currentView = 'list';
  if (linksSection) {
    linksSection.classList.remove('gallery-view');
  }
  if (listViewBtn) {
    listViewBtn.classList.add('active');
  }
  if (galleryViewBtn) {
    galleryViewBtn.classList.remove('active');
  }
  
  // Save preference
  localStorage.setItem('viewPreference', 'list');
}

function switchToGalleryView() {
  if (currentView === 'gallery') return;
  
  currentView = 'gallery';
  if (linksSection) {
    linksSection.classList.add('gallery-view');
  }
  if (galleryViewBtn) {
    galleryViewBtn.classList.add('active');
  }
  if (listViewBtn) {
    listViewBtn.classList.remove('active');
  }
  
  // Save preference
  localStorage.setItem('viewPreference', 'gallery');
}

// Event listeners
if (listViewBtn) {
  listViewBtn.addEventListener('click', switchToListView);
}
if (galleryViewBtn) {
  galleryViewBtn.addEventListener('click', switchToGalleryView);
}

// Load saved preference or default to list view
const savedView = localStorage.getItem('viewPreference') || 'list';
if (savedView === 'gallery') {
  switchToGalleryView();
} else {
  switchToListView();
}

});
