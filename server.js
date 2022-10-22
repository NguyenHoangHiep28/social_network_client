//Install express server
const express = require('express');
// const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/social_network_client'));

app.get('/*', (req, res) =>
  res.sendFile('src/index.html', {root: 'dist/social_network_client/'}),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
