import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {  UserAddIcon } from '@heroicons/react/outline'


export function FormWorkers() {

    const [open, setOpen] = useState(false)

    const addButtonRef = useRef(null)

    /* const {user, logout, loading} = useAuth()
    //const authContext = useContext(context)
  
    console.log(user)
  
    const handleLogout = async () => {
      try {
        await logout()
      } catch (error) {
        console.erorr(error)
      }
    }

    if(loading) return<h1>loading</h1>
    */

    return (

        <Transition.Root show={open} as={Fragment}>

            <Dialog as="div" className="relative z-10" initialFocus={addButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

                </Transition.Child>
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <UserAddIcon className="h-6 w-6 text-blue-700" aria-hidden="true" />
                                        </div>
                                        <div className=" text-center  xl:ml-4 sm:text-left  pr-8">
                                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                Add Worker
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <label>Full name</label>
                                                <input type="text"
                                                name="fullname"
                                                id="fullname"
                                                placeholder="write your full name"
                                                className="border rounded-md shadow appearance-none
                                                w-full py-2 px 3 text-gray-700 leading-tight
                                                focus:outline-none focus:shadow-outline"></input>
                                                <label>Date born</label>
                                                <input type="date"
                                                name="dateborn"
                                                id="dateborn"
                                                className="border rounded-md shadow appearance-none
                                                w-full py-2 px 3 text-gray-700 leading-tight
                                                focus:outline-none focus:shadow-outline"></input>
                                                <label>Age</label>
                                                <input type="int"
                                                name="age"
                                                id="age"
                                                placeholder="write your age"
                                                className="border rounded-md shadow appearance-none
                                                w-full py-2 px 3 text-gray-700 leading-tight
                                                focus:outline-none focus:shadow-outline"></input>
                                                <label>DirectionHome</label>
                                                <input type="text"
                                                name="directionhome"
                                                id="directionhome"
                                                placeholder="write your direction your home"
                                                className="border rounded-md shadow appearance-none
                                                w-full py-2 px 3 text-gray-700 leading-tight
                                                focus:outline-none focus:shadow-outline"></input>
                                                <label>Cell phone Number</label>
                                                <input type="int"
                                                name="cellphone"
                                                id="cellphone"
                                                placeholder="999 666 555"
                                                className="border rounded-md shadow appearance-none
                                                w-full py-2 px 3 text-gray-700 leading-tight
                                                focus:outline-none focus:shadow-outline"></input>
                                                <label>Date of admission</label>
                                                <input type="date"
                                                name="dateadmission"
                                                id="dateadmission"
                                                className="border rounded-md shadow appearance-none
                                                w-full py-2 px 3 text-gray-700 leading-tight
                                                focus:outline-none focus:shadow-outline"></input>
                                                <label>Position</label>
                                                <input type="text"
                                                name="position"
                                                id="position"
                                                placeholder="write your full name"
                                                className="border rounded-md shadow appearance-none
                                                w-full py-2 px 3 text-gray-700 leading-tight
                                                focus:outline-none focus:shadow-outline"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setOpen(false)}
                                        ref={addButtonRef}
                                    >
                                        Add
                                    </button>
                                    <button
                                        type="button"
                                        className=" w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500  sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setOpen(false)}
                                        
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>

    )
}
