# Stage 1: Build the React application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json to leverage Docker layer caching
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the application, which creates a 'dist' directory
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:1.25-alpine

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the entrypoint script
COPY entrypoint.sh /entrypoint.sh

# Make the script executable AND fix potential Windows line ending issues
# This line is the key fix for the "no such file or directory" error
RUN chmod +x /entrypoint.sh \
    && sed -i 's/\r$//' /entrypoint.sh

# Copy the built application from the builder stage to the Nginx web root
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for web traffic
EXPOSE 80

# Set the entrypoint script to run when the container starts
ENTRYPOINT ["/entrypoint.sh"]
