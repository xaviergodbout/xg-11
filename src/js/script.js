(function () {
  'use strict';

  const encryptedserverHTML = "";

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    updateCurrentYear();
    registerServiceWorker();
    initInstallPrompt();
    initSecureServerLinks();
  }

  function updateCurrentYear() {
    const currentYear = document.getElementById('currentYear');

    if (currentYear) {
      currentYear.textContent = new Date().getFullYear();
    }
  }

  function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;

    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch((error) => {
        console.warn('Service worker registration failed:', error);
      });
    });
  }

  function initInstallPrompt() {
    let deferredPrompt = null;
    let installButton = null;

    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      deferredPrompt = event;

      installButton = installButton || createInstallButton();
      installButton.hidden = false;
    });

    window.addEventListener('appinstalled', () => {
      deferredPrompt = null;

      if (installButton) {
        installButton.hidden = true;
      }
    });

    function createInstallButton() {
      const button = document.createElement('button');

      button.type = 'button';
      button.id = 'install-button';
      button.textContent = '📱 Install App';
      button.hidden = true;

      button.addEventListener('click', async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        await deferredPrompt.userChoice;

        deferredPrompt = null;
        button.hidden = true;
      });

      document.body.appendChild(button);

      return button;
    }
  }

  function initSecureServerLinks() {
    const loginBtn = document.getElementById('server-login-btn');
    const secureContainer = document.getElementById('secure-server-links');
    const encryptedserverHTML = "U2FsdGVkX1/+nMGEnBSLeT8piwEZ6TJqYQpzRYvI+8WbtmzjO0Lgtbd5Ty6Bp1Izs8hGO4N7Uc5E5HWWEJnXWVaKoA/dEZTQ44tS4UyIDzZk9wVBWYA5F9HGL5Y4GipbR5cwaAaMaoL/xvjyTDsfw+NGXjAwwXtmV6T3JsFGLzexpKvfFpbspqzT08oXEgj4vMf6hIVBm0vov9ERQ2/ph4nQB2XkYZTqNZVsNhlLKfhVgk4hMVEOF1Psbw9E8RrWdAm8PAPZPTB47jF63iB7AJ24EhRYpbWdobzq//7sCqtmG8pL6tQuJw+Fnbd8sc9N08/+Jg0QNTHn/5nPTbrYUwrEj21CqKpk63R4WuE1Xt1UcBaysVRaO5al97Co+Wp6nLnO3b2oxhNLqmTSrFK2/Nd0tKE5yoiX8n2nv48amHb5m+mBWyilnh4UC04Cw32MsFUE5Z16too7Jx8u/VmP8O/Ec5YSYWbdsktD8Ne3YbdSYqiDIh6U2O6X1aLddHIyx367NrNDaKQ3DHiAoPdimzL2cf7i6lxg7HrA2o0NjIuHSC1H3NjQEvylTNAt60/Q6n3HWZ5m244MhkQ6Cr8TbOPnNLY+GnLs0WUKlgLDfiN+damP6VsKs1uVdK9TzMfVC7fKSGNbcRwk7dkT+OmrPSWaT0AiUB+rKD6OWic/XbOBAdf0/iLdnSzCfD8/pey6w/w2CnNWrLH8A0DhXwJ7Oi7xlG3xKpjPzQFlLt2Bf6M2j/jPBweb6Tloy92ceydaFFc1f4X7ElWMC7kAKXDpjgHOC3iL+GlirZxpDSwWvnyDDRb5gU3AcSJVeYsdHma9ZfIj6pso64/ELsypPt1TeBj+qAAFGYvQq107TFAxB8ToOyiNGl2hPVYaHDsjtKadO/c0XYEqQG4fPMYgU664tzK8f6+Lwb+ymnrdldGZ/+WhNez4WxfL8Pj4xAl8yZLi7SXaahoA54XjCu88E6czOO7jmSVKwYfSoJEcwlPSiqfp/yMMl9nKJAL+kXXd6ISJf2swz7ndfmsurUDuhAKIJB8ayQxnfY8x5R2futSSUTpwY+Buf6Gfv+SuH+nFVaug3hJlOqQTT9ewZ7CVlT6o26ZR6hxPQBUzdnjXr1ihjMXESAMJUlseUCgNDEUCusfk2Cfuqnokgwf6Ly0Qz/bfbDOwAHxqmAlgB4fbhcq9oQuoBexfZOCcChlvIdcP2RXnh/hlG2xl7CH3POSWiLiIlXkqqPr1qbDqtrACpqkdOkctFyKySQu3I90EBNfjIZCNu4NbTnEYHMvjW/oA7notjOXvT/IChAgMJTGxoUgVHgvXefXLO3BuhpeJq/Ru0aOR+iI5kXSMvwmpCK3ILXuvAxRj5zUF9LihdeLmX0WOfX2FDxAsR4Fu6w42dmyUiycj1srQb6b/t7MxmeuI09jF0FHknmGfFv0ehQvj40IEYN8="; 


    if (!loginBtn || !secureContainer || typeof CryptoJS === 'undefined') return;

    loginBtn.addEventListener('click', () => {
      const password = prompt('Enter the password to view server links:');

      if (!password) return;

      try {
        const bytes = CryptoJS.AES.decrypt(encryptedserverHTML, password);
        const decryptedHTML = bytes.toString(CryptoJS.enc.Utf8);

        if (!decryptedHTML) {
          alert('Incorrect password.');
          return;
        }

        secureContainer.innerHTML = decryptedHTML;
        loginBtn.hidden = true;
        loginBtn.setAttribute('aria-expanded', 'true');
      } catch (error) {
        alert('Incorrect password.');
      }
    });
  }
}());
