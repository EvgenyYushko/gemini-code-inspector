#!/bin/sh

# Set the path for the config file in the Nginx web root
CONFIG_FILE=/usr/share/nginx/html/config.js

# This script runs on container startup.
# It reads the API_KEY from the environment variables (provided by Render)
# and dynamically creates the config.js file for the frontend.

# Check if the API_KEY is set.
if [ -z "$API_KEY" ]; then
  echo "Warning: API_KEY environment variable is not set."
  # Create a config with a null key to allow the app to load without crashing.
  echo "window.runtimeConfig = { apiKey: null };" > $CONFIG_FILE
else
  # Create the config.js file and inject the API key.
  echo "window.runtimeConfig = { apiKey: \"${API_KEY}\" };" > $CONFIG_FILE
fi

echo "config.js created successfully."

# Start the Nginx server in the foreground
exec nginx -g 'daemon off;'
