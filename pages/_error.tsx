import Link from 'next/link'

export default function Custom404() {
  return (
    <div className="error-page">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link href="/">
        <a>Go back home</a>
      </Link>
    </div>
  )
}
