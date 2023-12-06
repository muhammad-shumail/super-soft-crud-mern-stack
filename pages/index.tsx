import { GetServerSideProps } from 'next'
import Link from 'next/link'
import dbConnect from '../lib/dbConnect'
import Student, { Students } from '../models/Students'

type Props = {
  students: Students[]
}

const Index = ({ students }: Props) => {
  return (
    <>
      {students.map((student) => (
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
                <Link href={{ pathname: '/[id]/edit', query: { id: student._id } }}>
                  <button className="btn edit">Edit</button>
                </Link>
                <Link href={{ pathname: '/[id]', query: { id: student._id } }}>
                  <button className="btn view">View</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

/* Retrieves student(s) data from mongodb database */
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  await dbConnect()

  /* find all the data in our database */
  const result = await Student.find({})

  /* Ensures all objectIds and nested objectIds are serialized as JSON data */
  const students = result.map((doc) => {
    const student = JSON.parse(JSON.stringify(doc))
    return student
  })

  return { props: { students: students } }
}

export default Index
