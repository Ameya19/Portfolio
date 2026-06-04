# syntax=docker/dockerfile:1

ARG NODE_VERSION=22

############################
# 1️⃣ Build Stage
############################
FROM node:${NODE_VERSION}-alpine AS build

WORKDIR /app

# Copy package files first (for better layer caching)
COPY package*.json ./

# Install dependencies (including devDependencies)
RUN npm ci

# Copy remaining source files
COPY . .

# Build Angular app for production
RUN npm run build -- --configuration production


############################
# 2️⃣ Production Stage
############################
FROM nginx:alpine

# Remove default nginx files
RUN rm -rf /usr/share/nginx/html/*

# ✅ Angular 17+ build output path
# Replace "portfolio" with your actual project name if different
COPY --from=build /app/dist/portfolio/browser /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
