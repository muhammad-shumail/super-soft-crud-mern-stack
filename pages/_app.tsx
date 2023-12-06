import type { AppProps } from 'next/app'
import Head from 'next/head'
import Link from 'next/link'
import '../css/form.css'
import '../css/style.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Student Portal App</title>
      </Head>
      <header>
        <div className="head_container">
          <div className="logo">
            <h1 className="logo">Student Portal</h1>
          </div>
          <div className="menu" id="myTopnav">
            <ul>

              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/new">Add Student</Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/in/muhammad-shumail-ansari/"
                  className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  target="_blank"
                >
                  Linkedin Profile
                </Link>
                <Link
                  href="https://github.com/muhammad-shumail"
                  className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  target="_blank"
                >
                  Github Profile
                </Link>
                <Link
                  href="https://github.com/muhammad-shumail/super-soft-technology-project"
                  className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  target="_blank"
                >
                  Github Repo
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </header>

      <div className="wrapper grid">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
