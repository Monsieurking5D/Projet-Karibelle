# AGENTS.md — Protocole de Coordination Multi-Agents (Antigravity · Claude · Freebuff)

> **Projet** : Site Web E-Commerce & Marque **Karibelle** (« *Naturellement belle* » — « *Plus qu'un soin, une histoire.* »)
> **Origine** : Cours de Business Development · **EDC Paris Business School**
> **Équipe fondatrice** : Gohou Nadia (DG), Inès Carole Assan (Directrice Marketing & Communication), Adam Zinoun (Directeur Commercial & Financier)
> **Documents sources de référence** :
> - `Karibelle_Business_Plan.pdf` (20 pages — Business Plan complet)
> - `Presentation-KARIBELLE_pdf.pdf` (21 slides — Pitch Deck)
> - `Karibelle - page d'attente – Page d'attente Karibelle.html` (Prototype initial de page d'attente)

---

## 1. Objectif du fichier

Ce fichier coordonne le travail entre **trois agents IA** travaillant dans le même workspace afin de construire et perfectionner le site web officiel de **Karibelle** sans conflit d'édition ni perte de cohérence avec le Business Plan :

1. **Antigravity** (Architecte Principal, E-Commerce Core, Design System & Intégration)
2. **Claude** (Expérience Diagnostic Capillaire, Storytelling Karité, Simulateur d'Impact 5 % Côte d'Ivoire & FAQ)
3. **Freebuff** (Étude de Marché / Liste d'attente interactive sans biais, Preuve Sociale / Personas, Équipe & Conformité Légale/RGPD)

---

## 2. Règles métier & conformité (issues du Business Plan — OBLIGATOIRES)

Tout agent qui modifie le texte ou le code du site **doit** respecter scrupuleusement ces règles issues de l'analyse des documents :

1. **Prix & Économie du coffret** :
   - Prix officiel du coffret : **44,90 € TTC** (**37,42 € HT**, TVA 20 %).
   - Comparaison marché (benchmark Activilong relevé dans le BP) : 3 soins à l'unité = **49,50 € TTC**, Coffret Actiforce = **76,55 € TTC**. Le coffret Karibelle réunit **4 soins complémentaires** pour **44,90 € TTC**.
   - Paliers de test de prix du Business Plan (section 2.6 & 6.7) : **39,90 €**, **44,90 €** (scénario central) et **49,90 €**.
2. **Composition exacte du Coffret (4 soins — 850 ml au total)** :
   - **Soin n°1 — Shampoing « Douceur & Force » (250 ml)** : Nettoie le cuir chevelu en douceur sans dessécher les longueurs (*Karité · Vanille/Lavande · Hibiscus*).
   - **Soin n°2 — Après-shampoing « Démêlage & Souplesse » (250 ml)** : Facilite le démêlage, assouplit et adoucit les longueurs (*Karité · Vanille/Lavande · Hibiscus*).
   - **Soin n°3 — Masque capillaire « Nutrition Intense » (250 ml)** : Soin profond des longueurs pour restaurer la souplesse et nourrir la fibre (*Karité · Vanille/Lavande · Hibiscus*).
   - **Soin n°4 — Huile de soin & massage « Brillance & Protection » (100 ml)** : Scelle l'hydratation, protège au quotidien et s'utilise en massage du cuir chevelu (*Karité · Vanille/Lavande · Ricin*).
   - **Parfums au choix / en test** : **Karité & Vanille** ou **Karité & Lavande**.
3. **Conformité réglementaire cosmétique (Règlements CE 1223/2009, UE 655/2013 et UE 2023/1545)** :
   - **INTERDICTION** de présenter les produits comme « 100 % bio », « 100 % naturels », « sans danger » ou « résultat garanti » sans justification (cf. BP section 1.4 & 3.3).
   - **INTERDICTION** d'indiquer « Fabriqué en Afrique » pour le produit fini si la formulation à façon est réalisée en Europe : toujours préciser **« Au beurre de karité originaire de Côte d'Ivoire (Afrique de l'Ouest) »** et **« Formules développées dans le respect du règlement cosmétique européen (CE) n° 1223/2009 »**.
4. **Engagement RSE (Section 4.2 bis du Business Plan)** :
   - **5 % du chiffre d'affaires HT** est reversé à une coopérative de femmes productrices de beurre de karité en **Côte d'Ivoire** (fournisseur partenaire).
   - Cela représente **1,87 € HT par coffret vendu**, soit **1 123 € en Année 1** (600 coffrets), **2 245 € en Année 2** (1 200 coffrets) et **3 742 € en Année 3** (2 000 coffrets).
   - Contexte sourcé : environ **150 000 femmes** vivent directement de la filière karité (« l'or des femmes ») en Côte d'Ivoire (*Le360 Afrique, 25/07/2025*).

---

## 3. Charte Graphique & Design System

| Token CSS | Hex | Usage |
| :--- | :--- | :--- |
| `--bg-cream` | `#FDF5EA` | Fond principal chaleureux inspiré du beurre de karité |
| `--bg-sand` | `#F1E2CC` | Fond secondaire (sections alternées, cartes mises en avant, header) |
| `--bg-white` | `#FFFFFF` | Cartes produits, modales, formulaires |
| `--cacao-dark` | `#3E2314` | Texte principal, boutons primaires, sections sombres |
| `--cacao-medium` | `#5A3A26` | Texte courant et paragraphes |
| `--terracotta` | `#9A4F26` | Accents, surtitres, badges, liens |
| `--gold-shea` | `#C8923A` | Bordures actives, focus, filets décoratifs |
| `--gold-light` | `#D9A74E` | Chiffres clés sur fond sombre, icônes |
| `--border-soft` | `#E8D5BA` | Bordures fines des cartes et séparateurs |

- **Typographies Google Fonts** :
  - Titres & citations : `'Lora', Georgia, serif` (500, 600, 700, 500i)
  - Corps & UI : `'Source Sans 3', system-ui, sans-serif` (400, 600, 700)

---

## 4. Ressources Visuelles Extraites (`assets/`)

Toutes les images authentiques des documents ont été extraites dans le dossier `assets/` :

- `assets/logo-karibelle.jpg` — Logo officiel Karibelle (femme & homme aux cheveux texturés)
- `assets/hero-karibelle.jpg` — Photo Hero (3 mannequins femmes/homme avec la gamme des 4 produits)
- `assets/coffret-complet.jpg` — Photo du coffret ouvert avec les 4 flacons, noix de karité et gousses de vanille
- `assets/produit-shampoing.jpg` — Flacon Shampoing Douceur & Force (250 ml)
- `assets/produit-apres-shampoing.jpg` — Flacon Après-Shampoing Démêlage & Souplesse (250 ml)
- `assets/produit-masque.jpg` — Pot Masque Capillaire Nutrition Intense (250 ml)
- `assets/produit-huile.jpg` — Flacon spray Huile de Soin Brillance & Protection (100 ml)
- `assets/cooperative-karite-ci.jpg` — Productrices de beurre de karité en Côte d'Ivoire (BP p. 11)
- `assets/cooperative-atelier-ci.jpg` — Préparation du karité en coopérative (Présentation slide 12)
- `assets/texture-cheveux-crepus.jpg` — Zoom texture cheveux crépus/frisés dorés (Présentation slide 20)
- `assets/equipe-nadia.png` — Portrait Gohou Nadia (Directrice générale)
- `assets/equipe-ines.png` — Portrait Inès Carole Assan (Directrice marketing et communication)
- `assets/equipe-adam.png` — Portrait Adam Zinoun (Directeur commercial et financier)
- `assets/persona-naomie.png` — Portrait Naomie, 28 ans (Chargée de communication, Paris)
- `assets/persona-yann.png` — Portrait Yann, 32 ans (Technicien de maintenance, Lyon)

---

## 5. Architecture des Fichiers & Répartition entre les 3 Agents

Pour éviter tout conflit d'écriture lorsque **Antigravity**, **Claude** et **Freebuff** interviennent sur le projet, l'architecture est découpée par modules clairement attribués :

```text
Inse/
├── AGENTS.md                      # Ce fichier de coordination maître
├── CLAUDE.md                      # Instructions spécifiques auto-chargées par Claude
├── FREEBUFF.md                    # Instructions spécifiques pour Freebuff / Codebuff
├── index.html                     # Page principale structurée par sections balisées
├── assets/                        # Toutes les images extraites du BP, du Pitch et de la page HTML
├── css/
│   └── styles.css                 # Design System et styles modulaires par section
└── js/
    ├── store-core.js              # [ANTIGRAVITY] Panier, précommande coffret, sélecteur parfum, comparateur prix
    ├── quiz-and-impact.js         # [CLAUDE] Diagnostic capillaire interactif, calculateur impact 5 %, FAQ
    └── waitlist-and-community.js  # [FREEBUFF] Liste d'attente & étude de marché sans biais, personas, modales RGPD
```

### Répartition détaillée des responsabilités

#### 🟢 Agent 1 : ANTIGRAVITY (Toi)
- **Périmètre** :
  - Extraction de tous les assets depuis le HTML et les PDF dans `assets/`.
  - Création du Design System (`css/styles.css`) et de la structure complète `index.html`.
  - **Header & Navigation** + **Bandeau d'annonce** (Précommandes ouvertes · Série limitée 600 coffrets · Livraison France).
  - **Hero Section** & **Section Coffret E-Commerce** (`#coffret`) : fiche produit interactive du Coffret Rituel Capillaire à **44,90 € TTC**, sélecteur de parfum (*Karité & Vanille* vs *Karité & Lavande*), détail des 4 soins (contenance, rôle, actifs, mode d'emploi), comparateur de prix transparent face à la concurrence (44,90 € pour 4 soins vs 49,50 € à 76,55 €).
  - **Tiroir Panier / Précommande (`js/store-core.js`)** : ajout au panier, choix de l'option précommande / financement participatif, calcul de la participation aux frais de livraison, récapitulatif de l'impact solidaire (1,87 € reversés par coffret).

#### 🟣 Agent 2 : CLAUDE (voir aussi `CLAUDE.md`)
- **Périmètre (`js/quiz-and-impact.js` + sections `#diagnostic`, `#engagement`, `#faq` de `index.html`)** :
  - **Diagnostic Capillaire Interactif (`#diagnostic`)** : Quiz en 3 ou 4 questions (type de texture : crépus / frisés / bouclés ; longueur & port : courts, mi-longs, longs, avec barbe ; problématique principale : sécheresse, démêlage, manque de temps, routine trop coûteuse ; préférence sensorielle : vanille ou lavande) qui génère une **routine personnalisée en 4 étapes** avec fréquence d'utilisation, quantité recommandée et bouton d'ajout direct du coffret configuré au panier.
  - **Section Engagement 5 % Côte d'Ivoire (`#engagement`)** : Storytelling respectueux autour de la filière karité en Côte d'Ivoire (150 000 femmes), galerie photo de la coopérative et **simulateur d'impact interactif** permettant de visualiser le reversement de 5 % du CA HT selon le nombre de coffrets vendus (de 1 coffret = 1,87 € jusqu'aux jalons Année 1 = 600 coffrets / 1 123 €, Année 2 = 1 200 coffrets / 2 245 €, Année 3 = 2 000 coffrets / 3 742 €).
  - **FAQ Réglementaire, Qualité & Livraison (`#faq`)** : Réponses transparentes basées sur le Business Plan (conformité UE 1223/2009, pourquoi un coffret de 4 soins plutôt que l'unité au lancement, allergènes de parfum, délais de livraison, politique de retour).

#### 🔵 Agent 3 : FREEBUFF (voir aussi `FREEBUFF.md`)
- **Périmètre (`js/waitlist-and-community.js` + sections `#temoignages`, `#liste`, `#equipe`, `#business-overview` et modales légales de `index.html`)** :
  - **Liste d'attente & Questionnaire d'étude de marché corrigé (`#liste`)** :
    - Corriger le biais UX du prototype initial : aucun choix pré-sélectionné par défaut sur le prix ou la texture (utiliser un placeholder désactivé `Sélectionnez...`), utiliser les vrais paliers du Business Plan (**39,90 €**, **44,90 €**, **49,90 €**), voter pour le parfum (**Vanille** vs **Lavande**) et afficher après soumission (ou en direct) la répartition des préférences des inscrits stockée dans `localStorage`.
  - **Profils & Retours Cibles (`#temoignages`)** : Mise en scène des personas du Business Plan (**Naomie, 28 ans, Paris** — cheveux crépus mi-longs ; **Yann, 32 ans, Lyon** — cheveux bouclés courts & barbe) expliquant comment Karibelle résout leur frustration (gain de temps, routine claire, budget maîtrisé).
  - **Section Notre Équipe & Vision EDC (`#equipe`)** : Cartes des 3 cofondateurs (**Gohou Nadia**, **Inès Carole Assan**, **Adam Zinoun**) avec leurs expériences professionnelles et leur rôle dans Karibelle.
  - **Modales Légales & RGPD** : Remplacer définitivement `[Mentions légales et politique de confidentialité à ajouter]` par de vraies modales consultables (Mentions légales du projet académique EDC Paris Business School, Politique de confidentialité RGPD art. 6 & 13 pour la liste d'attente, Conditions de précommande / Directive 2011/83/UE droit de rétractation 14 jours).

---

## 6. Protocole de passage de relais entre agents

1. **Avant de modifier un fichier** : Lire ce fichier `AGENTS.md` et vérifier l'état de la checklist ci-dessous.
2. **Respecter les identifiants DOM** : Ne jamais supprimer les attributs `id` ou `data-*` utilisés par les scripts des autres agents (`#cart-drawer`, `#diagnostic-quiz`, `#impact-slider`, `#waitlist-form`, `#legal-modal`, etc.).
3. **Mettre à jour le journal de statut ci-dessous** après chaque intervention.

### Journal d'avancement des Agents

- [x] **[Antigravity]** Extraction des images du bundle HTML et des PDF vers `assets/`
- [x] **[Antigravity]** Création des fichiers de coordination `AGENTS.md`, `CLAUDE.md` et `FREEBUFF.md`
- [x] **[Antigravity]** Création du Design System `css/styles.css`, de `index.html` et des modules JS (`js/store-core.js`, `js/quiz-and-impact.js`, `js/waitlist-and-community.js`) avec une version v1 complète et 100 % fonctionnelle
- [x] **[Claude]** Enrichissement du module Diagnostic Capillaire & Simulateur d'impact (`js/quiz-and-impact.js`) — 2026-11-24 :
  - Quiz v2 : Q3 alignée sur `CLAUDE.md` (4 objectifs), protocole calculé selon texture × longueur × objectif (fréquence, quantité, conseil), « soin clé » mis en avant, réponses validées, focus clavier, mention « conseils indicatifs » + test de tolérance (UE 2023/1545). Contrat `KaribelleStore.addToCart({ scent, qty })` inchangé.
  - Simulateur : ajout du scénario favorable (900, BP §7.1), bouton actif, `aria-valuetext`, mention « modalités à formaliser avec la coopérative » (BP §4.2 bis).
  - FAQ : `aria-expanded`/`aria-controls` + 5 questions (bio/naturel, lieu de fabrication, allergènes, précommandes & délais, livraison — alignée sur `store-core.js` et la modale `cgv`).
  - Styles : bloc `[CLAUDE] Diagnostic v2` dans `css/styles.css`, uniquement des classes nouvelles (aucune règle existante modifiée).
  - ✅ **[Antigravity]** Correctif mobile 375 px appliqué dans `css/styles.css` (`.site-header__inner` et `.header-actions` sans débordement horizontal) + connexion au dépôt GitHub `Monsieurking5D/Karibelle`.
- [ ] **[Freebuff]** Enrichissement / approfondissement du module Étude de marché, Personas, Équipe & Modales RGPD (`js/waitlist-and-community.js`)
