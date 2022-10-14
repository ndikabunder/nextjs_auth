import React from 'react';
import { useFormik } from 'formik';
import Link from 'next/link';
import { registerValidate } from '../../lib/validate';
import { useRouter } from 'next/router';

export default function Register() {
  const router = useRouter();

  // Formik
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confPassword: '',
    },
    validate: registerValidate,
    onSubmit,
  });

  async function onSubmit(values) {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    };

    await fetch('http://localhost:3000/api/auth/signup/', options).then((res) =>
      res.json().then((data) => {
        if (data) router.push('http://localhost:3000/');
      })
    );
  }

  return (
    <section className='bg-gray-50 '>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl '>
              Create and account
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
              </div>
              {formik.errors.password && formik.touched.password ? (
                <span className='text-rose-600'>{formik.errors.password}</span>
              ) : (
                <></>
              )}
              <div>
                <label
                  htmlFor='confirm-password'
                  className='block mb-2 text-sm font-medium text-gray-900 '
                >
                  Confirm password
                </label>
                <input
                  type='confPassword'
                  name='confPassword'
                  id='confPassword'
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5'
                  required
                  {...formik.getFieldProps('confPassword')}
                />
              </div>
              {formik.errors.confPassword && formik.touched.confPassword ? (
                <span className='text-rose-600'>
                  {formik.errors.confPassword}
                </span>
              ) : (
                <></>
              )}
              <button
                type='submit'
                className='w-full text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
              >
                Sign Up
              </button>
              <p className='text-sm font-light text-gray-500 '>
                Already have an account?{' '}
                <Link
                  href='http://localhost:3000/auth/login'
                  className='font-black text-sky-600 hover:underline'
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
