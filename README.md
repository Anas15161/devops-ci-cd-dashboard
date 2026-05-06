# 🚀 DevOps Mini Project

[![CI/CD Pipeline](https://github.com/<your-username>/<your-repo>/actions/workflows/main.yml/badge.svg)](https://github.com/<your-username>/<your-repo>/actions)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=flat&logo=docker&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=flat&logo=node.js&logoColor=white)

A complete end-to-end DevOps project showcasing a fully automated pipeline for a Node.js web application.

## 🏗 Architecture Diagram

```text
[ Developer ] --(git push)--> [ GitHub Repository ]
                                     |
                                     v
                          [ GitHub Actions (CI/CD) ]
                          /          |           \
               (Test)    /     (Build Docker)     \    (Deploy)
              [ Jest ] <--- [ Docker Hub ] ---> [ Render/Cloud ]
                                     |
                                     v
                            [ Running Container ]
```

## 📋 Features

- **Simple Web App**: Node.js Express API with health check.
- **Unit Testing**: Automated tests using Jest and Supertest.
- **Dockerized**: Multi-stage Dockerfile for optimized production images.
- **Orchestration**: Docker Compose for local development.
- **CI/CD**: GitHub Actions for automated testing, building, and deployment.
- **Automation**: Makefile for easy management.

## 🛠 Setup & Local Development

### Prerequisites
- Node.js (v20+)
- Docker & Docker Compose
- Make (optional)

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mini-devops-project
   ```

2. Install dependencies:
   ```bash
   make install  # or npm install
   ```

3. Run tests:
   ```bash
   make test     # or npm test
   ```

4. Run locally:
   ```bash
   npm start
   ```
   Access at `http://localhost:3000`

### Running with Docker
1. Build and run using Docker Compose:
   ```bash
   make run      # or docker-compose up -d
   ```
2. Check logs:
   ```bash
   docker-compose logs -f
   ```
3. Stop services:
   ```bash
   make stop     # or docker-compose down
   ```

## 🤖 CI/CD Explanation

The pipeline defined in `.github/workflows/main.yml` consists of three stages:

1.  **Test**: Runs on every push and pull request. It installs dependencies and executes Jest tests.
2.  **Build & Push**: Triggers only on pushes to the `main` branch. It builds the Docker image and pushes it to Docker Hub.
3.  **Deploy**: Simulations of a production deployment (can be connected to Render, Railway, or any SSH server).

### GitHub Secrets Required
To make the pipeline work, add these secrets to your GitHub repository:
- `DOCKERHUB_USERNAME`: Your Docker Hub username.
- `DOCKERHUB_TOKEN`: Your Docker Hub Personal Access Token.
- `RENDER_DEPLOY_HOOK`: (Optional) Deployment webhook URL.

## 📂 Project Structure

```text
├── .github/workflows/  # CI/CD pipeline definitions
├── src/                # Application source code
│   ├── app.js          # Express app logic
│   └── server.js       # Server entry point
├── tests/              # Unit tests
├── Dockerfile          # Production container definition
├── docker-compose.yml  # Local orchestration
├── Makefile            # Automation scripts
└── README.md           # Documentation
```

## 🔍 Troubleshooting

- **Port Conflict**: If port 3000 is taken, change the `PORT` in `.env`.
- **Docker Permission**: Ensure your user is in the `docker` group or run with `sudo`.
- **Tests Failing**: Check the output of `npm test` for detailed error messages.

## 📄 License
ISC
