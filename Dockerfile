# Starte mit einem offiziellen, schlanken Node.js Image
FROM node:22-alpine

# Setze das Arbeitsverzeichnis im Container
WORKDIR /usr/src/app

# Kopiere zuerst nur die package.json, um den Docker-Cache zu nutzen
COPY package*.json ./

# Installiere die Abhängigkeiten
RUN npm install

# Kopiere den Rest des Anwendungscodes
COPY . .

# Der Befehl, der beim Starten des Containers ausgeführt wird
CMD ["node", "index.js"]