/**
 * Amr Waled Portfolio — High-Fidelity UI Sound Effects Engine (Web Audio API)
 * Zero external audio assets (0ms latency, 100% offline-ready, no 404s, no CORS issues).
 * Respects browser autoplay policy & persists user mute preferences.
 */

(function () {
  'use strict';

  // State
  let audioCtx = null;
  // Default muted for executive B2B audience; can be toggled on demand
  let isMuted = localStorage.getItem('amr_sfx_muted') !== 'false';

  // Initialize or resume AudioContext upon first user interaction
  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Synthesis Primitives
  function playTone(freqStart, freqEnd, duration, type = 'sine', gainLevel = 0.08) {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freqStart, ctx.currentTime);
      if (freqEnd && freqEnd !== freqStart) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(freqEnd, 20), ctx.currentTime + duration);
      }

      gain.gain.setValueAtTime(gainLevel, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // AudioContext suppressed or not supported
    }
  }

  // Sound Profiles
  const SFX = {
    // 1. Primary CTA & Action buttons (WhatsApp, Submit, Read Case Study, etc.)
    primaryBtn: function () {
      if (isMuted) return;
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        // Crisp pop with harmonic sheen
        playTone(420, 840, 0.08, 'triangle', 0.1);
        setTimeout(() => playTone(840, 1100, 0.05, 'sine', 0.05), 15);
      } catch (e) {}
    },

    // 2. Navigation, Links, Pills, Small controls
    navTick: function () {
      if (isMuted) return;
      playTone(1200, 600, 0.03, 'sine', 0.04);
    },

    // 3. Cards, Articles, Expanding items
    cardPop: function () {
      if (isMuted) return;
      playTone(220, 140, 0.09, 'sine', 0.08);
    },

    // 4. Toggle chime (unmute)
    chimeOn: function () {
      playTone(440, 660, 0.12, 'sine', 0.08);
      setTimeout(() => playTone(660, 880, 0.15, 'triangle', 0.06), 70);
    },

    // 5. Toggle chime (mute)
    chimeOff: function () {
      playTone(660, 440, 0.12, 'sine', 0.06);
    },

    // 6. WhatsApp Message / Notification Toast
    notification: function () {
      if (isMuted) return;
      playTone(600, 900, 0.1, 'sine', 0.09);
      setTimeout(() => playTone(900, 1200, 0.14, 'triangle', 0.08), 80);
    }
  };

  // Expose SFX globally for explicit calls
  window.AmrSFX = SFX;

  // Global Click Delegator
  document.addEventListener('click', function (e) {
    // Ensure AudioContext is awakened by this user gesture
    getAudioContext();

    const target = e.target;
    if (!target) return;

    // Check if clicked the sound toggle button itself
    if (target.closest('#sfx-toggle') || target.id === 'sfx-toggle') {
      return; // Handled separately
    }

    // Identify interactive elements
    const primaryBtn = target.closest('.btn-work, .btn-case, .hero-cta, .cta-btn, button[type="submit"], .wa-toast, #btn-ar, #btn-en, .wa-toast-icon-wrapper, .wa-toast-close');
    if (primaryBtn) {
      SFX.primaryBtn();
      return;
    }

    const card = target.closest('.work-card, .case-card, .blog-card, .service-card, .faq-item');
    if (card && !target.closest('a')) {
      SFX.cardPop();
      return;
    }

    const interactiveLink = target.closest('a, button, .nav-links a, .nav-dropdown, .filter-pill, .tag, input, select');
    if (interactiveLink) {
      SFX.navTick();
      return;
    }
  }, { capture: true, passive: true });

  // Floating Sound Toggle UI
  function injectSoundToggle() {
    if (document.getElementById('sfx-toggle')) return;

    const isEn = document.documentElement.lang === 'en' || window.location.pathname.includes('/en');
    const toggle = document.createElement('button');
    toggle.id = 'sfx-toggle';
    
    const labelOn = isEn ? 'SFX: Enabled' : 'المؤثرات: مفعلة';
    const labelOff = isEn ? 'SFX: Muted' : 'الصوت: معطل';

    toggle.setAttribute('aria-label', isMuted ? (isEn ? 'Unmute Sound Effects' : 'تشغيل المؤثرات الصوتية') : (isEn ? 'Mute Sound Effects' : 'كتم المؤثرات الصوتية'));
    toggle.setAttribute('title', isMuted ? (isEn ? 'Enable Sound' : 'تشغيل الصوت') : (isEn ? 'Mute Sound' : 'كتم الصوت'));
    toggle.innerHTML = `
      <span class="sfx-icon">${isMuted ? '🔇' : '🔊'}</span>
      <span class="sfx-text">${isMuted ? labelOff : labelOn}</span>
    `;

    // Modern floating glassmorphism styling
    toggle.style.cssText = `
      position: fixed;
      bottom: 24px;
      ${isEn ? 'right: 24px;' : 'left: 24px;'}
      z-index: 9999;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 14px;
      background: rgba(18, 18, 20, 0.88);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 9999px;
      color: #e4e4e7;
      font-family: inherit;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      box-shadow: 0 8px 24px rgba(0,0,0,0.4);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      user-select: none;
    `;

    toggle.addEventListener('mouseenter', () => {
      toggle.style.transform = 'translateY(-2px) scale(1.02)';
      toggle.style.borderColor = '#ea580c';
    });
    toggle.addEventListener('mouseleave', () => {
      toggle.style.transform = 'translateY(0) scale(1)';
      toggle.style.borderColor = 'rgba(255, 255, 255, 0.12)';
    });

    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      isMuted = !isMuted;
      localStorage.setItem('amr_sfx_muted', isMuted ? 'true' : 'false');

      const icon = toggle.querySelector('.sfx-icon');
      const text = toggle.querySelector('.sfx-text');
      if (icon) icon.textContent = isMuted ? '🔇' : '🔊';
      if (text) text.textContent = isMuted ? labelOff : labelOn;
      toggle.setAttribute('aria-label', isMuted ? (isEn ? 'Unmute Sound Effects' : 'تشغيل المؤثرات الصوتية') : (isEn ? 'Mute Sound Effects' : 'كتم المؤثرات الصوتية'));
      toggle.setAttribute('title', isMuted ? (isEn ? 'Enable Sound' : 'تشغيل الصوت') : (isEn ? 'Mute Sound' : 'كتم الصوت'));

      if (!isMuted) {
        SFX.chimeOn();
      } else {
        SFX.chimeOff();
      }
    });

    document.body.appendChild(toggle);
  }

  // Hook notification toast to custom sound
  function hookWhatsAppToast() {
    const waToast = document.getElementById('waToast');
    if (waToast) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            if (waToast.classList.contains('show')) {
              SFX.notification();
            }
          }
        });
      });
      observer.observe(waToast, { attributes: true });
    }
  }

  // Init once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      injectSoundToggle();
      hookWhatsAppToast();
    });
  } else {
    injectSoundToggle();
    hookWhatsAppToast();
  }
})();
