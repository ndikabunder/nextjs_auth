import React from 'react';
import { useFormik } from 'formik';
import Link from 'next/link';
import { loginValidate } from '../../lib/validate';
import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();

  // Formik hook
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: loginValidate,
    onSubmit,
  });

  async function onSubmit(values) {
    const status = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: '/',
    });

    if (status.ok) router.push(status.url);
  }
  return (
    <section className='bg-gray-50 '>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl '>
              Login
            </h1>
            <form
              className='space-y-4 md:space-y-6'
              onSubmit={formik.handleSubmit}
            >
              <div>
                <label
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium text-gray-900 '
                >
                  Your email
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5'
                  placeholder='name@company.com'
                  required
                  {...formik.getFieldProps('email')}
                />
              </div>
              {formik.errors.email && formik.touched.email ? (
                <span className='text-rose-600'>{formik.errors.email}</span>
              ) : (
                <></>
              )}
              <div>
                <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium text-gray-900 '
                >
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5'
                  required
                  {...formik.getFieldProps('password')}
                />
                {formik.errors.password && formik.touched.password ? (
                  <span className='text-rose-600 mt-2'>
                    {formik.errors.password}
                  </span>
                ) : (
                  <></>
                )}
              </div>

              <button
                type='submit'
                className='w-full text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
              >
                Sign In
              </button>
              <p className='text-sm font-light text-gray-500 '>
                Don't have an account?{' '}
                <Link
                  href='http://localhost:3000/auth/register'
                  className='font-black text-sky-600 hover:underline '
                >
                  Create Account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
