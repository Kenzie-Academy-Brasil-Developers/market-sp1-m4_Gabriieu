import express, { Application, json } from "express";
import { deleteProduct, getAllProducts, getProductByID, postProduct, updateProduct } from "./logic";
import { idValidation, nameValidation, objectKeyValidation, patchNameValidation } from "./middlewares";

const app: Application = express()
app.use(json())


app.post('/products', nameValidation, postProduct)
app.get('/products', getAllProducts)
app.get('/products/:id', idValidation, getProductByID)
app.delete('/products/:id', idValidation, deleteProduct)
app.patch('/products/:id', patchNameValidation, idValidation, objectKeyValidation, updateProduct)

const port: number = 3000
const appRunningMsg: string = `Application is running on https://localhost:${port}`
app.listen(port, () =>{console.log(`${appRunningMsg}`)})