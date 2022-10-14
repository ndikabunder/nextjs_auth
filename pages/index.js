import Link from 'next/link';
import { getSession, useSession, signOut } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  function handleSignOut() {
    signOut();
  }

  return <>{session ? User({ session, handleSignOut }) : Guest()}</>;
}

// Guest
function Guest() {
  return (
    <main className='min-h-screen flex flex-col justify-center items-center space-y-5'>
      <h1 className='text-4xl font-black underline'>Guest Homepage</h1>
      <div className='flex justify-cente '>
        <Link href='http://localhost:3000/auth/login'>
          <a className='px-10 py-2 rounded-lg bg-slate-900 text-slate-100 cursor-pointer hover:bg-slate-700'>
            Sign In
          </a>
        </Link>
      </div>
    </main>
  );
}

// Authorize User
function User({ session, handleSignOut }) {
  return (
    <main className='min-h-screen flex flex-col justify-center items-center space-y-5'>
      <h1 className='text-4xl font-black underline'>Authorize User Homepage</h1>

      <div className='details'>
        <h5>{session.user.email}</h5>
      </div>

      <div className='flex justify-center '>
        <button
          onClick={handleSignOut}
          className='px-10 py-2 rounded-lg bg-red-900 text-red-100 cursor-pointer hover:bg-red-700'
        >
          Sign Out
        </button>
      </div>

      <div className='flex justify-center '>
        <Link href='http://localhost:3000/auth/login'>
          <a className='px-10 py-2 rounded-lg bg-slate-900 text-slate-100 cursor-pointer hover:bg-slate-700'>
            Profile Page
          </a>
        </Link>
      </div>
    </main>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
