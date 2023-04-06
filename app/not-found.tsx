import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center">
      <h1 className="text-2xl 2xl:text-3xl">Page Not Found</h1>
      <Link href="/" className="text-xl 2xl:text-2xl">
        Go back to Top
      </Link>
    </section>
  )
}
