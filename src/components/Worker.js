import ModalEdit from "../modals/ModalEdit"
import { useModal } from "../hooks/useModal"
import { useState, useEffect } from 'react'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
import { TrashIcon, PencilIcon } from '@heroicons/react/outline'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Worker = ({tworker}, props) => {

    const [isOpenModal2, openModal2, closeModal2] = useModal(false);
    const [workers, setWorkers] = useState([])

    const workersCollection = collection(db, "workers")

    const MySwal = withReactContent(Swal)

    const getWorkers = async () => {
        const data = await getDocs(workersCollection)
        //console.log(data.docs)
        setWorkers(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
        //console.log(workers)
    }

    const getClose = async() => {
        const data = await getDocs(workersCollection)
        const getData = data.docs.length
        console.log(getData)

    
}

    const deleteWorker = async (id) => {
        const workerDoc = doc(db, "workers", id)
        await deleteDoc(workerDoc)
        getWorkers()
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
        getWorkers()
        getClose()
        //slint-disable-next-line
    }, [])

    return (
        <>
            <td className='border border-slate-700'>{tworker.fullname}</td>
            <td className='border border-slate-700'>{tworker.dni}</td>
            <td className='border border-slate-700'>{tworker.cellphone}</td>
            <td className='border border-slate-700'>{tworker.position}</td>
            <td className='columns-2'>
                {/*<Link to={`/edit/${worker.id}`} className="rounded-2xl bg-yellow-500 hover:bg-yellow-600" onClick={openModal2}><PencilIcon className="h-4 w-4 text-yellow-500" aria-hidden="true" /></Link>*/}
                
                <button onClick={openModal2}>edit</button>
                <ModalEdit isOpen={isOpenModal2} closeModal={closeModal2} theWorker={tworker}></ModalEdit>
            </td>

           
        </>
    )
}

export default Worker