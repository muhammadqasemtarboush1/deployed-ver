import React from 'react'
import Head from 'next/head'

import { useAuth } from '../../../contexts/Auth';
import { useRouter } from 'next/router';

import Navbar from '../../Navbar';
import Footer from '../../Footer';


export function ProUserProfile() {
  const router = useRouter();
  const { isAuth } = useAuth();

  if (!isAuth) {
    router.push('/account/login');
    return
  }
  return (
    <>
      <div className={"container mx-auto px-4"}>
        <Head>
          <title>My Profile</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <main>

        </main>
        <Footer />
      </div>

    </>
  )
}

