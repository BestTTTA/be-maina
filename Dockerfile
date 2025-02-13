# Backend Dockerfile
FROM node:18

# Set the working directory
WORKDIR /app

# Copy the application source code
COPY . .

RUN npm install

# Build the NestJS application
RUN npm run build

# Expose the port (optional if your app uses a specific port, e.g., 3000 or 5001)
EXPOSE 8000

CMD ["node", "dist/main.js"]
