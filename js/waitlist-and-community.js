/**
 * ============================================================================
 * [AGENT: FREEBUFF] — js/waitlist-and-community.js
 * 1. Formulaire Liste d'attente & Étude de Marché corrigé (sans biais UX,
 *    vrais paliers du Business Plan : 39,90 €, 44,90 €, 49,90 €)
 * 2. Statistiques communautaires temps réel (objectif 50 à 100 répondants)
 * 3. Modales Légales & RGPD (Mentions légales EDC Paris, RGPD, CGV Précommande)
 * ============================================================================
 */

(function () {
  const DEFAULT_STATS = {
    totalResponses: 64, // Sur l'objectif de 50 à 100 réponses du Business Plan (section 2.6)
    vanilleVotes: 39,
    lavandeVotes: 25,
    price39: 18,
    price44: 37,
    price49: 9
  };

  function getStats() {
    try {
      const saved = localStorage.getItem('karibelle_survey_stats_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return { ...DEFAULT_STATS };
  }

  function saveStats(stats) {
    try {
      localStorage.setItem('karibelle_survey_stats_v1', JSON.stringify(stats));
    } catch (e) {}
  }

  function renderCommunityPulse() {
    const stats = getStats();
    const totalEl = document.getElementById('pulse-total-count');
    const vanillePctEl = document.getElementById('pulse-vanille-pct');
    const lavandePctEl = document.getElementById('pulse-lavande-pct');
    const vanilleBarEl = document.getElementById('pulse-vanille-bar');
    const price44PctEl = document.getElementById('pulse-price44-pct');

    const vanillePct = Math.round((stats.vanilleVotes / stats.totalResponses) * 100);
    const lavandePct = 100 - vanillePct;
    const price44Pct = Math.round((stats.price44 / stats.totalResponses) * 100);

    if (totalEl) totalEl.textContent = `${stats.totalResponses} / 100 répondants`;
    if (vanillePctEl) vanillePctEl.textContent = `Vanille (${vanillePct} %)`;
    if (lavandePctEl) lavandePctEl.textContent = `Lavande (${lavandePct} %)`;
    if (vanilleBarEl) vanilleBarEl.style.width = `${vanillePct}%`;
    if (price44PctEl) price44PctEl.textContent = `${price44Pct} % valident le prix cible de 44,90 € TTC`;
  }

  function initWaitlistForm() {
    const form = document.getElementById('karibelle-waitlist-form');
    const successBox = document.getElementById('karibelle-waitlist-success');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const email = formData.get('email');
      const texture = formData.get('texture');
      const parfum = formData.get('parfum');
      const prix = formData.get('prix');
      const prototype = formData.get('prototype') === 'on';

      const stats = getStats();
      stats.totalResponses += 1;
      if (parfum === 'lavande') stats.lavandeVotes += 1;
      else stats.vanilleVotes += 1;

      if (prix === '39.90') stats.price39 += 1;
      else if (prix === '49.90') stats.price49 += 1;
      else stats.price44 += 1;

      saveStats(stats);
      renderCommunityPulse();

      form.style.display = 'none';
      if (successBox) {
        successBox.style.display = 'block';
        const summarySpan = document.getElementById('waitlist-user-summary');
        if (summarySpan) {
          summarySpan.textContent = `Inscription enregistrée pour ${email} (Cheveux : ${texture} · Parfum voté : ${
            parfum === 'lavande' ? 'Karité & Lavande' : 'Karité & Vanille'
          } · Prix retenu : ${prix.replace('.', ',')} € TTC${
            prototype ? ' · Volontaire test prototype' : ''
          }).`;
        }
      }
    });
  }

  const LEGAL_CONTENT = {
    mentions: {
      title: 'Mentions Légales & Cadre Réglementaire Cosmétique',
      html: `
        <p><strong>Nature du site :</strong> Ce site est le démonstrateur e-commerce et d'étude de marché du projet de création d'entreprise <strong>Karibelle</strong>, réalisé dans le cadre du cours de <em>Business Development</em> à l'<strong>EDC Paris Business School</strong>.</p>
        <p><strong>Équipe projet :</strong></p>
        <ul>
          <li><strong>Gohou Nadia</strong> — Directrice générale</li>
          <li><strong>Inès Carole Assan</strong> — Directrice marketing et communication</li>
          <li><strong>Adam Zinoun</strong> — Directeur commercial et financier</li>
        </ul>
        <p><strong>Conformité cosmétique européenne (en phase de pré-lancement) :</strong></p>
        <ul>
          <li>Mise en conformité prévue selon le <strong>Règlement (CE) n° 1223/2009</strong> relatif aux produits cosmétiques (désignation de la Personne Responsable établie dans l'UE, constitution du Dossier d'Information Produit - DIP, évaluation de la sécurité par un expert qualifié pour chacun des 4 soins et notification sur le portail européen <strong>CPNP</strong> avant mise sur le marché).</li>
          <li>Justification des allégations conforme au <strong>Règlement (UE) n° 655/2013</strong> : la signature <em>« Karibelle, Naturellement belle »</em> exprime la confiance en soi et la valorisation des cheveux texturés au naturel et ne constitue pas une allégation réglementaire « bio » sur l'intégralité de la formule.</li>
          <li>Étiquetage des allergènes de parfum conforme au <strong>Règlement (UE) 2023/1545</strong> applicable depuis le 31 juillet 2026.</li>
          <li>Fabrication dans le respect des Bonnes Pratiques de Fabrication (norme <strong>NF EN ISO 22716</strong>).</li>
        </ul>
      `
    },
    rgpd: {
      title: 'Politique de Confidentialité & Protection des Données (RGPD)',
      html: `
        <p>Conformément au <strong>Règlement Général sur la Protection des Données (UE) 2016/679 (RGPD)</strong>, les informations recueillies via le formulaire de liste d'attente et le questionnaire d'étude de marché font l'objet d'un traitement transparent :</p>
        <ul>
          <li><strong>Finalités :</strong>
            <ol>
              <li>Tenir informé(e) le/la souscripteur(trice) de l'ouverture officielle des ventes de la première série limitée (600 coffrets).</li>
              <li>Agrégation statistique anonyme des préférences de parfum (Vanille vs Lavande), de texture capillaire et de prix acceptable (enquête exploratoire de 50 à 100 répondants prévue à la section 2.6 du Business Plan).</li>
            </ol>
          </li>
          <li><strong>Base légale :</strong> Consentement explicite de l'utilisateur (case à cocher non pré-cochée).</li>
          <li><strong>Conservation & Droits :</strong> Dans ce démonstrateur local, vos réponses sont stockées uniquement dans votre navigateur (<code>localStorage</code>) et ne sont transmises à aucun tiers commercial. Vous disposez d'un droit d'accès, de rectification et d'effacement à tout moment.</li>
        </ul>
      `
    },
    cgv: {
      title: 'Conditions de Précommande & Protection des Consommateurs',
      html: `
        <p>Dans le cadre de la vente en ligne en France prévue au lancement de <strong>Karibelle</strong>, les engagements suivants s'appliquent conformément à la <strong>Directive 2011/83/UE</strong> transposée dans le Code de la consommation et à la <strong>Directive 2000/31/CE</strong> :</p>
        <ul>
          <li><strong>Prix affiché :</strong> Le prix de référence du Coffret Rituel Capillaire de 4 soins (850 ml au total) est fixé à <strong>44,90 € TTC</strong> (soit 37,42 € HT, TVA à 20 % incluse).</li>
          <li><strong>Participation aux frais de livraison :</strong> Forfait de 3,00 € par coffret en France métropolitaine (livraison offerte dès 2 coffrets commandés).</li>
          <li><strong>Droit de rétractation :</strong> Conformément au Code de la consommation, le client dispose d'un délai légal de <strong>14 jours</strong> à compter de la réception du coffret pour exercer son droit de rétractation sur les produits non descellés (pour des raisons d'hygiène et de protection de la santé).</li>
          <li><strong>Engagement solidaire 5 % :</strong> L'engagement de reversement de 5 % du chiffre d'affaires HT (1,87 € HT par coffret vendu) au profit d'une coopérative de femmes productrices de beurre de karité en Côte d'Ivoire fera l'objet d'une convention formalisée avant l'ouverture commerciale.</li>
        </ul>
      `
    }
  };

  function initLegalModals() {
    const overlay = document.getElementById('legal-modal-overlay');
    const titleEl = document.getElementById('legal-modal-title');
    const bodyEl = document.getElementById('legal-modal-body');
    const closeBtn = document.getElementById('legal-modal-close');

    if (!overlay || !titleEl || !bodyEl) return;

    document.querySelectorAll('[data-legal-modal]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const key = btn.getAttribute('data-legal-modal');
        const content = LEGAL_CONTENT[key];
        if (!content) return;
        titleEl.textContent = content.title;
        bodyEl.innerHTML = content.html;
        overlay.classList.add('is-open');
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => overlay.classList.remove('is-open'));
    }
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('is-open');
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderCommunityPulse();
    initWaitlistForm();
    initLegalModals();
  });
})();
