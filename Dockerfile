FROM node:alpine
COPY ./package.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]