# FREEBUFF.md — Instructions & Périmètre pour Freebuff / Codebuff (Projet Karibelle)

> **Lire d'abord** : [AGENTS.md](./AGENTS.md) pour la charte graphique complète, les règles du Business Plan et la coordination entre **Antigravity**, **Claude** et **Freebuff**.

## Ton rôle dans l'équipe Multi-Agents (Freebuff)

Tu es responsable de **l'étude de marché interactive (Liste d'attente), de la preuve sociale (Personas & Équipe EDC) et de la conformité légale / RGPD** :

1. **Module Liste d'attente & Étude de Marché sans biais (`#liste` dans `index.html` + `js/waitlist-and-community.js`)** :
   - Le prototype HTML initial comportait un biais méthodologique (`Moins de 30 €` et `Crépus` sélectionnés par défaut, tranches de prix différentes du Business Plan).
   - Ton module garantit :
     - Des options neutres par défaut (`-- Sélectionnez votre texture --`, `-- Choisissez le prix qui vous semble juste --`).
     - Les vrais paliers testés dans le Business Plan (sections 2.6 et 6.7) : **39,90 € TTC**, **44,90 € TTC** (prix cible), **49,90 € TTC**.
     - Le vote entre les deux pistes de parfum : **Karité & Vanille** vs **Karité & Lavande**.
     - Une jauge interactive en temps réel montrant les tendances des votes de la communauté et l'objectif de l'enquête terrain (**50 à 100 réponses qualifiées** avant lancement de la première série de 600 coffrets).

2. **Module Personas & Retours Testeurs (`#temoignages` dans `index.html`)** :
   - Mettre en scène les deux profils types du Business Plan (section 2.7, page 8) avec leurs portraits dans `assets/` :
     - **Naomie, 28 ans** (Chargée de communication · Paris) — Cheveux crépus mi-longs, dépensait ~35 €/mois chez 3 marques différentes, cherchait une routine complète à 44,90 € parfum Vanille.
     - **Yann, 32 ans** (Technicien de maintenance · Lyon) — Cheveux bouclés courts avec barbe, budget ~15 €/mois, cherchait un coffret prêt à l'emploi au mode d'emploi clair parfum Lavande.

3. **Module Notre Équipe (`#equipe` dans `index.html`) & Modales Légales / RGPD (`js/waitlist-and-community.js`)** :
   - Présenter les 3 cofondateurs (**Gohou Nadia**, **Inès Carole Assan**, **Adam Zinoun** — Cours de Business Development, EDC Paris Business School) avec leurs photos `assets/equipe-*.png`.
   - Fournir les modales légales complètes (Mentions légales, Politique de confidentialité RGPD, Conditions de précommande / Directive 2011/83/UE) remplaçant l'ancien texte `[Mentions légales et politique de confidentialité à ajouter]`.

## Garde-fous à respecter
- Ne jamais écraser `js/store-core.js` (géré par **Antigravity**) ni `js/quiz-and-impact.js` (géré par **Claude**).
- Toujours utiliser les images locales du dossier `assets/`.
