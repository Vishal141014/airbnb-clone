import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <h1 className="mb-4 text-4xl font-bold text-black">404</h1>
      <h2 className="mb-6 text-2xl font-semibold">Page Not Found</h2>
      <p className="mb-6 text-gray-600">We couldn't find the page you're looking for.</p>
      <Link 
        href="/"
        className="rounded-lg bg-black px-4 py-2 text-white transition hover:bg-gray-800"
      >
        Go back home
      </Link>
    </div>
  );
} 