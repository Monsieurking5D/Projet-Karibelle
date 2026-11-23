/**
 * ============================================================================
 * [AGENT: CLAUDE] — js/quiz-and-impact.js
 * 1. Diagnostic Capillaire Interactif (protocole personnalisé des 4 soins)
 * 2. Simulateur d'impact 5 % Côte d'Ivoire (Section 4.2 bis du Business Plan)
 * 3. Accordéon FAQ Réglementaire & Produit (CE 1223/2009 · UE 2023/1545)
 *
 * Dépendance externe : window.KaribelleStore.addToCart({ scent, qty })
 * (fourni par js/store-core.js — Antigravity). Ne pas modifier ce contrat.
 * ============================================================================
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
   * 1. DIAGNOSTIC CAPILLAIRE
   * ------------------------------------------------------------------------ */

  const QUIZ_QUESTIONS = Object.freeze([
    {
      id: 'texture',
      question: 'Quelle est la nature principale de vos cheveux ?',
      subtitle: 'Karibelle s’adresse à toutes les textures bouclées, frisées et crépues, femmes et hommes.',
      choices: [
        { value: 'crepus', title: 'Crépus (Type 4A à 4C)', desc: 'Boucles très serrées en Z ou en S, besoin important de nutrition et de souplesse.' },
        { value: 'frises', title: 'Frisés (Type 3B à 3C)', desc: 'Ressorts définis mais sujets aux frisottis, à la sécheresse et aux nœuds.' },
        { value: 'boucles', title: 'Bouclés (Type 2C à 3A)', desc: 'Boucles souples qui cherchent définition et brillance sans être alourdies.' }
      ]
    },
    {
      id: 'profil',
      question: 'Comment portez-vous vos cheveux au quotidien ?',
      subtitle: 'Cette étape adapte les quantités de chaque soin à votre longueur.',
      choices: [
        { value: 'mi-longs', title: 'Mi-longs à longs · Afro libre ou Wash & Go', desc: 'Profil type Naomie : démêlage rapide et nutrition durable des longueurs.' },
        { value: 'courts-barbe', title: 'Courts, dégradés ou avec barbe', desc: 'Profil type Yann : une routine simple, claire et rapide.' },
        { value: 'protecteur', title: 'Coiffures protectrices', desc: 'Tresses, vanilles, twists, locks : priorité au cuir chevelu et aux pointes.' }
      ]
    },
    {
      id: 'objectif',
      question: 'Quel est votre objectif prioritaire ?',
      subtitle: 'Issu des hypothèses terrain du Business Plan Karibelle (sections 1.3 et 2.6).',
      choices: [
        { value: 'nutrition', title: 'Nutrition & souplesse', desc: 'Mes cheveux restent secs ou rêches après le lavage.' },
        { value: 'demelage', title: 'Démêlage facile, moins de casse', desc: 'Le démêlage est long et je perds beaucoup de cheveux.' },
        { value: 'routine', title: 'Routine complète, rapide & économique', desc: 'J’achète chez 3 ou 4 marques et je ne sais pas dans quel ordre utiliser mes produits.' },
        { value: 'cuir-chevelu', title: 'Confort du cuir chevelu', desc: 'Mon cuir chevelu tiraille, surtout sous mes coiffures.' }
      ]
    },
    {
      id: 'parfum',
      question: 'Quelle signature olfactive préférez-vous ?',
      subtitle: 'Les deux pistes parfumées étudiées par Karibelle (allergènes étiquetés selon le règlement UE 2023/1545).',
      choices: [
        { value: 'vanille', title: 'Karité & Vanille', desc: 'Notes enveloppantes et douces, associées à l’hibiscus.' },
        { value: 'lavande', title: 'Karité & Lavande', desc: 'Notes fraîches et aromatiques, agréables pendant le massage du cuir chevelu.' }
      ]
    }
  ]);

  const SCENT_LABELS = Object.freeze({ vanille: 'Karité & Vanille', lavande: 'Karité & Lavande' });

  const OBJECTIVE_FOCUS = Object.freeze({
    nutrition: { step: 'masque', label: 'Nutrition & souplesse' },
    demelage: { step: 'apres', label: 'Démêlage facile' },
    routine: { step: null, label: 'Routine complète & rapide' },
    'cuir-chevelu': { step: 'huile', label: 'Confort du cuir chevelu' }
  });

  /** Réponse valide uniquement si elle fait partie des choix proposés. */
  function isValidAnswer(qid, value) {
    const q = QUIZ_QUESTIONS.find((item) => item.id === qid);
    return Boolean(q && q.choices.some((c) => c.value === value));
  }

  function choiceTitle(qid, value) {
    const q = QUIZ_QUESTIONS.find((item) => item.id === qid);
    const c = q && q.choices.find((item) => item.value === value);
    return c ? c.title : '';
  }

  /* --- Règles de personnalisation (fonctions pures) ----------------------- */

  function shampooAdvice({ texture, profil }) {
    if (profil === 'protecteur') {
      return {
        freq: 'Tous les 7 à 10 jours',
        dose: '1 noisette diluée dans environ 3 fois son volume d’eau (flacon applicateur), appliquée raie par raie sur le cuir chevelu.'
      };
    }
    const freq = { crepus: '1 fois par semaine', frises: '1 à 2 fois par semaine', boucles: '2 fois par semaine' }[texture];
    const dose = profil === 'courts-barbe'
      ? '1 noisette, massée du bout des doigts sur le cuir chevelu.'
      : '1 à 2 noisettes concentrées sur le cuir chevelu ; la mousse qui coule suffit à rincer les longueurs.';
    return { freq, dose };
  }

  function conditionerAdvice({ profil, objectif }) {
    const dose = {
      'mi-longs': 'Généreusement, en 4 à 6 sections, des pointes vers les racines.',
      'courts-barbe': '1 noisette répartie aux doigts, rinçage après 1 à 2 minutes.',
      protecteur: 'Sur les longueurs et pointes visibles, sans charger les racines des tresses.'
    }[profil];
    const tip = objectif === 'demelage'
      ? 'Laissez poser 3 à 5 minutes puis démêlez d’abord aux doigts, ensuite au peigne à dents larges, section par section.'
      : 'Démêlez aux doigts ou au peigne à dents larges, des pointes vers les racines.';
    return { freq: 'Après chaque shampoing', dose, tip };
  }

  function maskAdvice({ texture, profil, objectif }) {
    const pose = texture === 'crepus'
      ? '20 à 30 minutes, idéalement sous une serviette chaude'
      : texture === 'frises' ? '15 à 20 minutes' : '10 minutes, sur les longueurs uniquement';
    const freq = texture === 'boucles' ? 'Toutes les 2 semaines' : '1 fois par semaine';
    const tip = profil === 'courts-barbe' || objectif === 'routine'
      ? 'Les jours pressés, il peut remplacer l’après-shampoing : une étape de moins.'
      : 'Appliquez-le à la place de l’après-shampoing une fois par semaine pour un soin plus intense.';
    return { freq, dose: `Temps de pose conseillé : ${pose}.`, tip };
  }

  function oilAdvice({ profil, objectif }) {
    const base = {
      'mi-longs': {
        freq: 'À chaque coiffage',
        dose: 'Quelques gouttes sur les pointes en dernière étape (méthode LOC/LCO) pour sceller l’hydratation.'
      },
      'courts-barbe': {
        freq: 'Chaque matin',
        dose: '2 à 3 gouttes sur cheveux légèrement humides, et sur la barbe.'
      },
      protecteur: {
        freq: '2 à 3 fois par semaine entre les lavages',
        dose: 'Quelques gouttes déposées le long des raies, puis massage du cuir chevelu.'
      }
    }[profil];
    const tip = objectif === 'cuir-chevelu'
      ? 'Massez 3 à 5 minutes du bout des doigts, par petits cercles. Évitez toute application sur une peau irritée ou lésée.'
      : 'Une fois par semaine, prenez 2 minutes pour masser le cuir chevelu avant le shampoing.';
    return { ...base, tip };
  }

  /** Construit le protocole complet à partir des réponses (pas d'effet de bord). */
  function buildProtocol(answers) {
    const focus = OBJECTIVE_FOCUS[answers.objectif] || OBJECTIVE_FOCUS.routine;
    const steps = [
      { key: 'shampoing', name: 'Shampoing « Douceur & Force »', size: '250 ml', ...shampooAdvice(answers) },
      { key: 'apres', name: 'Après-shampoing « Démêlage & Souplesse »', size: '250 ml', ...conditionerAdvice(answers) },
      { key: 'masque', name: 'Masque capillaire « Nutrition Intense »', size: '250 ml', ...maskAdvice(answers) },
      { key: 'huile', name: 'Huile de soin & massage « Brillance & Protection »', size: '100 ml', ...oilAdvice(answers) }
    ].map((step) => ({ ...step, isFocus: step.key === focus.step }));

    return {
      scent: answers.parfum === 'lavande' ? 'lavande' : 'vanille',
      focusLabel: focus.label,
      steps,
      isExpress: answers.objectif === 'routine'
    };
  }

  /* --- Rendu ------------------------------------------------------------- */

  let answers = {};
  let currentStep = 0;

  function renderProgress(progressEl) {
    progressEl.innerHTML = QUIZ_QUESTIONS
      .map((_, idx) => `<div class="quiz-progress__step ${idx <= currentStep ? 'is-active' : ''}"></div>`)
      .join('');
  }

  function renderQuestion(container) {
    const q = QUIZ_QUESTIONS[currentStep];
    const selectedVal = answers[q.id];
    container.innerHTML = `
      <span class="quiz-step-label">Étape ${currentStep + 1} sur ${QUIZ_QUESTIONS.length}</span>
      <h3 class="quiz-question-title" tabindex="-1">${q.question}</h3>
      <p class="quiz-question-subtitle">${q.subtitle}</p>
      <div class="quiz-options-grid">
        ${q.choices.map((c) => `
          <button type="button" class="quiz-choice-btn ${selectedVal === c.value ? 'is-selected' : ''}"
            data-quiz-qid="${q.id}" data-quiz-val="${c.value}" aria-pressed="${selectedVal === c.value}">
            <strong>${c.title}</strong>
            <span>${c.desc}</span>
          </button>`).join('')}
      </div>
      <div class="quiz-nav">
        ${currentStep > 0 ? '<button type="button" id="quiz-prev-btn" class="btn btn--outline btn--sm">← Question précédente</button>' : '<span></span>'}
        <span class="quiz-nav__hint">Cliquez sur une réponse pour continuer</span>
      </div>
    `;
  }

  function renderStep(step, idx) {
    return `
      <li class="quiz-protocol-step ${step.isFocus ? 'is-focus' : ''}">
        <div class="quiz-protocol-step__head">
          <span class="quiz-protocol-step__num" aria-hidden="true">${idx + 1}</span>
          <strong>${step.name} <span class="quiz-protocol-step__size">· ${step.size}</span></strong>
          ${step.isFocus ? '<span class="pill-badge pill-badge--solid quiz-protocol-step__badge">Soin clé pour vous</span>' : ''}
        </div>
        <dl class="quiz-protocol-step__meta">
          <div><dt>Fréquence</dt><dd>${step.freq}</dd></div>
          <div><dt>Quantité & geste</dt><dd>${step.dose}</dd></div>
        </dl>
        ${step.tip ? `<p class="quiz-protocol-step__tip">${step.tip}</p>` : ''}
      </li>`;
  }

  function renderResult(container) {
    const protocol = buildProtocol(answers);
    const scentLabel = SCENT_LABELS[protocol.scent];
    const profileChips = ['texture', 'profil', 'objectif']
      .map((qid) => `<li>${choiceTitle(qid, answers[qid])}</li>`)
      .join('');

    container.innerHTML = `
      <div class="quiz-result-box">
        <span class="pill-badge pill-badge--solid">✓ Diagnostic complété</span>
        <h3 class="quiz-question-title" tabindex="-1">Votre rituel Karibelle · ${scentLabel}</h3>
        <ul class="quiz-profile-chips" aria-label="Récapitulatif de vos réponses">${profileChips}</ul>
        <p class="quiz-result-intro">
          Voici comment utiliser les <strong>4 soins du coffret (44,90 € TTC)</strong> selon votre profil.
          Priorité : <strong>${protocol.focusLabel}</strong>.
        </p>
        ${protocol.isExpress ? `
          <p class="quiz-express-note">
            <strong>Routine express du jour de lavage :</strong> Shampoing → Après-shampoing <em>ou</em> Masque (en alternance) → Huile.
            Un seul coffret, un ordre clair, plus besoin d’assembler 3 ou 4 marques.
          </p>` : ''}
        <ol class="quiz-protocol">${protocol.steps.map(renderStep).join('')}</ol>
        <p class="quiz-disclaimer">
          Conseils d’utilisation indicatifs, fondés sur les gestes courants pour cheveux texturés. Le mode d’emploi définitif de chaque soin
          sera validé avec notre laboratoire et figurera sur l’étiquette. Les allergènes du parfum seront indiqués dans la liste des ingrédients
          (règlement UE 2023/1545) : en cas de peau sensible, faites un test au pli du coude 48 h avant la première utilisation.
        </p>
        <div class="quiz-result-actions">
          <button type="button" id="quiz-add-cart-btn" data-scent="${protocol.scent}" class="btn btn--primary">
            Précommander mon coffret ${scentLabel} · 44,90 €
          </button>
          <button type="button" id="quiz-restart-btn" class="btn btn--outline btn--sm">Refaire le diagnostic</button>
        </div>
      </div>
    `;
  }

  function renderQuiz({ moveFocus = false } = {}) {
    const container = document.getElementById('diagnostic-quiz-body');
    const progressEl = document.getElementById('diagnostic-quiz-progress');
    if (!container || !progressEl) return;

    renderProgress(progressEl);
    if (currentStep >= QUIZ_QUESTIONS.length) {
      renderResult(container);
    } else {
      renderQuestion(container);
    }

    if (moveFocus) {
      const title = container.querySelector('.quiz-question-title');
      if (title) title.focus({ preventScroll: true });
    }
  }

  function handleQuizClick(e) {
    const choiceBtn = e.target.closest('.quiz-choice-btn');
    if (choiceBtn) {
      const qid = choiceBtn.getAttribute('data-quiz-qid');
      const val = choiceBtn.getAttribute('data-quiz-val');
      if (!isValidAnswer(qid, val)) return;
      answers = { ...answers, [qid]: val };
      currentStep += 1;
      renderQuiz({ moveFocus: true });
      return;
    }

    if (e.target.closest('#quiz-prev-btn') && currentStep > 0) {
      currentStep -= 1;
      renderQuiz({ moveFocus: true });
      return;
    }

    if (e.target.closest('#quiz-restart-btn')) {
      answers = {};
      currentStep = 0;
      renderQuiz({ moveFocus: true });
      return;
    }

    const cartBtn = e.target.closest('#quiz-add-cart-btn');
    if (cartBtn) {
      const scent = cartBtn.getAttribute('data-scent') === 'lavande' ? 'lavande' : 'vanille';
      if (window.KaribelleStore && typeof window.KaribelleStore.addToCart === 'function') {
        window.KaribelleStore.addToCart({ scent, qty: 1 });
      } else {
        const coffret = document.getElementById('coffret');
        if (coffret) coffret.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  function initDiagnostic() {
    const quiz = document.getElementById('diagnostic-quiz');
    if (!quiz) return;
    renderQuiz();
    quiz.addEventListener('click', handleQuizClick);
  }

  /* --------------------------------------------------------------------------
   * 2. SIMULATEUR D'IMPACT 5 % (BP section 4.2 bis & 7.1)
   * ------------------------------------------------------------------------ */

  const COFFRET_PRICE_HT = 37.42; // 44,90 € TTC / 1,20
  const IMPACT_RATE = 0.05;
  const IMPACT_MILESTONES = Object.freeze([
    { qty: 300, label: 'Scénario prudent · Année 1' },
    { qty: 600, label: 'Scénario central · Année 1' },
    { qty: 900, label: 'Scénario favorable · Année 1' },
    { qty: 1200, label: 'Projection Année 2' },
    { qty: 2000, label: 'Projection Année 3' }
  ]);

  function computeImpact(coffrets) {
    const caHT = Math.round(coffrets * COFFRET_PRICE_HT);
    return { coffrets, caHT, reversementHT: Math.round(caHT * IMPACT_RATE) };
  }

  function nearestMilestone(coffrets) {
    return IMPACT_MILESTONES.reduce((best, m) =>
      Math.abs(m.qty - coffrets) < Math.abs(best.qty - coffrets) ? m : best
    );
  }

  function formatFr(n) {
    return n.toLocaleString('fr-FR');
  }

  function initImpactSimulator() {
    const slider = document.getElementById('impact-coffrets-slider');
    if (!slider) return;

    const coffretsOut = document.getElementById('impact-coffrets-val');
    const caOut = document.getElementById('impact-ca-val');
    const reversementOut = document.getElementById('impact-reversement-val');
    const milestoneBadge = document.getElementById('impact-milestone-label');
    const presets = document.querySelectorAll('[data-impact-preset]');

    function updateImpact() {
      const raw = parseInt(slider.value, 10);
      const { coffrets, caHT, reversementHT } = computeImpact(Number.isFinite(raw) ? raw : 600);

      if (coffretsOut) coffretsOut.textContent = `${formatFr(coffrets)} coffrets`;
      if (caOut) caOut.textContent = `${formatFr(caHT)} € HT`;
      if (reversementOut) reversementOut.textContent = `${formatFr(reversementHT)} €`;
      slider.setAttribute('aria-valuetext', `${formatFr(coffrets)} coffrets, ${formatFr(reversementHT)} euros reversés`);

      if (milestoneBadge) {
        const m = nearestMilestone(coffrets);
        milestoneBadge.textContent = m.qty === coffrets
          ? `${m.label} · ${formatFr(m.qty)} coffrets`
          : `Proche : ${m.label} (${formatFr(m.qty)})`;
      }

      presets.forEach((btn) => {
        const isActive = parseInt(btn.getAttribute('data-impact-preset'), 10) === coffrets;
        btn.classList.toggle('is-active', isActive);
        btn.setAttribute('aria-pressed', String(isActive));
      });
    }

    slider.addEventListener('input', updateImpact);
    presets.forEach((btn) => {
      btn.addEventListener('click', () => {
        slider.value = btn.getAttribute('data-impact-preset');
        updateImpact();
      });
    });

    updateImpact();
  }

  /* --------------------------------------------------------------------------
   * 3. FAQ ACCESSIBLE (aria-expanded / aria-controls)
   * ------------------------------------------------------------------------ */

  function setFaqItemState(item, isOpen) {
    item.classList.toggle('is-open', isOpen);
    const btn = item.querySelector('.faq-question');
    if (btn) btn.setAttribute('aria-expanded', String(isOpen));
  }

  function initFaqAccordion() {
    const items = Array.from(document.querySelectorAll('.faq-item'));
    items.forEach((item, idx) => {
      const btn = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      if (!btn || !answer) return;

      const answerId = answer.id || `faq-answer-${idx + 1}`;
      answer.id = answerId;
      answer.setAttribute('role', 'region');
      btn.setAttribute('aria-controls', answerId);
      setFaqItemState(item, item.classList.contains('is-open'));

      btn.addEventListener('click', () => {
        const willOpen = !item.classList.contains('is-open');
        items.forEach((other) => setFaqItemState(other, false));
        setFaqItemState(item, willOpen);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initDiagnostic();
    initImpactSimulator();
    initFaqAccordion();
  });
})();
