
import { useState, useEffect } from "react"
import { db } from "../../firebase"
import { Modal, Button, Table, Row, Col, Container } from 'react-bootstrap'
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc, orderBy, query } from "firebase/firestore"
import { TrashIcon, PencilIcon } from '@heroicons/react/outline'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ProviderAdd from "./ProviderAdd"
import EditProvider from "./EditProvider"
import { motion, AnimatePresence } from 'framer-motion'

const Providers = () => {

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

    const [providers, setProviders] = useState([])
    const [currentId, setCurrentId] = useState("");

    const providersCollection = collection(db, "providers")

    const [show, steShow] = useState(false)

    const handleShow = () => steShow(true)
    const handleClose = () => steShow(false)

    const [show2, steShow2] = useState(false)

    const handleShow2 = () => steShow2(true)
    const handleClose2 = () => steShow2(false)

    const addProvider = async (objetProvider) => {
        await addDoc(providersCollection, (objetProvider))

    }

    const updateProvider = async (objetProvider) => {
        const doct = doc(db, "providers", currentId)
        await updateDoc(doct, objetProvider)
        Swal.fire(
            'Updated!',
            'Your file has been updated.',
            'success'
        )
    }

    const getProviders = async () => {
        const q = query(providersCollection, orderBy("timestamp", "desc"))
        onSnapshot(q, (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), id: doc.id })
            });
            setProviders(docs)
        })
    }

    const onDelete = async (id) => {
        const providerDoc = doc(db, "providers", id)
        deleteDoc(providerDoc)
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
        getProviders()
        handleClose2()
    }, [])

    return (
        <>

            <div className="flex justify-center m-auto">

                <Modal show={show}>
                    <Modal.Header >
                        <Modal.Title>
                            Add Provider
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ProviderAdd {...{ addProvider, handleClose, currentId }}></ProviderAdd>
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
                        >table of Providers</motion.h1></Col>
                        <Col><Button onClick={handleShow} className="btn btn-succsess"> addTools</Button></Col>
                        <Col><a href="/providers">providers</a></Col>
                    </Row>
                    <Row>
                        <Col>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Bussines Name</th>
                                        <th>RUC</th>
                                        <th>Phone</th>
                                        <th>Direction</th>
                                        <th>Rubro</th>
                                        <th>actions</th>
                                    </tr>
                                </thead>
                                <motion.tbody initial='hidden'
                                    animate='visible'
                                    exit='hidden'
                                    variants={variants}>
                                    <AnimatePresence>
                                        {providers.map((provider, index) => (
                                            <motion.tr
                                                custom={ (index) * 0.3 }
                                                initial='hidden'
                                                animate='visible'
                                                index={index}
                                                exit='hidden'
                                                variants={variants}
                                                layoutId={provider.id}
                                                key={provider.id}>
                                                <td>-</td>
                                                <td>{provider.label}</td>
                                                <td>{provider.ruc}</td>
                                                <td>{provider.phone}</td>
                                                <td>{provider.direction}</td>
                                                <td>{provider.rubro}</td>
                                                <td>
                                                    <button onClick={handleShow2}><p onClick={() => setCurrentId(provider.id)}><PencilIcon className="h-4 w-4 text-yellow-500" aria-hidden="true" /></p></button>
                                                    <button onClick={() => confirmDelete(provider.id)} className=""><TrashIcon className="h-4 w-4 text-red-700" aria-hidden="true" /></button>
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
                            Edit Provider
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditProvider {...{ currentId, updateProvider, handleClose2 }}></EditProvider>
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

export default Providers