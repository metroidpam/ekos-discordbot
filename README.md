Bot discord fait pour ekos nancy.

Ce bot permet de publier des messages de manière anonyme dans un channel spécifique (désigné par son identifiant).

Les messages sont stockés sur une base de donnée en JSON et accessibles depuis un lien web (http://ipserver:19213/api/discordbot/clef).

Afin d'éxecuter le bot de manière normale : 
```
npm install
node index.js ou npm start
```

Afin d'executer le bot à partir d'un conteneur docker : 
```Dockerfile
FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 80
EXPOSE 443
CMD [ "node", "index.js" ]
```
