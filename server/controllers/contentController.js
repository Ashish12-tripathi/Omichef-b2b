import SiteContent from '../models/SiteContent.js';
import { defaultContent } from '../seeds/defaultContent.js';

export async function getContent(req, res) {
  let doc = await SiteContent.findOne({ key: 'main' }).lean();
  if (!doc) {
    doc = await SiteContent.create({ key: 'main', data: defaultContent });
  }
  return res.json(doc.data);
}

export async function updateContent(req, res) {
  const data = req.body;
  const doc = await SiteContent.findOneAndUpdate(
    { key: 'main' },
    { key: 'main', data },
    { upsert: true, new: true, runValidators: true }
  );
  return res.json({ message: 'Website content updated.', data: doc.data });
}

export async function resetContent(req, res) {
  const doc = await SiteContent.findOneAndUpdate(
    { key: 'main' },
    { key: 'main', data: defaultContent },
    { upsert: true, new: true }
  );
  return res.json({ message: 'Default content restored.', data: doc.data });
}
