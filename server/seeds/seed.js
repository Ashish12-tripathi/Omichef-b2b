import 'dotenv/config';
import { connectDB } from '../config/db.js';
import SiteContent from '../models/SiteContent.js';
import { defaultContent } from './defaultContent.js';
import mongoose from 'mongoose';

try {
  await connectDB();
  await SiteContent.findOneAndUpdate(
    { key: 'main' },
    { key: 'main', data: defaultContent },
    { upsert: true, new: true }
  );
  console.log('Default OmiChef B2B content seeded.');
  await mongoose.disconnect();
  process.exit(0);
} catch (error) {
  console.error(error);
  process.exit(1);
}
