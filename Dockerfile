FROM node:12
LABEL maintainer_architect="iran.reyes@jam3.com"

# Set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy source files
COPY . .

# Install dependencies
RUN npm install

