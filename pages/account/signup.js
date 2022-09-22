// https://jasonwatmore.com/post/2021/09/03/next-js-form-validation-example-with-react-hook-form
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/Auth';


import Image from 'next/image';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export default function Signup() {
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;


    const { signup } = useAuth();
    const router = useRouter();

   async function handleSignup(data) {
        let userInput = {
            email: data.email,
            password: data.password
        }
  
        await signup(userInput);
        router.push('UserEditData');
    }
    return (
        <>
        <div className='backGroundCoverImage'>
            <div className='flex h-20 py-3 bg-gradient-to-r from-teal-100 to-teal-50 pl-14'> 
                <Image alt='headerLogo' src="/images/logo.png" width={140} height={30} className='ml-3'/> 
            </div>
            
            <main className='pl-8'>                    
                    <div class="bg-grey-lighter min-h-screen flex flex-col">
                    <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-1">
                        <div class="bg-white px-6 py-10 rounded shadow-md text-black w-full">
                        <form onSubmit={handleSubmit(handleSignup)}>
                            <h1 class="mb-8 text-2xl text-center">Create a new account</h1>
                            <div className="text-red-600">{errors.email?.message}</div>
                            <input
                                {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`+"block border border-grey-light w-full p-3 rounded mb-3"}
                                type="text"
                                name="email"
                                placeholder="Email" />
                            
                            <div className="text-red-600">{errors.password?.message}</div>
                            <input 
                                {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`+"block border border-grey-light w-full p-3 rounded mb-3"} 
                                type="password"
                                name="password"
                                placeholder="Password" />
                                
                            <div className="text-red-600">{errors.confirmPassword?.message}</div>
                            <input 
                                {...register('confirmPassword')} className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`+"block border border-grey-light w-full p-3 rounded mb-3"}
                                type="password"
                                
                                name="confirmPassword"
                                placeholder="Confirm Password" />
                                                      

                            <button
                                type="submit"
                                class="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none my-1"
                            >Create Account</button>

                            <div class="text-center text-sm text-grey-dark mt-4">
                                By signing up, you agree to the 
                                <a class="no-underline border-b border-grey-dark text-grey-dark" href="#">
                                    Terms of Service
                                </a> and 
                                <a class="no-underline border-b border-grey-dark text-grey-dark" href="#">
                                    Privacy Policy
                                </a>
                            </div>
                        </form>
                        </div>
                        <div class="text-grey-dark mt-6">
                            Already have an account?
                            <a class="underline border-b border-blue text-blue" href="login">
                                Log in
                            </a>
                        </div>
                    </div>
                </div>
        
            
            </main>

        </div>
        </>
    )
}