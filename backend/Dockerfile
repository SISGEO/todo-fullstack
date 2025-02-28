# syntax=docker/dockerfile:1.4
FROM node:18-alpine

# Install build dependencies
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install all dependencies (including dev dependencies)
RUN npm install

# Copy source code
COPY . .

# Build TypeScript code
RUN npm run build

# Clean up dev dependencies
RUN npm prune --production

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3333

# Expose port
EXPOSE 3333

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3333/health || exit 1

# Start the application
CMD ["npm", "start"] 