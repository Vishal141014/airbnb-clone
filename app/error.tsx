'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <h1 className="mb-4 text-3xl font-bold text-red-500">Something went wrong</h1>
      <p className="mb-6 text-gray-600">We're sorry, but something went wrong on our end.</p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="rounded-lg bg-black px-4 py-2 text-white transition hover:bg-gray-800"
        >
          Try again
        </button>
        <button
          onClick={() => router.push('/')}
          className="rounded-lg border border-black px-4 py-2 text-black transition hover:bg-gray-100"
        >
          Go back home
        </button>
      </div>
    </div>
  );
} 