FROM node:14

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
# Install required packages
RUN apt-get update -y && \
    apt-get install fontforge ttfautohint -y
# Install app dependencies
COPY . .
RUN npm set unsafe-perm true
RUN npm install -g grunt-cli
RUN npm install
# Bundle app source
EXPOSE 3131
CMD [ "npm","start" ]
