# 🚁 KWARTZ FPV - Portfolio Cinématique & OSD

> **"Sky is our limit."**
> Une expérience web immersive double : un portfolio cinématique haute performance et un mode "Pilote OSD" interactif pour les passionnés de FPV.

**Voir le site en ligne :** https://kwartzfpv.netlify.app/

## 🏔️ Aperçu du Projet

Ce dépôt contient le code source du **Portfolio Kwartz FPV**. Refondu en 2025, ce site propose deux interfaces uniques :
1.  **Mode Cinématique :** Une expérience de défilement fluide avec arrière-plans vidéo, grilles modernes (Bento Grid) et transitions douces.
2.  **Mode Pilote (OSD) :** Une interface secondaire complète (`indexosd.html`) simulant les lunettes FPV (On-Screen Display) avec télémétrie en temps réel simulée (batterie, signal, GPS) et navigation au style rétro.

## ✨ Fonctionnalités Clés

### 🎨 Design & Expérience
* **Hero Immersif :** Vidéo d'arrière-plan HTML5 plein écran avec fallback optimisé.
* **Effet "Mountain Dive" :** Zoom progressif et fondu au défilement pour une immersion totale.
* **Mode OSD Interactif :** Une interface secondaire complète (`indexosd.html`) simulant un retour vidéo de drone analogique/numérique.
* **Bento Grid Layout :** Mise en page asymétrique moderne pour la section "Hangar".
* **Intégration YouTube :** Grille de vidéos optimisée pour le chargement rapide.

### ⚡ Performance & Optimisation (Nouveauté)
Ce projet a été rigoureusement optimisé pour les Core Web Vitals :
* **Chargement Éclair (LCP) :** Préchargement des ressources critiques et gestion intelligente des priorités (`fetchpriority`).
* **Stabilité Visuelle (CLS) :** Dimensions explicites sur tous les médias pour éviter les sauts de mise en page.
* **Rendu Intelligent :** Utilisation de `content-visibility: auto` pour ne pas calculer le rendu des sections hors écran.
* **JavaScript Non-Bloquant :** Scripts différés (`defer`) et boucles d'animation optimisées via `requestAnimationFrame`.
* **Polices Légères :** Chargement sélectif des graisses de police nécessaires.

## 🛠️ Stack Technique

* **HTML5 :** Structure sémantique et propre.
* **CSS3 :** Grid, Flexbox, Scroll Snap, Animations GPU, Variables CSS.
* **JavaScript (Vanilla) :** Logique légère pour le menu mobile, les effets de scroll (Lenis) et la simulation de télémétrie OSD.
* **Bibliothèques :** [Lenis](https://github.com/studio-freight/lenis) (Smooth Scroll), Boxicons (Icônes).

## 📬 Contact

    Instagram : @kwartz_fpv

    YouTube : Kwartz_fpv

    Email : thomfpv@gmail.com

© 2025 Kwartz FPV | All Rights Reserved
## 📂 Structure du Projet

```text
├── index.html          # Mode Cinématique (Page principale)
├── style.css           # Styles optimisés pour le mode Cinématique
├── script.js           # Logique UI et Effets (Smooth Scroll, Dive)
│
├── indexosd.html       # Mode Pilote (Interface OSD)
├── styleosd.css        # Styles rétro/terminaux pour l'OSD
├── scriptosd.js        # Simulation de télémétrie (Batterie, RSSI, GPS)
│
├── assets/             # Dossier des médias optimisés (.webp, .webm)
│   ├── header-video.webm
│   ├── background2.webp
│   ├── drone-7.webp
│   ├── drone-5.webp
│   ├── gear.webp
│   └── ...
└── README.md           # Documentation
