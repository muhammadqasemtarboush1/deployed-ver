import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/Auth';
import Link from 'next/link';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'

import "nprogress/nprogress.css";
import NProgress from 'nprogress';

export default function Login() {


    // form validation rules 
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };


    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    const { login, isAuth } = useAuth();
    const router = useRouter();

    const { status } = router.query


    async function handleLogin(data) {
        NProgress.start()
        await login(data.email, data.password);
        router.push('vistisInfo');
    }



    return (
        <>


            <section className="h-screen">
                <div className="h-full text-gray-800">
                    <div className='flex h-20 py-3 pl-12 bg-gradient-to-r from-teal-100 to-teal-50'>
                        <Image src="/images/logo.png" width={140} height={30} className='ml-3' />
                    </div>
                    <div
                        className="flex flex-wrap items-center justify-center h-full xl:justify-center lg:justify-between g-6"
                    >
                        <div
                            className="mb-12 grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 md:mb-0"
                        >
                            <Image height={400} width={600} src="/images/loginForm.webp" />

                        </div>
                        <div className="mb-12 xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 md:mb-0">
                            <form onSubmit={handleSubmit(handleLogin)}>

                                <div className="mb-6">
                                    <input
                                        {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}` + "block w-full px-4 py-2 m-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"}
                                        type="text"
                                        name='email'
                                        id="email"
                                        placeholder="Email address"
                                    />
                                    <div className="text-red-600">{errors.email?.message}</div>
                                </div>


                                <div className="mb-6">
                                    <input
                                        {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}` + "block w-full px-4 py-2 m-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"}
                                        type="password"
                                        id="password"
                                        placeholder="Password"
                                    />
                                    <div className="text-red-600">{errors.password?.message}</div>

                                    <div className="text-red-600"> {status == "failed" ? "Email Or Password is incorrect" : ""}</div>



                                </div>

                                <div className="flex items-center justify-between mb-6">
                                    <div className="form-group form-check">
                                        <a href="#!" className="float-left text-gray-800">Forgot password?</a>
                                    </div>
                                </div>

                                <div className="text-center lg:text-left">
                                    <button
                                        id='loginButton'
                                        type="submit"
                                        className="inline-block py-3 text-sm font-medium leading-snug text-white uppercase transition duration-150 ease-in-out bg-blue-600 rounded shadow-md px-7 hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                                    >
                                        Login
                                    </button>
                                    <p className="pt-1 mt-2 mb-0 text-sm font-semibold">
                                        Do not have an account?
                                        <Link href="signup"><a className="text-red-600 transition duration-200 ease-in-out hover:text-red-700 focus:text-red-700"> Register</a></Link>

                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}