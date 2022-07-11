import React from 'react'
import "./NavBar.css"
import { useState } from 'react'
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import {  UserGroupIcon, CogIcon, TruckIcon, ServerIcon, ShieldCheckIcon, UsersIcon } from '@heroicons/react/outline'
import { useAuth } from "../../context/authContext"


const NavBar = () => {

    const { logout, loading } = useAuth()
    //const authContext = useContext(context)


    const handleLogout = async () => {
        try {
            await logout()
        } catch (error) {
            console.erorr(error)
        }
    }

    const [active, setActive] = useState("nav__menu");
    const [toggleIcon, setTogglerIcon] = useState("nav__toggler");
    const navToggle = () => {
        active === 'nav__menu' ? setActive('nav__menu nav__active') : setActive('nav__menu');

        // toggler icon animation

        toggleIcon === 'nav__toggler' ? setTogglerIcon("nav__toggler toggle") : setTogglerIcon("nav__toggler");
    }

    if (loading) return <h1>loading</h1>

    return (
        <nav className='nav'>
            <motion.h4
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                    duration: 2,
                    ease: 'easeInOut',

                    type: 'spring'
                }}
                className='nav__brand' ><NavLink to='/'>ISOS Group</NavLink></motion.h4>
            <ul className={active}>
                <li className='nav__item'><NavLink to='machinaries' className='nav__link'><UsersIcon className="m-auto h-20 w-20" aria-hidden="true"></UsersIcon>
                </NavLink>Workers
                </li>
                <li className='nav__item'><NavLink to='tools' className='nav__link'><CogIcon className="m-auto h-20 w-20" aria-hidden="true"></CogIcon>
                </NavLink>Tools
                </li>
                <li className='nav__item'><NavLink to='providers' className='nav__link'><UserGroupIcon className="m-auto h-20 w-20" aria-hidden="true"></UserGroupIcon>
                </NavLink>Providers
                </li>
                <li className='nav__item'><NavLink to='epps' className='nav__link'><ShieldCheckIcon className="m-auto h-20 w-20" aria-hidden="true"></ShieldCheckIcon>
                </NavLink>EPPS
                </li>
                <li className='nav__item'><NavLink to='machinaries' className='nav__link'><TruckIcon className="m-auto h-20 w-20" aria-hidden="true"></TruckIcon>
                </NavLink>Machinaries
                </li>
                <li className='nav__item'><NavLink to='orbuys' className='nav__link'><ServerIcon className="m-auto h-20 w-20" aria-hidden="true"></ServerIcon>
                </NavLink>OrdersBuys
                </li>
                <li className='nav__item bg-slate-50 hover:bg-slate-200 text-black
                shadow-md rounded-md border-2 border-gray-300 py-2 px-4
                w-full flex items-center justify-center'><button onClick={handleLogout}>Logout</button>
                </li>
            </ul>
            <div onClick={navToggle} className={toggleIcon}>
                <div className='line1'></div>
                <div className='line2'></div>
                <div className='line3'></div>
            </div>
        </nav>
    )
}

export default NavBar