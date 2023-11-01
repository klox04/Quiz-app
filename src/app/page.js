import Link from "next/link"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-6">Quiz App</h1>
     <Link href='/quiz'>
     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">Start Quiz</button>
     </Link>
    </main>
  )
}
