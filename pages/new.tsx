import Form from '../components/Form'

const NewStudent = () => {
  const studentForm = {
    name: '',
    father_name: '',
    student_class: '',
    age: 0,
    attendance: false,
    subjects: [],
    photo_url: '',
    hobbies: [],
    goals: [],
  }

  return <Form formId="add-student-form" studentForm={studentForm} />
}

export default NewStudent
