FROM node:22-alpine AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY src/ ./src/

# Expose the application port
EXPOSE 25502

# Command to run the application
CMD ["node", "src/app.js"]