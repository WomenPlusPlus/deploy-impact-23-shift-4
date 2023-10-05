# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory within the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire client directory to the container
COPY . .

# Expose the port your app will run on (if applicable)
# EXPOSE 3000

# Specify the command to run your application (replace 'npm start' with your start command)
CMD ["npm", "start"]
