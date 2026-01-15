import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true }, 
  category: { type: String, enum: ['Denim', 'Tops', 'Shorts'], required: true },
  description: { type: String },
  images: [{ type: String }], 
  details: [{ type: String }], 
  isSold: { type: Boolean, default: false }, // The field that MUST flip to true
  isArchived: { type: Boolean, default: false }, 
  lotNumber: { type: String, unique: true }, 
}, { timestamps: true });

// Check if the model already exists to prevent re-compilation errors in Next.js
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product; // Changed to default export to fix your import errors