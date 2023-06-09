import express from "express";
import ProductManager from "./components/ProductManager.js";
import { error } from "console";

const app = express();
app.use(express.urlencoded({ extended: true }));

const productos = new ProductManager();
const readProducts = productos.readProducts();
//console.log(await readProducts);
app.get("/products", async (req, res) => {
  //console.log(await readProducts);MUESTRA productos EN CONSOLA
  let limit = parseInt(req.query.limit);
  if (!limit) return res.send(await readProducts);
  let allProducts = await readProducts;
  let productLimit = allProducts.slice(0, limit);
  //res.send(await readProducts); //muestra productos en navegador
  res.send(productLimit);
});
app.get("/products/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let allProducts = await readProducts;
  let productById = allProducts.find((product) => product.id === id);
  res.send(productById); //ver productos por id en navegador
});
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Express por Local Host ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error del servidor${error}`));
