# HBnB - AirBnB Clone Project

Un projet complet de plateforme de location inspiré d'AirBnB, développé dans le cadre du cursus Holberton School. Il s'agit de l'un des projets les plus importants du programme, réalisé en équipe, visant à construire une application Full-Stack complète alliant architecture, développement backend et interface web moderne.

Ce clone d'AirBnB permet aux utilisateurs de publier, rechercher et réserver des logements, tout en offrant un système d'authentification sécurisé et une base de données relationnelle robuste. Le projet est conçu selon une architecture modulaire et suit une progression méthodique en quatre grandes phases, de la modélisation UML à la création du client web.

## Table des matières

- [Introduction](#introduction)
- [Structure du repository](#structure-du-repository)
- [Architecture du projet](#architecture-du-projet)
- [Fonctionnalités principales](#fonctionnalités-principales)
- [Installation et démarrage](#installation-et-démarrage)
- [Technologies utilisées](#technologies-utilisées)
- [Auteurs](#auteurs)

## Introduction

Le projet HBnB a pour objectif de reproduire les fonctionnalités essentielles d'AirBnB à travers une approche pédagogique complète et progressive. Il est divisé en quatre parties distinctes qui permettent d'aborder méthodiquement la conception d'API, la gestion des bases de données, la sécurité des utilisateurs et l'intégration d'un frontend dynamique.

Chaque partie du projet approfondit un aspect différent du développement web complet, en suivant les bonnes pratiques d'architecture logicielle, de documentation technique et de développement collaboratif.

### Objectifs pédagogiques

- Maîtriser la conception d'architecture logicielle avec UML
- Développer une API REST robuste et bien documentée
- Implémenter un système d'authentification et d'autorisation sécurisé
- Créer une interface utilisateur moderne et responsive
- Appliquer les bonnes pratiques de développement en équipe

## Structure du repository

```
holbertonschool-hbnb/
├── README.md                     # Documentation principale
├── start_servers.sh             # Script de démarrage automatique
├── part1/                       # Phase UML et conception
│   ├── README.md               # Documentation technique détaillée
│   └── *.png                   # Diagrammes UML (classes, séquences, packages)
├── part2/                      # Backend API avec logique métier
│   └── hbnb/
│       ├── app/                # Application Flask
│       │   ├── api/v1/        # Endpoints REST
│       │   ├── models/        # Modèles de données
│       │   ├── persistence/   # Couche de persistance
│       │   └── services/      # Logique métier (Façade)
│       ├── tests/             # Tests automatisés
│       ├── config.py          # Configuration de l'application
│       ├── requirements.txt   # Dépendances Python
│       └── run.py            # Point d'entrée de l'application
├── part3/                     # Backend avec authentification et BDD
│   └── hbnb/
│       ├── app/               # Application Flask étendue
│       │   ├── api/v1/       # Endpoints avec authentification
│       │   ├── models/       # Modèles SQLAlchemy
│       │   ├── persistence/  # Repository pattern
│       │   └── services/     # Services métier étendus
│       ├── instance/         # Base de données SQLite
│       ├── sql_scripts/      # Scripts d'initialisation BDD
│       ├── tests/            # Tests automatisés étendus
│       └── ...               # Configuration et dépendances
└── part4/                    # Client web frontend
		└── base_files/
				├── index.html        # Page d'accueil
				├── login.html        # Page d'authentification
				├── place.html        # Détails des logements
				├── add_review.html   # Ajout d'avis
				├── scripts.js        # Logique JavaScript
				├── styles.css        # Styles CSS
				└── images/           # Ressources graphiques
```

## Architecture du projet

### Partie 1 - HBnB UML : Conception et documentation technique

La première phase se concentre sur la conception de l'architecture de l'application via UML. L'objectif est de modéliser les entités principales (User, Place, Review, Amenity) et leurs relations pour préparer le développement.

**Livrables :**
- Diagrammes de classes détaillés
- Diagrammes de séquences pour les interactions principales
- Organisation des packages et architecture en couches
- Documentation technique complète servant de base à l'implémentation

Cette phase établit les fondations solides du projet en définissant clairement les responsabilités de chaque composant et les flux de données entre les différentes couches de l'application.

### Partie 2 - HBnB Business Logic & API : Développement backend

La deuxième étape constitue le développement du cœur applicatif et des routes RESTful à l'aide de Flask et Flask-RESTx. Cette phase se concentre sur l'implémentation de la logique métier sans persistance permanente.

**Fonctionnalités développées :**
- Définition des modèles métiers : User, Place, Review, Amenity
- Application du pattern Façade pour isoler la logique métier
- Création des endpoints CRUD complets
- Documentation automatique avec Swagger/OpenAPI
- Tests manuels via Postman et cURL
- Persistance en mémoire avec le pattern Repository

A ce stade, aucune authentification ni base de données persistante n'est implémentée, l'accent étant mis sur la structure et la cohérence du code.

### Partie 3 - HBnB Auth & Database : Sécurité et persistance

La troisième étape ajoute la base de données et le système d'authentification JWT, transformant l'application en un backend production-ready. Cette phase intègre la sécurité et la persistance permanente des données.

**Fonctionnalités implémentées :**
- Migration vers SQLAlchemy ORM avec base SQLite/MySQL
- Gestion complète des relations entre entités (1-N et N-N)
- Système d'authentification JWT avec rôles utilisateurs
- Sécurisation des endpoints avec tokens Bearer
- Validation et intégrité des données
- Tests automatisés avec pytest
- Gestion des erreurs et codes de statut HTTP appropriés

Cette étape rend le backend prêt pour un déploiement réel avec toutes les fonctionnalités de sécurité et de persistance nécessaires.

### Partie 4 - HBnB Simple Web Client : Interface utilisateur

La quatrième et dernière étape présente l'implémentation du client web frontend. Il s'agit d'une interface utilisateur complète développée en HTML, CSS et JavaScript vanilla qui consomme l'API REST développée précédemment.

**Fonctionnalités du client web :**
- Interface moderne et responsive
- Authentification JWT côté client
- Navigation fluide entre les pages
- Affichage dynamique des logements
- Système de filtrage par prix
- Gestion des avis et reviews
- Gestion d'erreurs et feedback utilisateur
- Stockage sécurisé des tokens d'authentification

## Fonctionnalités principales

### Gestion des utilisateurs (Users)
- Création et modification de profils utilisateur
- Système d'authentification sécurisé avec JWT
- Gestion des rôles (administrateur, propriétaire, invité)
- Validation des données et champs obligatoires
- Hachage sécurisé des mots de passe

### Gestion des logements (Places)
- Création et modification d'annonces de logements
- Association aux propriétaires (owner_id)
- Géolocalisation avec coordonnées GPS (latitude/longitude)
- Liaison avec les commodités disponibles
- Gestion des prix et descriptions
- Validation stricte des données d'entrée

### Système d'avis (Reviews)
- Publication d'avis par les utilisateurs connectés
- Association à un utilisateur et un logement spécifique
- Système de notation avec étoiles (rating)
- Horodatage automatique des avis
- Contrôle des autorisations (seul l'auteur ou un admin peut modifier)

### Commodités (Amenities)
- Gestion complète des équipements disponibles
- CRUD complet excepté la suppression
- Noms uniques avec validation de longueur
- Association multiple avec les logements via table de liaison
- Interface d'administration dédiée

### Sécurité et authentification
- Authentification JWT avec tokens Bearer
- Login sécurisé via endpoint dédié
- Protection automatique des endpoints sensibles
- Décodage et validation automatique des tokens
- Gestion des sessions avec expiration automatique
- Les mots de passe ne sont jamais retournés dans les réponses API

## Installation et démarrage

### Prérequis système
- Python 3.12 ou supérieur
- pip et virtualenv installés
- Git pour le clonage du repository
- Navigateur web moderne pour le client frontend

### Installation complète

1. **Clonage du repository**
```bash
git clone https://github.com/adi-mart/holbertonschool-hbnb.git
cd holbertonschool-hbnb
```

2. **Configuration de l'environnement virtuel**
```bash
python3 -m venv venv
source venv/bin/activate  # Linux/macOS
# ou
venv\Scripts\activate     # Windows
```

3. **Installation des dépendances (Partie 2)**
```bash
cd part2/hbnb
pip install -r requirements.txt
```

4. **Installation des dépendances (Partie 3)**
```bash
cd ../../part3/hbnb
pip install -r requirements.txt
```

### Démarrage de l'application

#### Backend API (Partie 2 - Business Logic)
```bash
cd part2/hbnb
python run.py
```
L'API sera accessible à : `http://127.0.0.1:5000`
Documentation Swagger : `http://127.0.0.1:5000/api/v1/`

#### Backend avec base de données (Partie 3)
```bash
cd part3/hbnb
python run.py
```
L'API sera accessible à : `http://127.0.0.1:5000`
Documentation Swagger : `http://127.0.0.1:5000/api/v1/`

#### Client web (Partie 4)
```bash
cd part4/base_files
python -m http.server 8000
```
Application web accessible à : `http://localhost:8000`

#### Démarrage automatique (recommandé)
Utilisez le script de démarrage automatique qui lance backend et frontend simultanément :

```bash
./start_servers.sh
```

Ce script intelligent :
- Arrête automatiquement tous les serveurs existants
- Lance le backend Flask (API) sur le port 5000
- Lance le frontend sur le port 8080
- Affiche les URLs d'accès directement
- Gère l'arrêt propre des deux serveurs avec Ctrl+C

**Accès rapide après démarrage :**
- Application web : `http://localhost:8080`
- API Backend : `http://127.0.0.1:5000`
- Documentation Swagger : `http://127.0.0.1:5000/api/v1/`

## Technologies utilisées

### Backend
- **Python 3.12+** : Langage principal de développement
- **Flask** : Framework web léger et modulaire
- **Flask-RESTx** : Extension pour API REST avec documentation Swagger
- **SQLAlchemy** : ORM pour la gestion de base de données
- **Flask-JWT-Extended** : Gestion de l'authentification JWT
- **SQLite/MySQL** : Bases de données relationnelles
- **pytest** : Framework de tests automatisés

### Frontend
- **HTML5** : Structure sémantique et accessible
- **CSS3** : Styles modernes avec Flexbox et Grid
- **JavaScript ES6+** : Logique applicative et interactions DOM
- **Fetch API** : Communication asynchrone avec le backend
- **LocalStorage** : Persistance des données côté client

### Architecture et patterns
- **Architecture en couches** : Séparation claire des responsabilités
- **Pattern Façade** : Interface unifiée pour la logique métier
- **Pattern Repository** : Abstraction de la couche de persistance
- **REST API** : Architecture respectant les principes RESTful
- **JWT** : Authentification stateless et sécurisée

## Tests

### Tests automatisés
Chaque partie du projet dispose de sa suite de tests :

```bash
# Tests Partie 2
cd part2/hbnb/tests
python run_all_tests.py

# Tests Partie 3
cd part3/hbnb/tests
python run_all_tests.py
```

### Couverture des tests
- Tests unitaires pour tous les modèles
- Tests d'intégration pour les endpoints API
- Tests d'authentification et d'autorisation
- Tests de validation des données
- Tests d'erreurs et cas limites

## Exemples d'utilisation

### API Backend

#### Créer un utilisateur
```bash
curl -X POST http://127.0.0.1:5000/api/v1/users \
	-H "Content-Type: application/json" \
	-d '{
		"first_name": "John",
		"last_name": "Doe",
		"email": "john.doe@example.com",
		"password": "securepassword"
	}'
```

#### Authentification
```bash
curl -X POST http://127.0.0.1:5000/api/v1/auth/login \
	-H "Content-Type: application/json" \
	-d '{
		"email": "john.doe@example.com",
		"password": "securepassword"
	}'
```

#### Créer un logement (authentification requise)
```bash
curl -X POST http://127.0.0.1:5000/api/v1/places \
	-H "Content-Type: application/json" \
	-H "Authorization: Bearer YOUR_JWT_TOKEN" \
	-d '{
		"title": "Beautiful Apartment",
		"description": "A lovely place in the city center",
		"price": 100.0,
		"latitude": 48.8566,
		"longitude": 2.3522,
		"owner_id": "user-uuid-here"
	}'
```

## Licence

Ce projet a été développé dans le cadre du cursus Holberton School. Il est destiné à des fins éducatives et pédagogiques.

## Auteurs

- **Nina**
- **Aurélie**
- **Nicolai**

Projet réalisé dans le cadre du cursus **Holberton School** - Promotion 2025

---
