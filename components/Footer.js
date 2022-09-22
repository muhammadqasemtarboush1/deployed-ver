import Image from 'next/image';
import Link from 'next/link'


export default function Footer() {
    return (
        <>
            <footer class="p-4 bg-white rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-900">
                <div class="sm:flex sm:items-center sm:justify-between">
                    <Image src='/images/logo.png' width='120' height='50' alt="Logo" />
                    <ul class="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <Link href="/Info/PrivacyPolicy" class="mr-4 hover:underline md:mr-6">Privacy Policy</Link>
                        </li>
                        <li>
                            <Link href="#" class="mr-4 hover:underline md:mr-6 ">Licensing</Link>
                        </li>
                        <li>
                            <Link href="#" class="hover:underline">Contact</Link>
                        </li>
                    </ul>
                </div>
                <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 Sehtak™. All Rights Reserved.
                </span>
            </footer>
        </>
    )
}