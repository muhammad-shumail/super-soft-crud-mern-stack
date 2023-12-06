import { useRouter } from 'next/router'
import { useState } from 'react'
import { mutate } from 'swr'

interface FormData {
  name: string
  father_name: string
  student_class: string
  age: number
  attendance: boolean
  subjects: string[]
  photo_url: string
  hobbies: string[]
  goals: string[]
}

interface Error {
  name?: string
  father_name?: string
  student_class?: string
  photo_url?: string
}

type Props = {
  formId: string
  studentForm: FormData
  forNewStudent?: boolean
}

const Form = ({ formId, studentForm, forNewStudent = true }: Props) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    name: studentForm.name,
    father_name: studentForm.father_name,
    student_class: studentForm.student_class,
    age: studentForm.age,
    attendance: studentForm.attendance,
    subjects: studentForm.subjects,
    photo_url: studentForm.photo_url,
    hobbies: studentForm.hobbies,
    goals: studentForm.goals,
  })

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form: FormData) => {
    const { id } = router.query

    try {
      const res = await fetch(`/api/students/${id}`, {
        method: 'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status.toString())
      }

      const { data } = await res.json()

      mutate(`/api/students/${id}`, data, true) // Update the local data without a revalidation
      router.push('/')
    } catch (error) {
      setMessage('Failed to update student')
    }
  }

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form: FormData) => {
    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status.toString())
      }

      router.push('/')
    } catch (error) {
      setMessage('Failed to add student')
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target
    const value =
      target.name === 'attendance'
        ? (target as HTMLInputElement).checked
        : target.value
    const name = target.name

    setForm({
      ...form,
      [name]: value,
    })
  }

  /* Makes sure student info is filled for student name, owner name, student_class, and image url*/
  const formValidate = () => {
    let err: Error = {}
    if (!form.name) err.name = 'Name is required'
    if (!form.father_name) err.father_name = 'Owner is required'
    if (!form.student_class) err.student_class = 'Species is required'
    if (!form.photo_url) err.photo_url = 'Image URL is required'
    return err
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const errs = formValidate()

    if (Object.keys(errs).length === 0) {
      forNewStudent ? postData(form) : putData(form)
    } else {
      setErrors({ errs })
    }
  }

  return (
    <>
      <div className="login-root">
        <div className="box-root flex-flex flex-direction--column" style={{ minHeight: '100vh', flexGrow: 1 }}>
          <div className="fullPageBackground loginbackground box-background--white padding-top--24">
            <div className="loginbackground-gridContainer">
              <div className="box-root flex-flex" style={{ gridArea: 'top / start / 8 / end' }}>
                <div className="box-root" style={{ backgroundImage: 'linear-gradient(white 0%, rgb(247, 250, 252) 33%)', flexGrow: 1 }}>
                </div>
              </div>
              <div className="box-root flex-flex" style={{ gridArea: '4 / 2 / auto / 5' }}>
                <div className="box-root box-divider--light-all-2 animationLeftRight tans3s" style={{ flexGrow: 1 }} />
              </div>
              <div className="box-root flex-flex" style={{ gridArea: '6 / start / auto / 2' }}>
                <div className="box-root box-background--blue800" style={{ flexGrow: 1 }} />
              </div>
              <div className="box-root flex-flex" style={{ gridArea: '7 / start / auto / 4' }}>
                <div className="box-root box-background--blue animationLeftRight" style={{ flexGrow: 1 }} />
              </div>
              <div className="box-root flex-flex" style={{ gridArea: '8 / 4 / auto / 6' }}>
                <div className="box-root box-background--gray100 animationLeftRight tans3s" style={{ flexGrow: 1 }} />
              </div>
              <div className="box-root flex-flex" style={{ gridArea: '2 / 15 / auto / end' }}>
                <div className="box-root box-background--cyan200 animationRightLeft tans4s" style={{ flexGrow: 1 }} />
              </div>
              <div className="box-root flex-flex" style={{ gridArea: '3 / 14 / auto / end' }}>
                <div className="box-root box-background--blue animationRightLeft" style={{ flexGrow: 1 }} />
              </div>
              <div className="box-root flex-flex" style={{ gridArea: '4 / 17 / auto / 20' }}>
                <div className="box-root box-background--gray100 animationRightLeft tans4s" style={{ flexGrow: 1 }} />
              </div>
              <div className="box-root flex-flex" style={{ gridArea: '5 / 14 / auto / 17' }}>
                <div className="box-root box-divider--light-all-2 animationRightLeft tans3s" style={{ flexGrow: 1 }} />
              </div>
            </div>
          </div>
          <div className="box-root padding-top--24 flex-flex flex-direction--column" style={{ flexGrow: 1, zIndex: 9 }}>
            <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
              <h1>Create a new account for the Student Portal</h1>
            </div>
            <div className="twoColumnForm formbg-outer">
              <div className="formbg">
                <div className="formbg-inner padding-horizontal--48">
                  <span className="padding-bottom--15">Create a new student account</span>
                  <form id="student-signup" onSubmit={handleSubmit}>
                    <div className="field padding-bottom--24">
                      <label htmlFor="name">Student Name</label>
                      <input
                        type="text"
                        maxLength={20}
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="field padding-bottom--24">
                      <label htmlFor="father_name">Father's Name</label>
                      <input
                        type="text"
                        maxLength={20}
                        name="father_name"
                        value={form.father_name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="field padding-bottom--24">
                      <label htmlFor="student_class">Student Class</label>
                      <input
                        type="text"
                        maxLength={30}
                        name="student_class"
                        value={form.student_class}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="field padding-bottom--24">
                      <label htmlFor="age">Age</label>
                      <input
                        type="number"
                        name="age"
                        value={form.age}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="checkbox-container">
                      <label htmlFor="attendance" className="checkbox-label">
                        Attendance
                      </label>
                      <input
                        type="checkbox"
                        name="attendance"
                        checked={form.attendance}
                        onChange={handleChange}
                        className="custom-checkbox"
                      />
                    </div>

                    <div className="field padding-bottom--24">
                      <label htmlFor="subjects">Favorite Subjects</label>
                      <textarea
                        name="subjects"
                        maxLength={60}
                        value={form.subjects}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="field padding-bottom--24">
                      <label htmlFor="photo_url">Profile Photo URL</label>
                      <input
                        type="url"
                        name="photo_url"
                        value={form.photo_url}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="field padding-bottom--24">
                      <label htmlFor="hobbies">Hobbies</label>
                      <textarea
                        name="hobbies"
                        maxLength={60}
                        value={form.hobbies}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="field padding-bottom--24">
                      <label htmlFor="goals">Academic Goals</label>
                      <textarea
                        name="goals"
                        maxLength={60}
                        value={form.goals}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="field padding-bottom--24">
                      <button type="submit" className="btn">
                        Create Account
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

          </div>
          <p>{message}</p>
          <div>
            {Object.keys(errors).map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </div>

        </div>
      </div>


      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  )
}

export default Form
