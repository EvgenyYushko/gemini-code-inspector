# Stage 1: Build the React application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies using npm ci for faster, reliable builds
COPY package.json ./
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Build the application, creating a 'dist' directory with compiled assets
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:1.25-alpine

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy and make the entrypoint script executable
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Copy the built application from the builder stage to the Nginx web root
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Set the entrypoint script to run on container start
ENTRYPOINT ["/entrypoint.sh"]
