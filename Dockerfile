# Stage 1: Build the React application from source code
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json to leverage Docker layer caching
COPY package.json ./

# Install all dependencies from package.json
RUN npm install

# Copy the rest of the application source code (tsx, ts, html files, etc.)
COPY . .

# Run the build script defined in package.json. This will create a 'dist' folder.
RUN npm run build

# Stage 2: Serve the built application with a lightweight Nginx server
FROM nginx:1.25-alpine

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the entrypoint script that will run on container start
COPY entrypoint.sh /entrypoint.sh

# Make the script executable AND fix potential Windows line ending issues.
# This is a critical step to prevent "no such file or directory" runtime errors.
RUN chmod +x /entrypoint.sh \
    && sed -i 's/\r$//' /entrypoint.sh

# Copy the compiled application (the 'dist' folder) from the 'builder' stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for web traffic
EXPOSE 80

# Set the entrypoint script to run when the container starts
ENTRYPOINT ["/entrypoint.sh"]
