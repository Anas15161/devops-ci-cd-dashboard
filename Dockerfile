# Stage 1: Build & Test
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm test

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Only copy production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy source code and frontend
COPY src/ ./src/

# Build-time arguments for metadata
ARG APP_VERSION=1.0.0
ARG COMMIT_HASH=unknown
ARG BUILD_DATE=unknown
ARG PIPELINE_STATUS=unknown

# Set environment variables
ENV APP_VERSION=$APP_VERSION
ENV COMMIT_HASH=$COMMIT_HASH
ENV BUILD_DATE=$BUILD_DATE
ENV PIPELINE_STATUS=$PIPELINE_STATUS
ENV NODE_ENV=production

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/health || exit 1

CMD ["npm", "start"]
