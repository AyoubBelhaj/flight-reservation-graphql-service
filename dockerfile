# Base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install ts-node globally
RUN npm install -g ts-node typescript

# Copy the rest of the application files
COPY . .

# Expose the port your service listens to
EXPOSE 4000

# Run the TypeScript server file
CMD ["npx", "ts-node", "server.ts"]
