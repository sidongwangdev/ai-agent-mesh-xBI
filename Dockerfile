FROM node:18-bullseye-slim

WORKDIR /app

# Install dependencies for both frontend and backend
COPY frontend/package.json frontend/
COPY backend/package.json backend/

RUN cd frontend && npm install
RUN cd backend && npm install

# Copy source code
COPY frontend/ frontend/
COPY backend/ backend/

# Build frontend
RUN cd frontend && npm run build

# Expose backend port
EXPOSE 7860

# Start backend
WORKDIR /app/backend
ENV PORT=7860
CMD ["npm", "start"]
