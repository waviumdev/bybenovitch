# Maison By Benovitch (Hub)

Site hub statique (dark mode) : Accueil / À propos / Contact.
La brand bar pointe vers les 3 sous-domaines : Playlist / Studio / Artists.

## Structure
- `/` : hub
- `/about/`
- `/contact/`
- `/a-venir/` : page "Artists arrive bientôt."

## Déploiement (GitHub Pages)
1. Pousse le dossier sur un repo GitHub (ex: `bybenovitch-hub`).
2. Active GitHub Pages (branch `main`, dossier `/root`).

## À venir / Artists
Option propre (recommandée) :
- tant que `artists.bybenovitch.com` n'est pas prêt, fais pointer `artists.bybenovitch.com` vers une petite landing "à venir"
  (repo dédié ou Vercel).
- Quand Artists est prêt, tu switches le DNS vers Vercel.

Email de contact (à modifier si besoin) : `contact@bybenovitch.com`
