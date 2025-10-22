FROM node:22-alpine AS build
FROM pnpm:9-alpine

# Set the working directory
WORKDIR /

# Install dependencies
RUN pnpm install

# Expose the application port
EXPOSE 25502

# Command to run the application
CMD ["nodemon", "src/app.js"]