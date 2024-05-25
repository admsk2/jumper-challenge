#!/bin/bash

# Ensure a command is provided
if [ -z "$1" ]; then
  echo "No command provided. Usage: ./command.sh <command>"
  exit 1
fi

# Get the command to run
COMMAND=$1

# Run the command in the backend directory
cd backend
echo "Running 'yarn $COMMAND' in backend..."
yarn $COMMAND &
BACKEND_PID=$!

# Run the command in the frontend directory
cd ../frontend
echo "Running 'yarn $COMMAND' in frontend..."
yarn $COMMAND &
FRONTEND_PID=$!

# Function to handle cleanup
cleanup() {
  echo "Shutting down backend and frontend..."
  kill $BACKEND_PID
  kill $FRONTEND_PID
  exit 0
}

# Trap SIGINT and SIGTERM to ensure cleanup happens
trap cleanup SIGINT SIGTERM

# Wait for both processes to exit
wait $BACKEND_PID
wait $FRONTEND_PID
