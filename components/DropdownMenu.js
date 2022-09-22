import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import { Fragment } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function DropdownMenu() {
  return (
    // <Menu>
    //   <Menu.Button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Medical Centers</Menu.Button>
    //   <Transition
    //     as={Fragment}
    //     enter="transition duration-100 ease-out"
    //     enterFrom="transform scale-95 opacity-0"
    //     enterTo="transform scale-100 opacity-100"
    //     leave="transition duration-75 ease-out"
    //     leaveFrom="transform scale-100 opacity-100"
    //     leaveTo="transform scale-95 opacity-0"
    //   >
    //   <Menu.Items className=" z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
    //     <Menu.Item>
    //       {({ active }) => (
    //         <button
    //           className={`${active && 'bg-blue-100'} w-full rounded-md p-2`}>
    //           <Link href='/Doctors/Doctors'>Doctors</Link>
    //         </button>
    //       )}
    //     </Menu.Item>
    //     <Menu.Item>
    //       {({ active }) => (
    //         <button className={`${active && 'bg-blue-100'} w-full rounded-md p-2`}>
    //         <Link href='/Pharmacies/Pharmacies'>Pharmacies</Link>
    //         </button>
    //       )}
    //     </Menu.Item>
    //     <Menu.Item>
    //       {({ active }) => (
    //         <button
    //           className={`${active && 'bg-blue-100'} w-full rounded-md p-2`}>
    //         <Link href='/Labs/Labs'>Labs</Link>
    //         </button>
    //       )}
    //     </Menu.Item>
    //     <Menu.Item>
    //       {({ active }) => (
    //         <button
    //           className={`${active && 'bg-blue-100'} w-full rounded-md p-2`}>
    //             <Link href='/Xrays/Xrays'> Xray Centers</Link>
    //         </button>
    //       )}
    //     </Menu.Item>
    //   </Menu.Items>
    //   </Transition>
    // </Menu>
    <>
    {/* <Dropdown.Toggle variant="success" id="dropdown-basic">
    Dropdown Button
</Dropdown.Toggle>

<Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
</Dropdown.Menu> */}
</>
  )
}
