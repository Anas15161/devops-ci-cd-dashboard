# Detect if docker-compose (v1) or docker compose (v2) is available
DOCKER_COMPOSE := $(shell command -v docker-compose 2> /dev/null || echo "docker compose")

.PHONY: help install test build run stop clean

help:
	@echo "Available commands:"
	@echo "  make install  - Install dependencies"
	@echo "  make test     - Run unit tests"
	@echo "  make build    - Build Docker image"
	@echo "  make run      - Run application with docker compose"
	@echo "  make stop     - Stop docker compose services"
	@echo "  make clean    - Remove node_modules and coverage"

install:
	npm install

test:
	npm test

build:
	docker build -t devops-ci-cd-dashboard .

run:
	$(DOCKER_COMPOSE) up -d

stop:
	$(DOCKER_COMPOSE) down

clean:
	rm -rf node_modules coverage
