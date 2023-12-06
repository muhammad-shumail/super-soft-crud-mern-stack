import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/dbConnect'
import Students from '../../../models/Students'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const student = await Students.findById(id)
        if (!student) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: student })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const student = await Students.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!student) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: student })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedPet = await Students.deleteOne({ _id: id })
        if (!deletedPet) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
