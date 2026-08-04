import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    buyerType: { type: String, required: true, trim: true },
    monthlyVolume: { type: String, trim: true },
    selectedCollections: [{ type: String, trim: true }],
    city: { type: String, trim: true },
    gstNumber: { type: String, trim: true },
    message: { type: String, required: true, trim: true, maxlength: 3000 },
    status: {
      type: String,
      enum: ['new', 'contacted', 'qualified', 'won', 'closed'],
      default: 'new'
    }
  },
  { timestamps: true }
);

export default mongoose.model('Inquiry', inquirySchema);
