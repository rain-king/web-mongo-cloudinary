import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();
app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.connect(process.env.MONGODB_URI, { dbName: "BD-Nube-Gus" })
	.then(() => console.log("Servidor conectado correctamente con MongoDB Atlas"))
	.catch(err => console.error("Error al conectar MongoDB:", err));

const Imagen = mongoose.model(
	"Nube-1",
	new mongoose.Schema({
		nombre: String,
		url: String
	}),
	"Nube-1"
);

app.get("/api/images", async (req, res) => {
	try {
		const imagenes = await Imagen.find({});
		res.json(imagenes);
	} catch (error) {
		res.status(500).json({ error: "Error al obtener imágenes" });
	}
});

app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Servidor iniciado en puerto ${PORT}`));
