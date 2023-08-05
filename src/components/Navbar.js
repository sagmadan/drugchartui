import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

const loggedOutNavigation = [
    { name: 'Login', href: '/login' },
    { name: 'Signup', href: '/signup' },
]

const loggedInNavigation = [
    { name: 'Medicine', href: '/medicines' },
    { name: 'Schedule', href: '/schedule' },
    { name: 'Chart', href: '/chart' },
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Navbar = () => {

    const { user } = useAuthContext()
    const { logout } = useLogout()
    const navigate = useNavigate()

    const navigation = user ? loggedInNavigation : loggedOutNavigation

    const handleLogOutClick = () => {
        logout()
    }

    return (
        <Disclosure as="nav" className="bg-gray-900">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <h1 className='text-lg text-white'>dc</h1>
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                className={classNames(
                                                    'text-gray-100 hover:bg-gray-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )}>{item.name}</Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {user && <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button
                                    type="button"
                                    onClick={handleLogOutClick}
                                    className="relative rounded bg-gray-800 px-2 py-1 text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    Logout
                                </button>
                            </div>}
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    onClick={() => {
                                        navigate(item.href)
                                    }}
                                    key={item.name}
                                    className={classNames(
                                        'text-gray-100 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}

export default Navbar
