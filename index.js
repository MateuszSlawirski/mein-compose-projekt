const express = require('express');
const redis = require('redis');

const app = express();
// Der Hostname 'redis' ist der Name unseres zweiten Services in der Compose-Datei!
const client = redis.createClient({
  url: 'redis://redis:6379'
});

client.on('error', (err) => console.log('Redis Client Error', err));

// Wir müssen die Verbindung explizit öffnen.
client.connect().then(() => {
  // Initialisiere den Zähler nur, wenn er nicht existiert.
  client.exists('visits').then((exists) => {
    if (!exists) {
      client.set('visits', 0);
    }
  });
});

app.get('/', async (req, res) => {
  try {
    let visits = await client.get('visits');
    res.send(`<h1>Anzahl der Besuche: ${visits}</h1><p>Lade die Seite neu, um den Zähler zu erhöhen.</p>`);
    await client.set('visits', parseInt(visits) + 1);
  } catch (err) {
    res.status(500).send("Konnte den Zähler nicht abrufen.");
  }
});

app.listen(8080, () => {
  console.log('Besucherzähler-App lauscht auf Port 8080');
});