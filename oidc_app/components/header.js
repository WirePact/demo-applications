import { signOut, useSession } from 'next-auth/react';
export default function Header() {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-800 border-gray-200 px-2 sm:px-4 py-2.5 text-white text-right">
      <span>Hello &quot;{session?.user.name}&quot;</span>
      <button
        className="inline-block ml-8 px-3 py-1 bg-gray-700 rounded hover:bg-gray-500 transition-colors"
        onClick={signOut}
      >
        logout
      </button>
    </nav>
  );
}
