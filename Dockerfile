# Use Node.js 18 LTS
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code (only MCP server files)
COPY src/index.ts ./src/
COPY src/tools/ ./src/tools/
COPY tsconfig.json ./

# Install TypeScript globally for runtime
RUN npm install -g typescript ts-node

# Create a simple start script
RUN echo '#!/bin/sh\nts-node --esm src/index.ts' > start.sh && chmod +x start.sh

# Expose port (not needed for stdio but good practice)
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD echo '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}' | node -e "process.stdin.pipe(process.stdout)" || exit 1

# Set environment variables
ENV NODE_ENV=production
ENV OPENWEATHER_API_KEY=${OPENWEATHER_API_KEY}

# Run the MCP server
CMD ["./start.sh"]
