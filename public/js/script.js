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






// Select all sections that contain links and count links for each h2
document.querySelectorAll('section').forEach(section => {
  // Only process sections that contain UL elements (indicating they have links)
  if (section.querySelector('ul')) {
    // For each h2 inside the section
    section.querySelectorAll('h2').forEach(header => {
      // Skip if count already added (prevent duplicates)
      if (header.textContent.includes('(') && header.textContent.includes(')')) {
        return;
      }
      
      // Find the UL - either as next sibling or next sibling of parent (for wrapped h2s)
      let ul = header.nextElementSibling;
      
      // If h2 is wrapped in a div (like header-controls), look for UL after the parent div
      if (!ul || ul.tagName !== 'UL') {
        const parentElement = header.parentElement;
        if (parentElement && parentElement !== section) {
          ul = parentElement.nextElementSibling;
        }
      }
      
      if (ul && ul.tagName === 'UL') {
        // Count how many <a> tags are inside this ul
        const linkCount = ul.querySelectorAll('a').length;
        // Append the count to the header text (only if > 0)
        if (linkCount > 0) {
          header.textContent += `(${linkCount})`;
        }
      }
    });
  }
});








// --- Secure Dev Links Login ---
  const loginBtn = document.getElementById('server-login-btn');
  const secureContainer = document.getElementById('secure-server-links');
  
  // Paste the encrypted string you generated in Step 3 here:
  const encryptedserverHTML = "U2FsdGVkX1/+nMGEnBSLeT8piwEZ6TJqYQpzRYvI+8WbtmzjO0Lgtbd5Ty6Bp1Izs8hGO4N7Uc5E5HWWEJnXWVaKoA/dEZTQ44tS4UyIDzZk9wVBWYA5F9HGL5Y4GipbR5cwaAaMaoL/xvjyTDsfw+NGXjAwwXtmV6T3JsFGLzexpKvfFpbspqzT08oXEgj4vMf6hIVBm0vov9ERQ2/ph4nQB2XkYZTqNZVsNhlLKfhVgk4hMVEOF1Psbw9E8RrWdAm8PAPZPTB47jF63iB7AJ24EhRYpbWdobzq//7sCqtmG8pL6tQuJw+Fnbd8sc9N08/+Jg0QNTHn/5nPTbrYUwrEj21CqKpk63R4WuE1Xt1UcBaysVRaO5al97Co+Wp6nLnO3b2oxhNLqmTSrFK2/Nd0tKE5yoiX8n2nv48amHb5m+mBWyilnh4UC04Cw32MsFUE5Z16too7Jx8u/VmP8O/Ec5YSYWbdsktD8Ne3YbdSYqiDIh6U2O6X1aLddHIyx367NrNDaKQ3DHiAoPdimzL2cf7i6lxg7HrA2o0NjIuHSC1H3NjQEvylTNAt60/Q6n3HWZ5m244MhkQ6Cr8TbOPnNLY+GnLs0WUKlgLDfiN+damP6VsKs1uVdK9TzMfVC7fKSGNbcRwk7dkT+OmrPSWaT0AiUB+rKD6OWic/XbOBAdf0/iLdnSzCfD8/pey6w/w2CnNWrLH8A0DhXwJ7Oi7xlG3xKpjPzQFlLt2Bf6M2j/jPBweb6Tloy92ceydaFFc1f4X7ElWMC7kAKXDpjgHOC3iL+GlirZxpDSwWvnyDDRb5gU3AcSJVeYsdHma9ZfIj6pso64/ELsypPt1TeBj+qAAFGYvQq107TFAxB8ToOyiNGl2hPVYaHDsjtKadO/c0XYEqQG4fPMYgU664tzK8f6+Lwb+ymnrdldGZ/+WhNez4WxfL8Pj4xAl8yZLi7SXaahoA54XjCu88E6czOO7jmSVKwYfSoJEcwlPSiqfp/yMMl9nKJAL+kXXd6ISJf2swz7ndfmsurUDuhAKIJB8ayQxnfY8x5R2futSSUTpwY+Buf6Gfv+SuH+nFVaug3hJlOqQTT9ewZ7CVlT6o26ZR6hxPQBUzdnjXr1ihjMXESAMJUlseUCgNDEUCusfk2Cfuqnokgwf6Ly0Qz/bfbDOwAHxqmAlgB4fbhcq9oQuoBexfZOCcChlvIdcP2RXnh/hlG2xl7CH3POSWiLiIlXkqqPr1qbDqtrACpqkdOkctFyKySQu3I90EBNfjIZCNu4NbTnEYHMvjW/oA7notjOXvT/IChAgMJTGxoUgVHgvXefXLO3BuhpeJq/Ru0aOR+iI5kXSMvwmpCK3ILXuvAxRj5zUF9LihdeLmX0WOfX2FDxAsR4Fu6w42dmyUiycj1srQb6b/t7MxmeuI09jF0FHknmGfFv0ehQvj40IEYN8="; 

  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      const password = prompt("Enter the password to view server links:");
      
      if (!password) return; // User clicked cancel

      try {
        // Attempt to decrypt
        const bytes = CryptoJS.AES.decrypt(encryptedserverHTML, password);
        const decryptedHTML = bytes.toString(CryptoJS.enc.Utf8);

        // If successful, the decrypted string won't be empty
        if (decryptedHTML) {
          secureContainer.innerHTML = decryptedHTML;
          loginBtn.style.display = 'none'; // Hide the login button
        } else {
          alert("Incorrect password.");
        }
      } catch (error) {
        // If decryption fails entirely (wrong key)
        alert("Incorrect password.");
      }
    });
  }


});




