/**
 * Interactive Pricing Cards - JavaScript Logic
 * -------------------------------------------------------------
 * Features:
 * - Dynamic Monthly/Yearly billing toggle switch with smooth price animations
 * - Category filter (All / Basic / Premium) with smooth entrance transitions
 * - Button click micro-interactions (ripple wave effect)
 * - Interactive toast feedback notification upon plan selection
 * - Full keyboard accessibility (ARIA state management)
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Element References ---
  const billingToggle = document.getElementById('billingToggle');
  const labelMonthly = document.getElementById('labelMonthly');
  const labelYearly = document.getElementById('labelYearly');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const planCards = document.querySelectorAll('.plan-card');
  const emptyState = document.getElementById('emptyState');
  const resetFilterBtn = document.getElementById('resetFilterBtn');
  const toastContainer = document.getElementById('toastContainer');

  // Category counts
  const countAll = document.getElementById('countAll');
  const countBasic = document.getElementById('countBasic');
  const countPremium = document.getElementById('countPremium');

  // Application State
  let currentPeriod = 'monthly'; // 'monthly' | 'yearly'
  let currentFilter = 'all';     // 'all' | 'basic' | 'premium'

  // =========================================================================
  // 1. BILLING CYCLE TOGGLE LOGIC
  // =========================================================================

  /**
   * Updates pricing numbers and billing notes across all cards
   * @param {'monthly' | 'yearly'} period 
   */
  const updatePricing = (period) => {
    currentPeriod = period;
    const isYearly = period === 'yearly';

    // Update switch accessibility & visual state
    if (billingToggle) {
      billingToggle.setAttribute('aria-checked', String(isYearly));
    }

    // Update active state on labels
    if (labelMonthly) labelMonthly.classList.toggle('active', !isYearly);
    if (labelYearly) labelYearly.classList.toggle('active', isYearly);

    // Update each pricing card with animation
    planCards.forEach((card) => {
      const priceNumberEl = card.querySelector('.price-number');
      const billingNoteEl = card.querySelector('.billing-note');

      if (!priceNumberEl) return;

      // Extract prices from data attributes
      const targetPrice = isYearly 
        ? priceNumberEl.dataset.yearly 
        : priceNumberEl.dataset.monthly;

      const targetNote = isYearly 
        ? billingNoteEl?.dataset.yearlyNote 
        : billingNoteEl?.dataset.monthlyNote;

      // Trigger smooth CSS animation
      priceNumberEl.classList.remove('animating');
      // Trigger reflow to restart animation
      void priceNumberEl.offsetWidth;
      priceNumberEl.classList.add('animating');

      // Update text values
      priceNumberEl.textContent = targetPrice;
      if (billingNoteEl && targetNote) {
        billingNoteEl.textContent = targetNote;
      }
    });
  };

  /**
   * Toggles between monthly and yearly billing
   */
  const toggleBillingPeriod = () => {
    const nextPeriod = currentPeriod === 'monthly' ? 'yearly' : 'monthly';
    updatePricing(nextPeriod);
  };

  // Event Listeners for billing controls
  if (billingToggle) {
    billingToggle.addEventListener('click', toggleBillingPeriod);
    
    // Keyboard support for switch (Space & Enter)
    billingToggle.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggleBillingPeriod();
      }
    });
  }

  if (labelMonthly) {
    labelMonthly.addEventListener('click', () => {
      if (currentPeriod !== 'monthly') updatePricing('monthly');
    });
  }

  if (labelYearly) {
    labelYearly.addEventListener('click', () => {
      if (currentPeriod !== 'yearly') updatePricing('yearly');
    });
  }

  // =========================================================================
  // 2. CATEGORY FILTER LOGIC
  // =========================================================================

  /**
   * Sets the active state styling & ARIA attribute for filter buttons
   * @param {HTMLButtonElement} activeButton 
   */
  const setFilterActiveState = (activeButton) => {
    filterButtons.forEach((btn) => {
      const isActive = btn === activeButton;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });
  };

  /**
   * Applies the category filter to visible cards with staggered entrance animation
   * @param {string} filterCategory 
   */
  const applyFilter = (filterCategory) => {
    currentFilter = filterCategory;
    let visibleCount = 0;

    planCards.forEach((card) => {
      const cardCategory = card.dataset.category;
      const isMatch = filterCategory === 'all' || cardCategory === filterCategory;

      // Remove existing animation class
      card.classList.remove('anim-fade-in');

      if (isMatch) {
        card.classList.remove('hidden');
        // Stagger entrance animation
        card.style.animationDelay = `${visibleCount * 60}ms`;
        // Trigger reflow & re-apply animation
        void card.offsetWidth;
        card.classList.add('anim-fade-in');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });

    // Handle empty state if no cards match
    if (emptyState) {
      emptyState.classList.toggle('hidden', visibleCount > 0);
    }
  };

  // Attach click listeners to filter buttons
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setFilterActiveState(button);
      const selectedFilter = button.dataset.filter;
      applyFilter(selectedFilter);
    });
  });

  // Reset filter button in empty state
  if (resetFilterBtn) {
    resetFilterBtn.addEventListener('click', () => {
      const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
      if (allBtn) {
        setFilterActiveState(allBtn);
        applyFilter('all');
      }
    });
  }

  /**
   * Calculates and updates the badge counters on the filter tabs
   */
  const updateCategoryCounts = () => {
    let basicCount = 0;
    let premiumCount = 0;

    planCards.forEach((card) => {
      if (card.dataset.category === 'basic') basicCount++;
      if (card.dataset.category === 'premium') premiumCount++;
    });

    if (countAll) countAll.textContent = String(planCards.length);
    if (countBasic) countBasic.textContent = String(basicCount);
    if (countPremium) countPremium.textContent = String(premiumCount);
  };

  // =========================================================================
  // 3. MICRO-INTERACTION: BUTTON CLICK RIPPLE EFFECT
  // =========================================================================

  /**
   * Creates a tactile water ripple animation expanding from click coordinates
   * @param {MouseEvent} event 
   * @param {HTMLElement} target 
   */
  const createRippleEffect = (event, target) => {
    const rect = target.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');

    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    target.appendChild(ripple);

    // Clean up DOM after animation finishes
    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  };

  // Attach ripple to all CTA buttons and filter buttons
  const interactiveButtons = document.querySelectorAll('.cta-button, .filter-btn');
  interactiveButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      createRippleEffect(e, btn);
    });
  });

  // =========================================================================
  // 4. MICRO-INTERACTION: TOAST FEEDBACK NOTIFICATION
  // =========================================================================

  /**
   * Shows a sleek interactive toast notification when a plan is selected
   * @param {string} planTitle 
   * @param {string} price 
   * @param {string} cycle 
   */
  const showPlanToast = (planTitle, price, cycle) => {
    if (!toastContainer) return;

    // Remove older toasts if any exist
    const existingToast = toastContainer.querySelector('.toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');

    toast.innerHTML = `
      <svg class="toast-icon" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
      </svg>
      <div class="toast-content">
        <span class="toast-title">${planTitle} Plan Selected</span>
        <span class="toast-desc">$${price}/mo (${cycle === 'yearly' ? 'billed annually' : 'billed monthly'})</span>
      </div>
      <button class="toast-close" type="button" aria-label="Close notification">&times;</button>
    `;

    const closeBtn = toast.querySelector('.toast-close');
    const dismissToast = () => {
      toast.classList.add('toast-hiding');
      toast.addEventListener('transitionend', () => toast.remove());
    };

    closeBtn.addEventListener('click', dismissToast);

    // Auto dismiss after 3.8 seconds
    const autoDismissTimer = setTimeout(dismissToast, 3800);
    toast.addEventListener('mouseenter', () => clearTimeout(autoDismissTimer));

    toastContainer.appendChild(toast);
  };

  // Attach CTA selection handler
  const ctaButtons = document.querySelectorAll('.cta-button');
  ctaButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.plan-card');
      if (!card) return;

      const planTitle = card.querySelector('.plan-title')?.textContent.trim() || 'Custom';
      const priceNumberEl = card.querySelector('.price-number');
      const currentPrice = priceNumberEl?.textContent.trim() || '0';

      showPlanToast(planTitle, currentPrice, currentPeriod);
    });
  });

  // =========================================================================
  // 5. INITIALIZATION
  // =========================================================================
  updateCategoryCounts();
  updatePricing('monthly');
  applyFilter('all');
});
