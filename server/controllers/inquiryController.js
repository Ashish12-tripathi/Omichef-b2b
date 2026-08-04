import Inquiry from '../models/Inquiry.js';

export async function createInquiry(req, res) {
  const inquiry = await Inquiry.create(req.body);
  return res.status(201).json({
    message: 'Thank you. Your bulk purchase requirement has been submitted.',
    id: inquiry._id
  });
}

export async function listInquiries(req, res) {
  const { status, search = '', page = 1, limit = 50 } = req.query;
  const query = {};
  if (status) query.status = status;
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } }
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    Inquiry.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).lean(),
    Inquiry.countDocuments(query)
  ]);

  return res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
}

export async function updateInquiry(req, res) {
  const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!inquiry) return res.status(404).json({ message: 'Inquiry not found.' });
  return res.json({ message: 'Inquiry updated.', inquiry });
}

export async function deleteInquiry(req, res) {
  const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
  if (!inquiry) return res.status(404).json({ message: 'Inquiry not found.' });
  return res.json({ message: 'Inquiry deleted.' });
}
