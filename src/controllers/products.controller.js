import Product from "../models/Product";

// Espicificamos la función como asincrona por que el await lo requiere
export const createProduct = async(req, res) => {

    // Realizamos la destructuración de clase
    const { name, category, price, imgUrl } = req.body;

    // Creamos un nuevo producto
    const newProduct = new Product({ name, category, price, imgUrl });

    // Espicificamos que el guardado es asincrono, para no tener que esperar a que esto termine.
    const productSaved = await newProduct.save();

    res.status(201).json(productSaved);
}

export const getProducts = async(req, res) => {

    // Recuperamos los productos
    const products = await Product.find();

    // Devolveremos todos los productos
    res.json(products);
}


export const getProductById = async(req, res) => {

    const product = await Product.findById(req.params.productId);

    res.status(200).json(product);

}


export const updateProductById = async(req, res) => {

    const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {
        new: true
    });

    res.status(200).json(updatedProduct);

}


export const deleteProductById = async(req, res) => {
    const { productId } = req.params;
    await Product.findByIdAndDelete(productId);
    res.json({ message: `Se ha eliminado correctamente el producto: ${ productId }` });
}