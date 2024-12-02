# Use official Node.js image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json /app/
RUN npm install

# Copy the rest of the application files
COPY . /app/

# Expose the port for the app
EXPOSE 3000

# Command to start the app
CMD ["npm", "start"]
