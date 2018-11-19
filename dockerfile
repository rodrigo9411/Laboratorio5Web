FROM node:latest

# Create app directory
WORKDIR /app
ENV REDIS_URL = redis://redis
RUN npm install nodemon -g

# Install app dependencies
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 4000
CMD node index.js