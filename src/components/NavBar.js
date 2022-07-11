import { useAuth } from "../context/authContext"
import logoisos from '../imgs/logo-isos.png';
//import icouser from '../imgs/ico-user.png';
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import {  UserGroupIcon, CogIcon, TruckIcon, ClipboardListIcon, ServerIcon } from '@heroicons/react/outline'
import { Link } from "react-router-dom";

export function NavBar() {

    const { user, logout, loading } = useAuth()
    //const authContext = useContext(context)


    const handleLogout = async () => {
        try {
            await logout()
        } catch (error) {
            console.erorr(error)
        }
    }

    if (loading) return <h1>loading</h1>

    return (

        <div>

            <Nav fill variant="tabs" defaultActiveKey="/home" className="fixed flex justify-center w-full ">
                <Nav.Item>
                    <Nav.Link href="/home">Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" to='/'>
                        <UserGroupIcon className="m-auto h-20 w-20" aria-hidden="true"></UserGroupIcon>
                        workers
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2" >
                        <CogIcon className="m-auto h-20 w-20" aria-hidden="true"></CogIcon>
                        Tools
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-3">
                        <TruckIcon className="m-auto h-20 w-20" aria-hidden="true"></TruckIcon>
                        Machinery
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-4">
                        <ClipboardListIcon className="m-auto h-20 w-20" aria-hidden="true"></ClipboardListIcon>
                        Records
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-5">
                        <ServerIcon className="m-auto h-20 w-20" aria-hidden="true"></ServerIcon>
                        OrdersBuys
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={handleLogout}>
                    Logout
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        {/*
            <nav className=" p-2 mt-0 fixed w-full top-0 ">
                <div className="mx-auto flex justify-center items-center ">
                    <div className="flex pt-2 py-2 justify-center items-center pl-3 bg-white rounded-2xl">
                        <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
                            <li className="mr-3">
                                <div className="felx items-center justify-center shadow-md rounded-3xl hover:bg-slate-700">
                                    <p className="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline w-full text-center" href="#">
                                        <svg className="h-32 w-32 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>Workers</p>
                                </div>
                            </li>
                            <li className="mr-3">
                                <div className="felx items-center justify-center shadow-md rounded-3xl hover:bg-slate-700">
                                    <p className="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline w-full text-center" href="#">
                                        <svg className="h-32 w-32 text-blue-700" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M3 21h4l13 -13a1.5 1.5 0 0 0 -4 -4l-13 13v4" />  <line x1="14.5" y1="5.5" x2="18.5" y2="9.5" />  <polyline points="12 8 7 3 3 7 8 12" />  <line x1="7" y1="8" x2="5.5" y2="9.5" />  <polyline points="16 12 21 17 17 21 12 16" />  <line x1="16" y1="17" x2="14.5" y2="18.5" /></svg>
                                        tools</p>
                                </div>
                            </li>
                            <li className="mr-3">
                                <div className="felx items-center justify-center shadow-md rounded-3xl hover:bg-slate-700">
                                    <p className="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline w-full text-center" href="#">
                                        <svg className="h-32 w-32 text-blue-700" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="7" cy="15" r="4" />  <line x1="7" y1="15" x2="7" y2="15.01" />  <circle cx="19" cy="17" r="2" />  <path d="M10.5 17h6.5" />  <path d="M20 15.2v-4.2a1 1 0 0 0 -1 -1h-6l-2 -5h-6v6.5" />  <path d="M18 5h-1a1 1 0 0 0 -1 1v4" /></svg>
                                        Machinery</p>
                                </div>
                            </li>
                            <li className="mr-3">
                                <div className="felx items-center justify-center shadow-md rounded-3xl hover:bg-slate-700">
                                    <p className="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline w-full text-center" href="#">
                                        <svg className="h-32 w-32 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                        </svg>Records</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <button onClick={handleLogout}
                        className="border border-slate-200 py-2 px-4 rounded-md text-center font-bold bg-slate-100 hover:bg-slate-200 absolute top-8 right-8 w-auto">
                        Logout
                    </button>
                </div>
            </nav>


            <div className="flex md:flex-row-reverse flex-wrap">

                <div className="w-full md:w-4/5 bg-gray-100">
                    <div className="container bg-gray-100 pt-16 px-6">

                    </div>
                </div>

                <div className="w-full md:w-1/5 bg-gray-500 md:bg-gray-700 px-2 text-center fixed bottom-0 md:pt-8 md:top-0 md:left-0 h-16 md:h-screen md:border-r-4 md:border-gray-600">
                    <div className="flex w-full justify-start pl-20">
                        <img src={logoisos} alt="logo-isos" className="w-auto h-40" />
                    </div>
                    <br></br>
                    <div className="border border-white rounded-2xl">
                        <div className="body-font overflow-visible grid grid-cols-2 ">
                            <div className="flex justify-center">
                                <img src={user.photoURL || icouser} alt="" className="w-20 h-20 rounded-full" />

                            </div>




                        </div>



                    </div>
                    <br></br>
                    <div className="md:relative bg-gray-700 mx-auto lg:float-right lg:px-6">
                        <ul className="list-reset flex flex-row md:flex-col text-center md:text-left">
                            <li className="mr-3 flex-1">
                                <p href="#" className="block py-1 md:py-3 pl-1 align-middle text-gray-800 no-underline hover:text-pink-500 border-b-2 border-gray-800 md:border-gray-900 hover:border-pink-500">
                                    <i className="fas fa-link pr-0 md:pr-3"></i><span className="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Link</span>
                                </p>
                            </li>
                            <li className="mr-3 flex-1">
                                <p href="#" className="block py-1 md:py-3 pl-1 align-middle text-gray-800 no-underline hover:text-pink-500 border-b-2 border-gray-800 md:border-gray-900 hover:border-pink-500">
                                    <i className="fas fa-link pr-0 md:pr-3"></i><span className="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Link</span>
                                </p>
                            </li>
                            <li className="mr-3 flex-1">
                                <p href="#" className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-pink-600">
                                    <i className="fas fa-link pr-0 md:pr-3 text-pink-500"></i><span className="pb-1 md:pb-0 text-xs md:text-base text-white md:font-bold block md:inline-block">Active Link</span>
                                </p>
                            </li>
                            <li className="mr-3 flex-1">
                                <p href="#" className="block py-1 md:py-3 pl-1 align-middle text-gray-800 no-underline hover:text-pink-500 border-b-2 border-gray-800 md:border-gray-900 hover:border-pink-500">
                                    <i className="fas fa-link pr-0 md:pr-3"></i><span className="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Link</span>
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>*/}
        </div>

    )
}

