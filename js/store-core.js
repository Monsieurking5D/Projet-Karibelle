/**
 * ============================================================================
 * [AGENT: ANTIGRAVITY] — js/store-core.js
 * Gestion du Coffret Karibelle (44,90 € TTC / 37,42 € HT), galerie photos,
 * sélecteur de parfum (Karité & Vanille / Karité & Lavande), panier & précommande.
 * ============================================================================
 */

(function () {
  const COFFRET_PRICE_TTC = 44.90;
  const COFFRET_PRICE_HT = 37.42;
  const COFFRET_IMPACT_HT = 1.87; // 5 % du CA HT reversé à la coopérative de Côte d'Ivoire
  const SHIPPING_PARTICIPATION = 3.00; // Hypothèse BP section 4.4 / 6.2 (offert dès 2 coffrets)

  const state = {
    selectedScent: 'vanille',
    cart: []
  };

  function formatEuro(val) {
    return val.toFixed(2).replace('.', ',') + ' €';
  }

  function loadCart() {
    try {
      const saved = localStorage.getItem('karibelle_cart_v1');
      if (saved) state.cart = JSON.parse(saved);
    } catch (e) {
      state.cart = [];
    }
  }

  function saveCart() {
    try {
      localStorage.setItem('karibelle_cart_v1', JSON.stringify(state.cart));
    } catch (e) {}
  }

  function getScentLabel(scentKey) {
    return scentKey === 'lavande'
      ? 'Karité & Lavande Douce'
      : 'Karité & Vanille Chaude';
  }

  function addToCart(options = {}) {
    const scent = options.scent || state.selectedScent || 'vanille';
    const qty = options.qty || 1;
    const itemId = 'coffret-4-soins-' + scent;

    const existing = state.cart.find((item) => item.id === itemId);
    if (existing) {
      existing.qty += qty;
    } else {
      state.cart.push({
        id: itemId,
        title: 'Coffret Rituel Capillaire Karibelle (4 soins · 850 ml)',
        scent: scent,
        scentLabel: getScentLabel(scent),
        priceTTC: COFFRET_PRICE_TTC,
        priceHT: COFFRET_PRICE_HT,
        impactHT: COFFRET_IMPACT_HT,
        qty: qty,
        image: 'assets/coffret-complet.jpg'
      });
    }

    saveCart();
    renderCart();
    openCartDrawer();
  }

  function updateQty(itemId, delta) {
    const idx = state.cart.findIndex((i) => i.id === itemId);
    if (idx === -1) return;
    state.cart[idx].qty += delta;
    if (state.cart[idx].qty <= 0) {
      state.cart.splice(idx, 1);
    }
    saveCart();
    renderCart();
  }

  function openCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-backdrop');
    if (drawer && backdrop) {
      drawer.classList.add('is-open');
      backdrop.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
    }
  }

  function closeCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-backdrop');
    if (drawer && backdrop) {
      drawer.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
    }
  }

  function renderCart() {
    const totalQty = state.cart.reduce((acc, item) => acc + item.qty, 0);
    const badge = document.getElementById('cart-count-badge');
    if (badge) badge.textContent = String(totalQty);

    const container = document.getElementById('cart-items-container');
    const summaryEl = document.getElementById('cart-summary-container');
    if (!container || !summaryEl) return;

    if (state.cart.length === 0) {
      container.innerHTML = `
        <div style="text-align:center;padding:36px 16px;color:#5A3A26">
          <p style="font-family:'Lora',serif;font-size:1.2rem;margin:0 0 8px;color:#3E2314">Votre panier de précommande est vide</p>
          <p style="font-size:0.94rem;margin:0 0 20px">Découvrez le coffret complet de 4 soins au karité (Shampoing, Après-shampoing, Masque et Huile de soin).</p>
        </div>
      `;
      summaryEl.innerHTML = '';
      return;
    }

    const subtotalTTC = state.cart.reduce((acc, item) => acc + item.priceTTC * item.qty, 0);
    const totalImpact = state.cart.reduce((acc, item) => acc + item.impactHT * item.qty, 0);
    const shipping = totalQty >= 2 ? 0 : SHIPPING_PARTICIPATION;
    const finalTotal = subtotalTTC + shipping;

    container.innerHTML = state.cart
      .map(
        (item) => `
        <div style="display:flex;gap:14px;padding:14px;background:#FFFFFF;border:1px solid #E8D5BA;border-radius:12px;margin-bottom:12px;align-items:center">
          <img src="${item.image}" alt="${item.title}" style="width:68px;height:68px;object-fit:cover;border-radius:8px;flex-shrink:0">
          <div style="flex:1;min-width:0">
            <strong style="display:block;font-size:0.96rem;color:#3E2314">${item.title}</strong>
            <span style="display:block;font-size:0.84rem;color:#9A4F26;font-weight:600">Parfum : ${item.scentLabel}</span>
            <span style="display:block;font-size:0.82rem;color:#7A5230">Dont ${formatEuro(item.impactHT * item.qty)} reversés à la coopérative (5 % HT)</span>
            <div style="display:flex;align-items:center;justify-content:space-between;margin-top:8px">
              <div style="display:inline-flex;align-items:center;gap:8px;background:#FDF5EA;border:1px solid #E8D5BA;border-radius:999px;padding:2px 8px">
                <button type="button" data-cart-action="dec" data-item-id="${item.id}" style="border:0;background:none;font-weight:700;cursor:pointer;color:#3E2314;padding:2px 6px">−</button>
                <span style="font-weight:700;font-size:0.9rem">${item.qty}</span>
                <button type="button" data-cart-action="inc" data-item-id="${item.id}" style="border:0;background:none;font-weight:700;cursor:pointer;color:#3E2314;padding:2px 6px">+</button>
              </div>
              <strong style="font-size:1rem;color:#3E2314">${formatEuro(item.priceTTC * item.qty)}</strong>
            </div>
          </div>
        </div>
      `
      )
      .join('');

    summaryEl.innerHTML = `
      <div style="background:#FDF5EA;border:1px solid #C8923A;border-radius:10px;padding:10px 14px;margin-bottom:14px;font-size:0.85rem;color:#3E2314">
        🌍 <strong>Impact solidaire Côte d'Ivoire :</strong> votre commande génère <strong>${formatEuro(totalImpact)} HT</strong> (5 % du CA HT) pour la coopérative de productrices de karité.
      </div>
      <div style="display:flex;justify-content:space-between;font-size:0.94rem;margin-bottom:6px;color:#5A3A26">
        <span>Sous-total TTC (${totalQty} coffret${totalQty > 1 ? 's' : ''})</span>
        <strong>${formatEuro(subtotalTTC)}</strong>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:0.94rem;margin-bottom:10px;color:#5A3A26">
        <span>Participation livraison France ${totalQty >= 2 ? '(Offerte dès 2 coffrets)' : ''}</span>
        <strong>${shipping === 0 ? 'Offerte' : formatEuro(shipping)}</strong>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:1.15rem;font-weight:700;padding-top:10px;border-top:1px solid #E8D5BA;margin-bottom:14px;color:#3E2314">
        <span>Total Précommande TTC</span>
        <span>${formatEuro(finalTotal)}</span>
      </div>
      <button type="button" id="checkout-preorder-btn" class="btn btn--primary" style="width:100%">
        Réserver ma précommande (Série #1 · 600 coffrets)
      </button>
      <p style="margin:8px 0 0;font-size:0.78rem;color:#7A5230;text-align:center">
        Campagne de pré-lancement EDC Paris · Aucun débit immédiat avant validation du lot #1.
      </p>
    `;
  }

  function initGalleryAndScents() {
    // Gallery thumbnails
    const mainImg = document.getElementById('coffret-main-image');
    const thumbs = document.querySelectorAll('.gallery-thumb');
    thumbs.forEach((btn) => {
      btn.addEventListener('click', () => {
        const src = btn.getAttribute('data-full-src');
        const alt = btn.getAttribute('data-full-alt');
        if (mainImg && src) {
          mainImg.src = src;
          if (alt) mainImg.alt = alt;
        }
        thumbs.forEach((t) => t.classList.remove('is-active'));
        btn.classList.add('is-active');
      });
    });

    // Scent selection
    const scentBtns = document.querySelectorAll('.scent-option-btn');
    scentBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const scent = btn.getAttribute('data-scent');
        if (!scent) return;
        state.selectedScent = scent;
        scentBtns.forEach((b) => {
          b.classList.toggle('is-selected', b.getAttribute('data-scent') === scent);
          b.setAttribute('aria-pressed', b.getAttribute('data-scent') === scent ? 'true' : 'false');
        });
        const labelSpan = document.getElementById('selected-scent-display');
        if (labelSpan) labelSpan.textContent = getScentLabel(scent);
      });
    });

    // Main Add to Cart button
    const addBtn = document.getElementById('add-coffret-btn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        addToCart({ scent: state.selectedScent, qty: 1 });
      });
    }

    // Cart Drawer buttons
    const openBtn = document.getElementById('open-cart-btn');
    const closeBtn = document.getElementById('close-cart-btn');
    const backdrop = document.getElementById('cart-backdrop');
    if (openBtn) openBtn.addEventListener('click', openCartDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeCartDrawer);
    if (backdrop) backdrop.addEventListener('click', closeCartDrawer);

    // Delegate cart item actions & checkout
    document.addEventListener('click', (e) => {
      const actionBtn = e.target.closest('[data-cart-action]');
      if (actionBtn) {
        const action = actionBtn.getAttribute('data-cart-action');
        const itemId = actionBtn.getAttribute('data-item-id');
        updateQty(itemId, action === 'inc' ? 1 : -1);
      }

      if (e.target && e.target.id === 'checkout-preorder-btn') {
        closeCartDrawer();
        const waitlistSection = document.getElementById('liste');
        if (waitlistSection) {
          waitlistSection.scrollIntoView({ behavior: 'smooth' });
          const banner = document.getElementById('preorder-prefill-notice');
          if (banner) {
            banner.style.display = 'block';
            banner.innerHTML = `<strong>✨ Coffret (${getScentLabel(state.selectedScent)}) sélectionné !</strong> Confirmez votre adresse e-mail ci-dessous pour bloquer votre place prioritaire sur la 1<sup>re</sup> série limitée de 600 coffrets à 44,90 € TTC.`;
          }
          const radio = document.querySelector(`input[name="parfum"][value="${state.selectedScent}"]`);
          if (radio) radio.checked = true;
          const priceSelect = document.getElementById('prix');
          if (priceSelect && !priceSelect.value) priceSelect.value = '44.90';
        }
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    initGalleryAndScents();
    renderCart();
  });

  window.KaribelleStore = {
    addToCart,
    openCartDrawer,
    closeCartDrawer
  };
})();
