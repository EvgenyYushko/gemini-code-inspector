#!/bin/sh

# This script is the entrypoint for the Docker container.
# It generates a config.js file with the runtime environment variable
# for the API key, and then starts the Nginx server.

# Set the path for the config file in the Nginx web root
CONFIG_FILE=/usr/share/nginx/html/config.js

# Check if the API_KEY environment variable is set.
# This variable must be configured in your Render.com service settings.
if [ -z "$API_KEY" ]; then
  echo "Warning: API_KEY environment variable is not set."
  # Create a config with a null key to allow the app to load without crashing.
  echo "window.runtimeConfig = { apiKey: null };" > $CONFIG_FILE
else
  # Create the config.js file and inject the API key.
  # The key is enclosed in quotes to handle special characters.
  echo "window.runtimeConfig = { apiKey: \"${API_KEY}\" };" > $CONFIG_FILE
fi

echo "config.js created successfully."

# Execute the main container command (start Nginx)
exec nginx -g 'daemon off;'
