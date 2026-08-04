import Appointment from '../models/Appointment.js';

export async function createAppointment(req, res) {
  const appointment = await Appointment.create(req.body);
  return res.status(201).json({
    message: 'Your appointment request has been received. Our team will confirm it shortly.',
    id: appointment._id
  });
}

export async function listAppointments(req, res) {
  const { status } = req.query;
  const query = status ? { status } : {};
  const items = await Appointment.find(query).sort({ createdAt: -1 }).lean();
  return res.json({ items });
}

export async function updateAppointment(req, res) {
  const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!appointment) return res.status(404).json({ message: 'Appointment not found.' });
  return res.json({ message: 'Appointment updated.', appointment });
}

export async function deleteAppointment(req, res) {
  const appointment = await Appointment.findByIdAndDelete(req.params.id);
  if (!appointment) return res.status(404).json({ message: 'Appointment not found.' });
  return res.json({ message: 'Appointment deleted.' });
}
