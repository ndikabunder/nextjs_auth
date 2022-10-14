import { getSession } from 'next-auth/react';
import Link from 'next/link';

export default function Profile() {
  return (
    <div className='container mx-auto text-center'>
      <h3 className='text-4xl font-bold'>Profile Page</h3>
      <Link href={'/'}>Home Page</Link>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
