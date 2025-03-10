const app = require("./app");
const logger = require("./utils/logger");

const port =  5000; // Changed port number to 5001

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use, trying another port...`);
    const newPort = port + 1;
    app.listen(newPort, () => {
      console.log(`Server is running on port ${newPort}`);
    });
  } else {
    throw err;
  }
});
