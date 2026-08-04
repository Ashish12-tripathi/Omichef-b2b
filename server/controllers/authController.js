import jwt from 'jsonwebtoken';

export function login(req, res) {
  const { email, password } = req.body;
  const expectedEmail = process.env.ADMIN_EMAIL;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedEmail || !expectedPassword || !process.env.JWT_SECRET) {
    return res.status(500).json({ message: 'Admin credentials are not configured on the server.' });
  }

  if (email !== expectedEmail || password !== expectedPassword) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '12h' });
  return res.json({ token, admin: { email } });
}

export function verifySession(req, res) {
  return res.json({ valid: true, admin: req.admin });
}
