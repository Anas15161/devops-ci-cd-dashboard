# 📖 Guide d'Exécution du Projet (Destiné au Professeur)

Ce document fournit toutes les instructions étape par étape pour installer, tester et exécuter le **Projet DevOps CI/CD Dashboard**. L'application est un tableau de bord DevOps interactif codé en Node.js, entièrement conteneurisé et automatisé avec un pipeline CI/CD.

---

## 📋 Table des Matières
1. [🛠️ Prérequis](#️-prérequis)
2. [⚙️ Configuration Initiale](#️-configuration-initiale)
3. [🚀 Méthode 1 : Exécution en Local (Sans Docker)](#-méthode-1--exécution-en-local-sans-docker)
4. [🐳 Méthode 2 : Exécution Conteneurisée (Docker & Compose)](#-méthode-2--exécution-conteneurisée-docker--compose)
5. [🤖 Pipeline CI/CD (GitHub Actions)](#-pipeline-cicd-github-actions)
6. [🛠️ Raccourcis Utiles (Makefile)](#️-raccourcis-utiles-makefile)
7. [📡 Points d'Accès de l'Application (API & UI)](#-points-daccès-de-lapplication-api--ui)
8. [🔍 Dépannage (Troubleshooting)](#-dépannage-troubleshooting)

---

## 🛠️ Prérequis

Avant de commencer, assurez-vous d'avoir installé sur votre machine :
*   **Node.js** (Version 20 ou supérieure recommandée)
*   **Docker & Docker Compose**
*   **Make** (utilitaire optionnel pour exécuter les raccourcis simplifiés)

---

## ⚙️ Configuration Initiale

1.  **Accéder au dossier du projet :**
    ```bash
    cd /home/anas/Desktop/Last_week/Management_projets_IT/devops-ci-cd-dashboard
    ```

2.  **Configurer les variables d'environnement :**
    Copiez le fichier d'exemple `.env.example` pour créer votre propre fichier `.env` :
    ```bash
    cp .env.example .env
    ```
    *(Le fichier `.env` contient par défaut le port `3000` et définit l'environnement en `development`)*

---

## 🚀 Méthode 1 : Exécution en Local (Sans Docker)

Cette méthode permet d'exécuter l'application directement sur votre machine hôte à l'aide de Node.js.

### 1. Installation des Dépendances
Installez les packages requis (Express, Jest, Supertest) :
```bash
npm install
```
*(Alternative avec Make : `make install`)*

### 2. Exécution des Tests Unitaires
Lancez la suite de tests automatisés (écrits avec Jest et Supertest) pour vérifier le bon fonctionnement de l'application :
```bash
npm test
```
*(Alternative avec Make : `make test`)*
> [!NOTE]
> Cette commande génère également un rapport de couverture de code (Coverage Report) dans le dossier `/coverage`.

### 3. Démarrage de l'Application
Lancez le serveur Web Node.js localement :
```bash
npm start
```
Le serveur démarrera et affichera : `Server is running on port 3000`. Vous pouvez maintenant y accéder sur [http://localhost:3000](http://localhost:3000).

---

## 🐳 Méthode 2 : Exécution Conteneurisée (Docker & Compose)

Cette méthode est recommandée pour tester l'application dans un environnement de production isolé et identique à celui déployé.

### 1. Lancement avec Docker Compose
Construisez l'image Docker multi-stage (qui exécute automatiquement les tests pendant l'étape de build) et lancez l'application en arrière-plan :
```bash
docker compose up -d --build
```
*(Alternative avec Make : `make run`)*

### 2. Visualisation des Journaux (Logs)
Pour vérifier que l'application a démarré correctement dans le conteneur :
```bash
docker compose logs -f
```

### 3. Arrêt de l'Application
Pour arrêter et supprimer le conteneur ainsi que les réseaux Docker créés :
```bash
docker compose down
```
*(Alternative avec Make : `make stop`)*

---

## 🤖 Pipeline CI/CD (GitHub Actions)

Le projet intègre un pipeline de déploiement et d'intégration continue entièrement automatisé défini dans `.github/workflows/main.yml`. 

Le pipeline comprend 3 étapes majeures :
1.  **Test (CI)** : S'exécute sur chaque *Push* ou *Pull Request*. Il installe les dépendances et exécute les tests Jest.
2.  **Build & Push (Docker)** : Déclenché uniquement sur la branche `main`. Il construit l'image Docker de production et la pousse vers un registre Docker Hub.
3.  **Deploy (CD)** : Déploie automatiquement l'application mise à jour sur la plateforme d'hébergement.

> [!IMPORTANT]
> Pour que le pipeline fonctionne sur votre propre dépôt GitHub, vous devez configurer les **GitHub Secrets** suivants dans les paramètres de votre dépôt (`Settings > Secrets and variables > Actions`) :
> *   `DOCKERHUB_USERNAME` : Votre identifiant Docker Hub.
> *   `DOCKERHUB_TOKEN` : Votre token d'accès personnel Docker Hub.
> *   `RENDER_DEPLOY_HOOK` : (Optionnel) L'URL du webhook de déploiement Render/Railway.

---

## 🛠️ Raccourcis Utiles (Makefile)

Un fichier `Makefile` est fourni à la racine pour simplifier l'orchestration et l'exécution des commandes DevOps courantes :

| Commande | Action Réalisée |
| :--- | :--- |
| `make install` | Installe proprement toutes les dépendances Node.js locales. |
| `make test` | Lance les tests unitaires et génère le rapport de couverture. |
| `make build` | Construit l'image Docker locale sans Docker Compose. |
| `make run` | Démarre l'application dans Docker Compose en mode détaché. |
| `make stop` | Arrête et nettoie les ressources de Docker Compose. |
| `make clean` | Supprime les dossiers temporaires `node_modules` et `coverage`. |

---

## 📡 Points d'Accès de l'Application (API & UI)

Une fois l'application démarrée (via Node.js local ou Docker à l'adresse `http://localhost:3000`), vous pouvez tester les fonctionnalités suivantes :

### 🖥️ Pages Web & Interfaces (UI)
*   **Tableau de Bord Principal (`/`)** : Affiche les métriques de performance en temps réel, l'uptime, l'état de santé ainsi que les informations de build injectées lors de la compilation de l'image Docker.
*   **Statut du Pipeline (`/pipeline`)** : Représentation visuelle de la chaîne CI/CD du projet.
*   **Visualisation des Tests (`/tests`)** : Interface interactive affichant le statut des tests Jest et la couverture.
*   **À propos (`/about`)** : Informations complémentaires sur les technologies DevOps utilisées.

### 🔌 Endpoints API (JSON)
*   **Santé du Système** : `GET /api/health` — Retourne le statut global de l'application (ex: `{"status":"UP","timestamp":"..."}`).
*   **Métriques de Performance** : `GET /api/metrics` — Donne l'uptime en secondes, le nombre total de requêtes traitées et le temps de réponse simulé.
*   **Informations de Version** : `GET /api/version` — Retourne la version actuelle du projet.
*   **Métadonnées de Build** : `GET /api/build-info` — Fournit les informations de build injectées lors du processus CI/CD (`version`, `commit`, `buildDate`, `pipelineStatus`).

---

## 🔍 Dépannage (Troubleshooting)

*   **Erreur : Port 3000 déjà utilisé**
    *   *Solution* : Modifiez la variable `PORT` dans le fichier `.env` ou modifiez la redirection des ports dans le fichier `docker-compose.yml` (ex: `"8080:3000"`).
*   **Erreur de Permissions Docker**
    *   *Solution* : Si vous obtenez une erreur d'autorisation lors de l'exécution de Docker, préfixez les commandes par `sudo` ou ajoutez votre utilisateur courant au groupe `docker` : `sudo usermod -aG docker $USER` (puis redémarrez votre session).
*   **Les modifications de code ne sont pas prises en compte sous Docker**
    *   *Solution* : N'oubliez pas de recompiler l'image avec `docker compose up -d --build` après chaque modification du code source.
