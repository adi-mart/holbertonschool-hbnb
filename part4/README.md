# HBnB - Simple Web Client

## Description du projet

Cette quatrième partie du projet **HBnB** présente l'implémentation du client web frontend de l'application. Il s'agit d'une interface utilisateur développée en HTML, CSS et JavaScript vanilla qui consomme l'API REST développée dans les parties précédentes.

Le client web offre une expérience utilisateur complète permettant de naviguer dans les logements disponibles, de s'authentifier et de gérer les avis, le tout à travers une interface moderne et responsive.

## Objectifs du projet

- Développer une interface web moderne et intuitive
- Implémenter l'authentification JWT côté client
- Consommer l'API REST via JavaScript fetch
- Créer une expérience utilisateur fluide et responsive
- Gérer les états d'authentification et les erreurs
- Implémenter un système de filtrage dynamique

## Architecture du client web

### Structure des fichiers

```
part4/
└── base_files/
    ├── index.html          # Page d'accueil avec liste des logements
    ├── login.html          # Page d'authentification
    ├── place.html          # Page de détail d'un logement
    ├── add_review.html     # Page d'ajout d'avis
    ├── styles.css          # Feuille de style principale
    ├── scripts.js          # Logique JavaScript
    └── images/             # Ressources graphiques
        ├── logo.png
        ├── icon.png
		├── icon_bath.png
        ├── icon_bed.png
        └── icon_wifi.png

```

### Pages et fonctionnalités

#### Page d'accueil (index.html)
- **Affichage des logements** : Liste complète des places disponibles
- **Filtrage par prix** : Système de filtrage dynamique par gamme de prix
- **Navigation** : Liens vers les détails des logements et authentification
- **Responsive design** : Adaptation automatique aux différentes tailles d'écran

#### Page d'authentification (login.html)
- **Formulaire de connexion** : Champs email et mot de passe
- **Gestion JWT** : Stockage sécurisé du token d'authentification
- **Validation** : Contrôle des champs et gestion des erreurs
- **Redirection** : Navigation automatique après connexion réussie

#### Page de détail (place.html)
- **Informations complètes** : Affichage détaillé du logement sélectionné
- **Liste des avis** : Consultation des reviews existantes
- **Ajout d'avis** : Possibilité d'ajouter un nouvel avis (utilisateurs connectés)
- **Navigation contextuelle** : Retour à la liste et autres actions

#### Page d'ajout d'avis (add_review.html)
- **Formulaire complet** : Saisie du texte et note de l'avis
- **Validation** : Contrôles de saisie et limites de caractères
- **Intégration API** : Soumission via l'API REST
- **Feedback utilisateur** : Messages de succès ou d'erreur

## Fonctionnalités techniques

### Authentification JWT
- **Stockage sécurisé** : Utilisation du localStorage pour le token
- **Headers automatiques** : Injection du token Bearer dans les requêtes
- **Gestion des sessions** : Vérification et renouvellement automatique
- **Déconnexion** : Nettoyage sécurisé des données d'authentification

### Communication API
- **API REST** : Consommation complète de l'API backend
- **Gestion d'erreurs** : Traitement des codes de statut HTTP
- **Requêtes asynchrones** : Utilisation d'async/await pour les appels
- **Formatage JSON** : Sérialisation et désérialisation automatiques

### Interface utilisateur
- **Design responsive** : Adaptation mobile et desktop
- **Chargement dynamique** : Mise à jour du DOM sans rechargement
- **Filtrage en temps réel** : Application instantanée des filtres
- **Feedback visuel** : Indicateurs de chargement et messages d'état

## Technologies utilisées

### Frontend
- **HTML5** : Structure sémantique et accessible
- **CSS3** : Styles modernes avec Flexbox et Grid
- **JavaScript** : Logique applicative et interactions
- **Fetch API** : Communication avec le backend
- **LocalStorage** : Persistance des données côté client

### Intégration
- **API REST** : Communication avec le backend Flask
- **JWT** : Authentification stateless
- **JSON** : Format d'échange de données
- **CORS** : Gestion des requêtes cross-origin

## Installation et utilisation

### Prérequis
- Navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Serveur backend HBnB fonctionnel (parties 2 et 3)
- Serveur web local pour servir les fichiers statiques

### Démarrage automatique (recommandé)
Utilisez le script de démarrage automatique qui lance backend et frontend simultanément :

```bash
cd /path/to/holbertonschool-hbnb
./start_servers.sh
```

Ce script va :
- Arrêter tous les serveurs existants sur les ports 5000 et 8080
- Lancer le backend Flask (API) sur le port 5000
- Lancer le frontend sur le port 8080
- Afficher les URLs d'accès
- Gérer l'arrêt propre avec Ctrl+C

**Accès à l'application :**
- Frontend : `http://localhost:8080`
- API Backend : `http://127.0.0.1:5000`
- Documentation Swagger : `http://127.0.0.1:5000/api/v1/`

### Configuration manuelle (alternative)
1. **Serveur backend** : S'assurer que l'API REST est démarrée
   ```bash
   cd part3/hbnb
   python run.py
   ```

2. **Serveur web local** : Démarrer un serveur HTTP simple
   ```bash
   cd part4/base_files
   python -m http.server 8080
   ```

3. **Accès à l'application** : Ouvrir le navigateur à l'adresse
   ```
   http://localhost:8080
   ```

### Configuration de l'API
Le client web est configuré pour communiquer avec l'API sur :
```javascript
const API_BASE_URL = 'http://127.0.0.1:5000/api/v1';
```

Le script `start_servers.sh` lance automatiquement l'API sur ce port. Si vous utilisez une configuration différente, modifiez cette variable dans `scripts.js`.

## Utilisation de l'application

### Navigation de base
1. **Page d'accueil** : Consultation des logements disponibles
2. **Filtrage** : Sélection d'une gamme de prix dans le menu déroulant
3. **Détails** : Clic sur un logement pour voir les informations complètes
4. **Authentification** : Clic sur "Login" pour accéder au formulaire

### Workflow utilisateur connecté
1. **Connexion** : Saisie des identifiants sur la page login
2. **Navigation authentifiée** : Accès aux fonctionnalités premium
3. **Ajout d'avis** : Possibilité d'évaluer les logements
4. **Gestion de session** : Déconnexion automatique ou manuelle

### Gestion des erreurs
- **Erreurs de réseau** : Messages informatifs en cas de problème API
- **Authentification** : Redirection automatique vers login si nécessaire
- **Validation** : Contrôles de saisie avec messages explicites
- **Timeout** : Gestion des requêtes qui échouent

## Structure du code JavaScript

### Organisation modulaire
```javascript
// Configuration globale
const API_BASE_URL = 'http://127.0.0.1:5000/api/v1';

// Fonctions utilitaires
function checkAuthentication() { ... }
function getAuthToken() { ... }
function makeAuthenticatedRequest() { ... }

// Fonctions métier
async function fetchPlaces() { ... }
async function loginUser() { ... }
async function addReview() { ... }

// Gestionnaires d'événements
document.addEventListener('DOMContentLoaded', () => { ... });
```

### Bonnes pratiques implémentées
- **Séparation des responsabilités** : Logique métier distincte de la présentation
- **Gestion d'erreurs robuste** : Try-catch et validation des réponses
- **Code asynchrone** : Utilisation d'async/await pour la lisibilité
- **Modularité** : Fonctions réutilisables et bien définies

## Auteurs
- Aurélie  

## Licence

Ce projet a été développé dans le cadre du cursus Holberton School. Tous droits réservés.