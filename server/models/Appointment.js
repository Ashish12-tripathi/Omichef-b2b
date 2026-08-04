import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    preferredDate: { type: String, required: true },
    preferredTime: { type: String, required: true },
    meetingType: {
      type: String,
      enum: ['phone', 'video', 'in-person'],
      default: 'video'
    },
    notes: { type: String, trim: true, maxlength: 2000 },
    status: {
      type: String,
      enum: ['requested', 'confirmed', 'completed', 'cancelled'],
      default: 'requested'
    }
  },
  { timestamps: true }
);

export default mongoose.model('Appointment', appointmentSchema);
