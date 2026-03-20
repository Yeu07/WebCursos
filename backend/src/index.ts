import express from 'express';

const app = express();
const PORT = 6601

app.listen(PORT, () => {
    console.log("Activado")
})