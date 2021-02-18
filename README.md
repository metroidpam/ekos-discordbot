Bot discord fait pour ekos nancy.

Ce bot permet de publier des messages de manière anonyme dans un channel spécifique (désigné par son identifiant).

Les messages sont stockés sur une base de donnée en JSON et accessibles depuis un lien web (http://ipserver:19213/api/discordbot/clef).

TO-DO LIST
- [x] Envoi du message anonyme
- [ ] Envoi réponse au mp
- [ ] Gestion de la config
- [ ] Gestion multichannel/multiserver
- [x] Log du message pour faciliter l'administration en cas de problème
- [ ] API
  - [x] Accès aux logs
  - [ ] Ajout de phrase finale

## Pour l'executer de manière native :
A la première execution : 
```
npm install
```
Pour démarrer le script après ça : 
```
node index.js ou npm start
```

## Pour l'executer à partir d'un conteneur docker : 
Dockerfile
```Dockerfile
FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 19213
CMD [ "node", "index.js" ]
```
Commande pour build :
```
docker build -t votrepseudo/nomduconteneur
```
