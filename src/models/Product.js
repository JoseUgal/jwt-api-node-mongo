import { Schema, model } from 'mongoose';

const productSchema = new Schema({
    name: String,
    category: String,
    price: Number,
    imgUrl: String
}, {
    timestamps: true,
    versionKey: false // Deshabilitamos el --w en cada documento.
})

export default model('Product', productSchema);