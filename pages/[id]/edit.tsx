import { useRouter } from 'next/router'
import useSWR from 'swr'
import Form from '../../components/Form'

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const EditPet = () => {
  const router = useRouter()
  const { id } = router.query
  const {
    data: student,
    error,
    isLoading,
  } = useSWR(id ? `/api/students/${id}` : null, fetcher)

  if (error) return <p>Failed to load</p>
  if (isLoading) return <p>Loading...</p>
  if (!student) return null

  const studentForm = {
    name: student.name,
    father_name: student.father_name,
    student_class: student.student_class,
    age: student.age,
    attendance: student.attendance,
    subjects: student.subjects,
    photo_url: student.photo_url,
    hobbies: student.hobbies,
    goals: student.goals,
  }

  return <Form formId="edit-student-form" studentForm={studentForm} forNewStudent={false} />
}

export default EditPet
