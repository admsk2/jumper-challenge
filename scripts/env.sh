#!/bin/bash

# Define the source and destination file paths
SOURCE_FILE="backend/.env.template"
DEST_FILE="backend/.env"

# Check if the source file exists
if [ -f "$SOURCE_FILE" ]; then
    # Copy the source file to the destination file
    cp "$SOURCE_FILE" "$DEST_FILE"
    echo ".env.template has been copied to .env"
else
    echo "Source file .env.template does not exist."
fi
