# CLAUDE.md — Instructions & Périmètre pour Claude (Projet Karibelle)

> **Lire d'abord** : [AGENTS.md](./AGENTS.md) pour la charte graphique complète, les règles réglementaires du Business Plan et la coordination entre **Antigravity**, **Claude** et **Freebuff**.

## Ton rôle dans l'équipe Multi-Agents (Claude)

Tu es responsable de **l'expérience conseil, de l'histoire du karité et de la transparence réglementaire** du site e-commerce **Karibelle** :

1. **Module Diagnostic Capillaire (`#diagnostic` dans `index.html` + `js/quiz-and-impact.js`)** :
   - Guider les visiteurs (femmes et hommes aux cheveux crépus, frisés ou bouclés) à travers un diagnostic interactif en 4 questions :
     1. *Texture de cheveux* : Crépus (Type 4), Frisés (Type 3B/3C), Bouclés (Type 2C/3A).
     2. *Longueur & Habitudes* : Courts / avec barbe (profil Yann), Mi-longs à longs (profil Naomie), Coiffures protectrices.
     3. *Objectif prioritaire* : Nutrition & souplesse, Démêlage facile sans casse, Routine complète rapide & économique, Apaisement du cuir chevelu.
     4. *Senteur préférée* : Karité & Vanille ou Karité & Lavande.
   - Générer un **Protocole Personnalisé des 4 Soins** (Shampoing 250 ml → Après-shampoing 250 ml → Masque 250 ml → Huile de soin & massage 100 ml) avec conseils de fréquence, dosage et bouton permettant d'ajouter directement le coffret configuré au panier (`window.KaribelleStore.addToCart(...)`).

2. **Module Engagement 5 % Côte d'Ivoire (`#engagement` dans `index.html` + `js/quiz-and-impact.js`)** :
   - Mettre en valeur l'engagement de la section **4.2 bis** du Business Plan : **5 % du chiffre d'affaires HT** reversé à une coopérative de femmes productrices de beurre de karité en Côte d'Ivoire (fournisseur partenaire).
   - Maintenir et enrichir le **Simulateur d'Impact Interactif** (`#impact-slider`) :
     - Prix coffret = **44,90 € TTC** (**37,42 € HT**) → **1,87 € HT reversés par coffret**.
     - Jalons du Business Plan :
       - **Année 1 (600 coffrets)** : 22 452 € CA HT → **1 123 €** reversés.
       - **Année 2 (1 200 coffrets)** : 44 904 € CA HT → **2 245 €** reversés.
       - **Année 3 (2 000 coffrets)** : 74 840 € CA HT → **3 742 €** reversés.

3. **Module FAQ Réglementaire & Produit (`#faq` dans `index.html` + `js/quiz-and-impact.js`)** :
   - Répondre avec précision aux questions sur la formulation, le règlement européen `(CE) n° 1223/2009`, l'étiquetage des allergènes de parfum `(UE) 2023/1545`, l'origine du karité de Côte d'Ivoire et le fonctionnement des précommandes.

## Garde-fous à respecter
- Ne jamais écraser `js/store-core.js` (géré par **Antigravity**) ni `js/waitlist-and-community.js` (géré par **Freebuff**).
- Ne jamais utiliser d'allégation trompeuse (« 100 % bio », « miracle », « fabriqué en Afrique » pour le produit fini).
- Conserver les variables CSS du Design System définies dans `css/styles.css`.
