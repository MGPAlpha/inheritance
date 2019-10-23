let connect = require('connect');
let serveStatic = require('serve-static');

const PORT = isNaN(process.env.PORT) ? 8080 : parseInt(process.env.PORT);

connect().use(serveStatic(__dirname)).listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
})

