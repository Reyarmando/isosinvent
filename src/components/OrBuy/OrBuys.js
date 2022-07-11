import { useState, useEffect } from "react"
import { db } from "../../firebase"
import { Modal, Button, Table, Row, Col, Container } from 'react-bootstrap'
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc, orderBy, query, limit} from "firebase/firestore"
import { TrashIcon, PencilIcon, EyeIcon } from '@heroicons/react/outline'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ProviderAdd from "./OrbuyAdd"
import { motion, AnimatePresence } from 'framer-motion'
import OrbuyDetals from "./OrbuyDetals"
import EditOrbuy from "./EditOrbuy"

const OrBuys = () => {

    const variants = {
        hidden: {
            opacity: 0
        },
        visible: (delay) => ({
            opacity: 1,
            transition: {
                delay,
                duration: 1
            }
        })
    }


    const MySwal = withReactContent(Swal)

    const [orbuys, setOrbuys] = useState([])
    const [currentId, setCurrentId] = useState("");

    const orbuysCollection = collection(db, "orbuys")

    const [show, steShow] = useState(false)

    const handleShow = () => steShow(true)
    const handleClose = () => steShow(false)

    const [show2, steShow2] = useState(false)

    const handleShow2 = () => steShow2(true)
    const handleClose2 = () => steShow2(false)

    const [show3, steShow3] = useState(false)

    const handleShow3 = () => steShow3(true)
    const handleClose3 = () => steShow3(false)

    const addOrbuy = async (objetProvider) => {
        await addDoc(orbuysCollection, (objetProvider))

    }

    const updateOrbuy = async (objetProvider) => {
        const docm = doc(db, "orbuys", currentId)
        await updateDoc(docm, objetProvider)
        Swal.fire(
            'Updated!',
            'Your file has been updated.',
            'success'
        )
    }

    const getOrbuy = async () => {
        const q = query(orbuysCollection, orderBy("timestamp", "desc"), limit(10))
        onSnapshot(q, (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), id: doc.id })
            });
            setOrbuys(docs)
        })
    }

    const onDelete = async (id) => {
        const machDoc = doc(db, "orbuys", id)
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
        getOrbuy()
        handleClose2()
    }, [])

    return (
        <>

            <div className="flex justify-center m-auto">

                <Modal show={show}>
                    <Modal.Header >
                        <Modal.Title>
                            Add Order of BUY
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ProviderAdd {...{ addOrbuy, handleClose, currentId }}></ProviderAdd>
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
                        >table of Order of Buy</motion.h1></Col>
                        <Col><Button onClick={handleShow} className="btn btn-succsess"> add Order of buy </Button></Col>
                    </Row>
                    <Row>
                        <Col>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Code id</th>
                                        <th>Description</th>
                                        <th>Image</th>
                                        <th>Estado</th>
                                        <th>Provider</th>
                                        <th>actions</th>
                                    </tr>
                                </thead>
                                <motion.tbody initial='hidden'
                                    animate='visible'
                                    exit='hidden'
                                    variants={variants}>
                                    <AnimatePresence>
                                        {orbuys.map((orbuy, index, provider) => (
                                            <motion.tr
                                                custom={(index) * 0.3}
                                                initial='hidden'
                                                animate='visible'
                                                index={index}
                                                exit='hidden'
                                                variants={variants}
                                                layoutId={orbuy.id}
                                                key={orbuy.id}>
                                                <td>-</td>
                                                <td>{orbuy.code}</td>
                                                <td>{orbuy.descript}</td>
                                                <td><a href={orbuy.img}> ver img </a></td>
                                                <td>{orbuy.state}</td>
                                                <td>{orbuy.provider}</td>
                                                <td>
                                                    <button onClick={handleShow3}><p className="px-2" onClick={() => setCurrentId(orbuy.id)}><PencilIcon className="h-6 w-6 text-yellow-500" aria-hidden="true" /></p></button>
                                                    <button onClick={handleShow2}><p className="px-2" onClick={() => setCurrentId(orbuy.id)}><EyeIcon className="h-6 w-6 text-yellow-500" aria-hidden="true" /></p></button>
                                                    <button onClick={() => confirmDelete(orbuy.id)} className=""><p><TrashIcon className="h-6 w-6 text-red-700" aria-hidden="true" /></p></button>
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
                            Detals Order of Buy
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <OrbuyDetals {...{ currentId, updateOrbuy, handleClose2 }}></OrbuyDetals>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose2} >
                            close
                        </Button>
                    </Modal.Footer>

                </Modal>
                <Modal show={show3}>
                    <Modal.Header >
                        <Modal.Title>
                            Edit Order of Buy
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditOrbuy {...{ currentId, updateOrbuy, handleClose3 }}></EditOrbuy>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose3} >
                            close
                        </Button>
                    </Modal.Footer>

                </Modal>
            </div>
        </>
    )
}

export default OrBuys