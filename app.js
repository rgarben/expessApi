const express = require("express");
const cors = require("cors");
const librosRouters = require ("./routes/libros");
const categorysRouters = require ("./routes/categorys");
const autoresRouters = require ("./routes/autores");
const usersRouters = require ("./routes/users")
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();
dotenv.config();

mongoose.set("strictQuery", false);

async function main() {
    await mongoose.connect(process.env.MONGO_CNN);
    console.log('Database connected');
}
main().catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.use('/book', librosRouters);
app.use('/category', categorysRouters);
app.use('/author', autoresRouters);
app.use('/user', usersRouters);

app.listen(process.env.PORT, ()=>{
    console.log(`Servidor en funcionamiento en el puerto ${process.env.PORT}`)
})