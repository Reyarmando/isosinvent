import { useState, useEffect } from "react"
import { db } from "../../firebase"
import { Modal, Button, Table, Row, Col, Container } from 'react-bootstrap'
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc, orderBy, query } from "firebase/firestore"
import { TrashIcon, PencilIcon } from '@heroicons/react/outline'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ProviderAdd from "./MachinaryAdd"
import EditProvider from "./EditMachinary"
import { motion, AnimatePresence } from 'framer-motion'

const Machinaries = () => {

    const variants = {
        hidden: {
            opacity: 0
        },
        visible: ( delay ) => ({
            opacity: 1,
            transition: {
                delay,
                duration: 1
            }
        })
    }

    const MySwal = withReactContent(Swal)

    const [machinaries, setMachinaries] = useState([])
    const [currentId, setCurrentId] = useState("");

    const machinariesCollection = collection(db, "machinaries")

    const [show, steShow] = useState(false)

    const handleShow = () => steShow(true)
    const handleClose = () => steShow(false)

    const [show2, steShow2] = useState(false)

    const handleShow2 = () => steShow2(true)
    const handleClose2 = () => steShow2(false)

    const addMachinary = async (objetProvider) => {
        await addDoc(machinariesCollection, (objetProvider))

    }

    const updateMachinary = async (objetProvider) => {
        const docm = doc(db, "machinaries", currentId)
        await updateDoc(docm, objetProvider)
        Swal.fire(
            'Updated!',
            'Your file has been updated.',
            'success'
        )
    }

    const getEpp = async () => {
        const q = query(machinariesCollection, orderBy("timestamp", "desc"))
        onSnapshot(q, (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), id: doc.id })
            });
            setMachinaries(docs)
        })
    }

    const onDelete = async (id) => {
        const machDoc = doc(db, "machinaries", id)
        deleteDoc(machDoc)
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
                onDelete(id)
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }

    useEffect(() => {
        getEpp()
        handleClose2()
    }, [])

    return (
        <>

            <div className="flex justify-center m-auto">

                <Modal show={show}>
                    <Modal.Header >
                        <Modal.Title>
                            Add Machinary
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ProviderAdd {...{ addMachinary, handleClose, currentId }}></ProviderAdd>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose} >
                            close
                        </Button>
                    </Modal.Footer>

                </Modal>
                <Container>
                    <Row>
                        <Col><motion.h1 initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                duration: 2,
                                ease: 'easeInOut',
                                delay: '0.2',
                                type: 'spring'
                            }}
                        >table of Machinaries</motion.h1></Col>
                        <Col><Button onClick={handleShow} className="btn btn-succsess"> addMachinary </Button></Col>
                    </Row>
                    <Row>
                        <Col>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Inventory Code</th>
                                        <th>Brand</th>
                                        <th>Model</th>
                                        <th>Stock</th>
                                        <th>actions</th>
                                    </tr>
                                </thead>
                                <motion.tbody initial='hidden'
                                    animate='visible'
                                    exit='hidden'
                                    variants={variants}>
                                    <AnimatePresence>
                                        {machinaries.map((mach, index) => (
                                            <motion.tr
                                                custom={ (index) * 0.3 }
                                                initial='hidden'
                                                animate='visible'
                                                index={index}
                                                exit='hidden'
                                                variants={variants}
                                                layoutId={mach.id}
                                                key={mach.id}>
                                                <td>-</td>
                                                <td>{mach.name}</td>
                                                <td>{mach.codeinv}</td>
                                                <td>{mach.brand}</td>
                                                <td>{mach.model}</td>
                                                <td>{mach.stock}</td>
                                                <td>
                                                    <button onClick={handleShow2}><p onClick={() => setCurrentId(mach.id)}><PencilIcon className="h-4 w-4 text-yellow-500" aria-hidden="true" /></p></button>
                                                    <button onClick={() => confirmDelete(mach.id)} className=""><TrashIcon className="h-4 w-4 text-red-700" aria-hidden="true" /></button>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </motion.tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
                <Modal show={show2}>
                    <Modal.Header >
                        <Modal.Title>
                            Edit Machinary
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditProvider {...{ currentId, updateMachinary, handleClose2 }}></EditProvider>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose2} >
                            close
                        </Button>
                    </Modal.Footer>

                </Modal>
            </div>
        </>
    )
}

export default Machinaries