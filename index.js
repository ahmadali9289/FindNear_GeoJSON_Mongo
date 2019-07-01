const app = require('./app');

const PORT = 4040 || process.env

app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
})