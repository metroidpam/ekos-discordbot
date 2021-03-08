Bot discord fait pour ekos nancy.

Fonctionnalités : 
Confessionnal :
> Envoyer des messages de manière anonyme dans un channel prédéfini.

Interro-surprise :
> Chaque jours à 10h, une question aléatoire sera posée à une personne aléatoire présente sur le serveur

Memes :
> Chaque jours à 17h, un meme tiré du site "lesjoiesducode.fr" sera publié avec son titre et son gif ([webscrapper dispo ici](https://github.com/metroidpam/webscrap-Lesjoiesducode))

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
