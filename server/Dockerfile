FROM node:10-alpine
     
WORKDIR /home/server
 
# COPY package.json package.json
COPY . .
 
RUN npm install -g nodemon
 
# COPY . .
 
# EXPOSE 5000
 
# RUN npm install -g nodemon
# RUN npm start
CMD ["npm", "start"]
