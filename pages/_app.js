import '../styles/globals.css';
import '../styles/globals.css';

import "nprogress/nprogress.css";
import NProgress from 'nprogress';
import Router from 'next/router';

import { AuthProvider } from '../contexts/Auth';
import { SSRProvider } from 'react-aria';



Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeComplete', () => NProgress.done());


function MyApp({ Component, pageProps }) {
  return (
    <>
      <SSRProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </SSRProvider>


    </>
  )
}

export default MyApp
