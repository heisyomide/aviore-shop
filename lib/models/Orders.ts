// lib/models/Order.ts
import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  amount: { type: Number, required: true },
  tx_ref: { type: String, required: true, unique: true }, // Flutterwave ID
  status: { type: String, enum: ['PENDING', 'SUCCESS', 'FAILED'], default: 'PENDING' },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
}, { timestamps: true });

export const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);