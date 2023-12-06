import mongoose from 'mongoose'

export interface Students extends mongoose.Document {
  name: string
  father_name: string
  student_class: string
  species: string
  age: number
  attendance: boolean
  subjects: string[]
  photo_url: string
  hobbies: string[]
  goals: string[]
}



/* PetSchema will correspond to a collection in your MongoDB database. */
/* StudentSchema will correspond to a collection in your MongoDB database. */
const StudentSchema = new mongoose.Schema<Students>({
  name: {
    /* The name of the student */
    type: String,
    required: [true, 'Please provide the name of the student'],
    maxlength: [20, "Student's name cannot be more than 20 characters"],
  },
  father_name: {
    /* The name of the student's father */
    type: String,
    required: [true, 'Please provide the name of the student\'s father'],
    maxlength: [40, 'Father name specified cannot be more than 40 characters'],
  },
  student_class: {
    /* The student_class of the student */
    type: String,
    required: [true, 'Please provide the student class of the student'],
    maxlength: [10, 'Class specified cannot be more than 10 characters'],
  },
  age: {
    /* The age of the student in years */
    type: Number,
  },
  attendance: {
    /* The attendance status of the student */
    type: Boolean,
  },
  subjects: {
    /* The subjects that the student is enrolled in */
    type: [String],
  },
  photo_url: {
    /* The photo url of the student */
    required: [true, 'Please provide a photo url for this student'],
    type: String,
  },
  hobbies: {
    /* The hobbies of the student */
    type: [String],
  },
  goals: {
    /* The goals of the student */
    type: [String],
  },
})

export default mongoose.models.Students || mongoose.model<Students>('Students', StudentSchema)
