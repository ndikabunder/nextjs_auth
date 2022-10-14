import connectMongo from '../../../database/conn';
import Users from '../../../model/Schema';
import { hash } from 'bcryptjs';

export default async function handler(req, res) {
  connectMongo().catch((error) => res.json({ msg: 'Connection Failed' }));

  // Only post method is accepted
  if (req.method === 'POST') {
    if (!req.body)
      return res.status(404).json({ error: 'Dont have form data' });
    const { email, password } = req.body;

    // Checkduplicate users
    const checkExisting = await Users.findOne({ email });
    if (checkExisting)
      return res.status(422).json({ msg: 'User already exists' });

    // Hash password
    Users.create(
      {
        email,
        password: await hash(password, 12),
      },
      function (err, data) {
        if (err) return res.status(404).json({ err });
        res.status(201).json({ status: true, user: data });
      }
    );
  } else {
    res.status(500).json({ msg: 'HTTP method not valid only POST Accepted' });
  }
}
