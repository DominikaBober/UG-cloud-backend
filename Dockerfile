FROM registry.access.redhat.com/ubi8/nodejs-20:latest
COPY ./package.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]