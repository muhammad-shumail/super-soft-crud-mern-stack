import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = {
    message: 'Hello, world!',
  };

  res.status(200).json(data);
}
