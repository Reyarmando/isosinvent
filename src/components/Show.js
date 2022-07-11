import { useState, useEffect } from 'react'

import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
import { TrashIcon, PencilIcon } from '@heroicons/react/outline'

//import { Swal } from 'sweetalert2-react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { ModalAdd } from "../modals/ModalAdd";
import Worker from './Worker'



import { Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { NavBar } from './NavBar'


const Show = () => {



    const [workers, setWorkers] = useState([])

    const workersCollection = collection(db, "workers")

    const MySwal = withReactContent(Swal)

    const getWorkers = async () => {
        const data = await getDocs(workersCollection)
        //console.log(data.docs)
        setWorkers(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )

    }




    const deleteWorker = async (id) => {
        const workerDoc = doc(db, "workers", id)
        await deleteDoc(workerDoc)
        getWorkers()
    }
    const prueba = () => {
        console.log('holaaa pruebaaa')
    }


    const confirmDelete = (id) => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteWorker(id)
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }

    useEffect(() => {
        //getClose()
        getWorkers()

        //slint-disable-next-line
    }, [])

    const [show, steShow] = useState(false)

    const handleShow = () => steShow(true)
    const handleClose = () => steShow(false)

    return (
        <>

            
            <div className='flex justify-center m-auto'>

                <div >
                    <Button onClick={handleShow} className="btn btn-succsess"> addWorker</Button>
                </div>
                <div className='flex justify-center m-auto'>



                    <div className='flex justify-center m-auto'>

                        <table className="border-separate border border-slate-500 ...">
                            <thead>
                                <tr>
                                    <th className="border border-slate-600 ...">FullName</th>
                                    <th className="border border-slate-600 ...">DNI</th>
                                    <th className="border border-slate-600 ...">CellPhone</th>
                                    <th className="border border-slate-600 ...">Position</th>
                                    <th className='border border-green-600'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {workers.map(worker => (

                                    <tr key={worker.id}>
                                        <Worker tworker={worker} prueba={prueba} />
                                        <td>

                                            <button onClick={() => { confirmDelete(worker.id) }} className=""><TrashIcon className="h-4 w-4 text-red-700" aria-hidden="true" /></button>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Modal show={show}>
                            <Modal.Header closeButton onClick={handleClose}>
                                <Modal.Title>
                                    Add Worker
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ModalAdd />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    close
                                </Button>
                            </Modal.Footer>

                        </Modal>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Show