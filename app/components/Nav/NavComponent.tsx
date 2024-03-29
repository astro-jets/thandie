"use client"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react";
import { getURL } from "next/dist/shared/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { IconContext } from "react-icons";
import { BsBell, BsDoorOpen, BsExclamationCircle, BsPersonCircle } from "react-icons/bs"
import { IoSpeedometerOutline } from "react-icons/io5";
import NotificationModal from "@/app/components/NotificationModal"
import { readNotifications } from "@/app/actions/action";
import { useRouter } from "next/navigation";
import SearchForm from "./SearchForm";

type notificationProps = {
    _id: string,
    title: string,
    description: string
}[]


const links = [
    {
        name: 'Home',
        url: '/'
    },
    {
        name: 'Services',
        url: '/services'
    },
    {
        name: 'Blogs',
        url: '/stories'
    },
    {
        name: 'About Us',
        url: '/about'
    }, {
        name: 'Contact Us',
        url: '/contacts'
    },
]

const initialModal = {
    status: false,
    message: '',
    title: ''
}
const NavbarComponent = ({ notifications }: { notifications: notificationProps }) => {
    const { data: session, status } = useSession()
    const [menuState, setMenuState] = useState(false)
    const [profileState, setProfileState] = useState(false)
    const [notificationState, setNotificationState] = useState(false)
    const url = getURL();
    const [modal, setModal] = useState(initialModal)
    const router = useRouter();

    const handleNotificationClick = async (notification: any) => {
        console.table(notification)
        const res = await readNotifications(notification._id)
        if (res) {
            setModal({
                status: true,
                message: notification.description as string,
                title: notification.title as string
            });
            router.refresh();
        }
    }

    return (
        <>
            <nav className="bg-primary-600 z-50 absolute w-full">
                <div className="mx-auto max-w-7xl">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button*/}
                            <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-primary-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false"
                                onClick={() => { setMenuState(!menuState) }}
                            >
                                <span className="absolute -inset-0.5"></span>
                                <span className="sr-only">Open main menu</span>

                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>

                                <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            {/* Header Logo */}
                            <div className="flex flex-shrink-0 items-center">
                                <h1 className="text-white text-2xl font-bold">Direct Insurance</h1>
                            </div>
                            {/* NavbarComponent */}
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    {
                                        links.map(link => (
                                            link.url === url ?
                                                <a href={link.url} className="bg-primary-500 text-white rounded-md px-3 py-2 text-sm font-medium">{link.name}</a >
                                                : <a href={link.url} className="text-gray-50 hover:bg-primary-500 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                                                    {link.name}
                                                </a>

                                        ))
                                    }
                                    <SearchForm />
                                </div>
                            </div>
                        </div>

                        {/* Profile */}
                        {status === "authenticated" ?
                            (<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                                {
                                    notifications?.length ?
                                        /* Notifications dropdown */
                                        <div className="relative mr-3">
                                            <div>
                                                <button type="button" className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true"
                                                    onClick={() => { setProfileState(false); setNotificationState(!notificationState) }}
                                                >
                                                    {/* <span className="absolute -inset-1.5"></span>
                                            <span className="sr-only">Open notifications</span> */}
                                                    <span className="flex items-center justify-center rounded-full overflow-hidden border-white border-[1px] p-1 bg-transparent">
                                                        <BsBell size={20} color={"#fff"} />
                                                    </span>
                                                </button>
                                            </div>
                                            {
                                                notificationState ?
                                                    <div className="space-y-3 flex flex-col items-center absolute -right-20 z-10 mt-2 w-[15rem] origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" >
                                                        {
                                                            notifications.map(n => (

                                                                <button key={n._id} role="menuitem" id="user-menu-item-0" className="px-4 py-2 text-sm border-t-[1px] border-primary-500 mb-2 text-gray-700 flex flex-col space-y-2 w-full "
                                                                    onClick={() => {
                                                                        handleNotificationClick(n)
                                                                    }}
                                                                >
                                                                    <div className="flex space-x-4 w-full">
                                                                        <BsExclamationCircle style={{ hover: { color: '#fff' } }} color={"#fcb93e"} size={20} />
                                                                        <p>{n.title}</p>
                                                                    </div>
                                                                    <p className="text-xs text-gray-300 w-full">{n.description}</p>
                                                                </button>
                                                            ))
                                                        }
                                                    </div> : null
                                            }
                                        </div>
                                        : null
                                }

                                {/* Profile dropdown */}
                                <div className="relative ml-3">
                                    <div>
                                        <button type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true"
                                            onClick={() => { setNotificationState(false); setProfileState(!profileState) }}
                                        >
                                            <span className="absolute -inset-1.5"></span>
                                            <span className="sr-only">Open user menu</span>
                                            <img className="h-8 w-8 rounded-full" src="/src/img/dummy/avatar.jpg" alt="" />
                                        </button>
                                    </div>
                                    {
                                        profileState ?
                                            <div className="space-y-3 flex flex-col items-center absolute -right-6  z-10 mt-2 w-[15rem] origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" >

                                                <div className="text-sm w-11/12 overflow-hidden bg-primary-600 text-white rounded-md px-4 py-2">
                                                    <div className="flex space-x-4 hover:text-white">
                                                        <IconContext.Provider value={{ color: "blue", className: "global-class-name hover:color-white " }}>
                                                            <div>
                                                                <BsPersonCircle color={"#fff"} size={20} />
                                                            </div>
                                                        </IconContext.Provider>
                                                        <p>{session.user?.name}</p>
                                                    </div>
                                                </div>

                                                <Link href="/dashboard/" className="px-4 py-2 text-sm text-gray-700 flex items-center justify-between space-x-3 hover:bg-primary-500 hover:text-white rounded-md w-11/12" role="menuitem" id="user-menu-item-0">
                                                    <div className="flex space-x-4 hover:text-white">
                                                        <IoSpeedometerOutline style={{ hover: { color: '#fff' } }} color={"#fcb93e"} size={20} />
                                                        <p>Dashboard</p>
                                                    </div>
                                                    <span className="bg-primary-400 text-xs font-bold rounded-full w-5 h-5 p-3 text-white text-center flex items-center justify-center">12</span>
                                                </Link>

                                                <button onClick={() => signOut({ callbackUrl: "/" })} className="px-4 py-2 text-sm text-gray-700 flex items-center justify-between space-x-3 hover:bg-primary-500 hover:text-white rounded-md w-11/12" role="menuitem" id="user-menu-item-0">
                                                    <div className="flex space-x-4 hover:text-white">
                                                        <BsDoorOpen color={"#fcb93e"} size={20} />
                                                        <p>Sign Out</p>
                                                    </div>
                                                </button>

                                            </div> : null
                                    }
                                </div>
                            </div>) : null
                        }
                    </div>
                </div >

                {/* {/* Mobile menu, show/hide based on menu state. */}
                {
                    menuState === true ?
                        <div className="sm:hidden" id="mobile-menu">
                            <div className="space-y-1 px-2 pb-3 pt-2">
                                {/* Current: "bg-gray-900 text-white", Default: "text-gray-50 hover:bg-primary-500 hover:text-white" */}
                                <a href="#" className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Dashboard</a>
                                <a href="#" className="text-gray-50 hover:bg-primary-500 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Team</a>
                                <a href="#" className="text-gray-50 hover:bg-primary-500 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Projects</a>
                                <a href="#" className="text-gray-50 hover:bg-primary-500 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Calendar</a>
                            </div>
                        </div> : null
                }
            </nav >
            <NotificationModal
                message={modal.message}
                title={modal.title}
                isOpen={modal.status}
                onClose={() => {
                    setModal({
                        ...initialModal,
                        status: false
                    });
                }
                }
            />
        </>
    );
}

export default NavbarComponent;