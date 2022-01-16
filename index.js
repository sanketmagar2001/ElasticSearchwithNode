const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());

app.use('/api/v1',routes);

let PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`The server is listening on port ${PORT}`);
});
