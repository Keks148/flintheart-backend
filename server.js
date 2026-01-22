const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const SECRET = 'FLINTHEART_SECRET';

let users = [
  { id: 1, login: 'admin', password: bcrypt.hashSync('admin123', 8), role: 'admin' },
  { id: 2, login: 'trader', password: bcrypt.hashSync('trader123', 8), role: 'trader' },
  { id: 3, login: 'client', password: bcrypt.hashSync('client123', 8), role: 'client' }
];

app.post('/login', (req, res) => {
  const { login, password } = req.body;
  const user = users.find(u => u.login === login);
  if (!user) return res.status(401).json({ error: 'Invalid login' });

  const valid = bcrypt.compareSync(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid password' });

  const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '2h' });
  res.json({ token, role: user.role });
});

app.post('/admin/create-user', (req, res) => {
  const { token, login, password, role } = req.body;
  try {
    const decoded = jwt.verify(token, SECRET);
    if (decoded.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });

    const hashed = bcrypt.hashSync(password, 8);
    users.push({ id: users.length + 1, login, password: hashed, role });
    res.json({ success: true });
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
});

app.listen(3000, () => {
  console.log('Backend running on http://localhost:3000');
});
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'Flintheart Backend' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});
