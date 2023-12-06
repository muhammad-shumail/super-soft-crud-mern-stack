import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { useState } from 'react'
import dbConnect from '../../lib/dbConnect'
import Student, { Students } from '../../models/Students'

interface Params extends ParsedUrlQuery {
  id: string
}

type Props = {
  student: Students
}

/* Allows you to view student card info and delete student card*/
const StudentPage = ({ student }: Props) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const handleDelete = async () => {
    const petID = router.query.id

    try {
      await fetch(`/api/students/${petID}`, {
        method: 'Delete',
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the student.')
    }
  }

  return (
    <div key={student._id}>
      <div className="card">
        <img src={student.photo_url} />
        <h5 className="student-name">{student.name}</h5>
        <div className="main-content">
          <p className="student-name">{student.name}</p>
          <p className="owner">Owner: {student.father_name}</p>

          {/* Extra Student Info: Likes and Dislikes */}
          <div className="hobbies info">
            <p className="label">Likes</p>
            <ul>
              {student.hobbies.map((data, index) => (
                <li key={index}>{data} </li>
              ))}
            </ul>
          </div>
          <div className="goals info">
            <p className="label">Dislikes</p>
            <ul>
              {student.goals.map((data, index) => (
                <li key={index}>{data} </li>
              ))}
            </ul>
          </div>

          <div className="btn-container">
            <Link href={`/${student._id}/edit`}>
              <button className="btn edit">Edit</button>
            </Link>
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}: GetServerSidePropsContext) => {
  await dbConnect()

  if (!params?.id) {
    return {
      notFound: true,
    }
  }

  const student = await Student.findById(params.id).lean()

  if (!student) {
    return {
      notFound: true,
    }
  }

  /* Ensures all objectIds and nested objectIds are serialized as JSON data */
  const serializedStudent = JSON.parse(JSON.stringify(student))

  return {
    props: {
      student: serializedStudent,
    },
  }
}

export default StudentPage
