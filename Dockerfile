# Use official Node.js image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json .env ./
RUN npm install

# Copy all files into the container
COPY . .

# Kopieer de database naar de juiste plek in de container
COPY data/database/data.db /app/data/database/data.db

# Expose Strapi's port
EXPOSE 1337

# Start Strapi
CMD ["npm", "run", "develop"]