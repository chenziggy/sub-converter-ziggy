FROM node:22-alpine AS build

# Set the working directory
WORKDIR /usr

# Install dependencies
RUN npm install

# Expose the application port
EXPOSE 25502

# Command to run the application
CMD ["nodemon", "src/app.js"]