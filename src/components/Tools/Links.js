import LinkForm from "./LinkForm"
import { useState, useEffect } from "react"
import { db } from "../../firebase"
import { Modal, Button, Table, Row, Col, Container } from 'react-bootstrap'
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { TrashIcon, PencilIcon } from '@heroicons/react/outline'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import EditTool from "./EditTool"

const Links = () => {

    const MySwal = withReactContent(Swal)

    const [tools, setTools] = useState([])
    const [currentId, setCurrentId] = useState("");

    const toolsCollection = collection(db, "tools")

    const [show, steShow] = useState(false)

    const handleShow = () => steShow(true)
    const handleClose = () => steShow(false)

    const [show2, steShow2] = useState(false)

    const handleShow2 = () => steShow2(true)
    const handleClose2 = () => steShow2(false)

    const addTool = async (objetTool) => {
        await addDoc(toolsCollection, (objetTool))
        Swal.fire(
            'Created!',
            'Your file has been created.',
            'success'
        )

    }

    const updateTool = async (objetTool) => {
        const doct = doc(db, "tools", currentId)
        await updateDoc(doct, objetTool)
        Swal.fire(
            'Updated!',
            'Your file has been updated.',
            'success'
        )
    }

    const getTools = async () => {
        onSnapshot(toolsCollection, (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), id: doc.id })
            });
            setTools(docs)
        })
    }

    const onDelete = async (id) => {
        const toolDoc = doc(db, "tools", id)
        deleteDoc(toolDoc)
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
        getTools()
        handleClose2()
    }, [])

    return (
        <>

            <div className="flex justify-center m-auto">

                <Modal show={show}>
                    <Modal.Header >
                        <Modal.Title>
                            Add Tool
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <LinkForm {...{ addTool, currentId, handleClose }} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose} >
                            close
                        </Button>
                    </Modal.Footer>

                </Modal>
                <Container>
                    <Row>
                        <Col><h1>table of Tools</h1></Col>
                        <Col><Button onClick={handleShow} className="btn btn-succsess"> addTools</Button></Col>
                        <Col><a href="/tools">providers</a></Col>
                    </Row>
                    <Row>
                    <Col>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name tool</th>
                                <th>model</th>
                                <th>people charge</th>
                                <th>area charge</th>
                                <th>actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tools.map(tool => (
                                <tr key={tool.id}>
                                    <td>-</td>
                                    <td>{tool.name}</td>
                                    <td>{tool.model}</td>
                                    <td>{tool.peopleres}</td>
                                    <td>{tool.areares}</td>
                                    <td>
                                        <button onClick={handleShow2}><p onClick={() => setCurrentId(tool.id)}><PencilIcon className="h-4 w-4 text-yellow-500" aria-hidden="true" /></p></button>
                                        <button onClick={() => confirmDelete(tool.id)} className=""><TrashIcon className="h-4 w-4 text-red-700" aria-hidden="true" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    </Col>
                    </Row>
                </Container>
                <Modal show={show2}>
                    <Modal.Header >
                        <Modal.Title>
                            Edit Tool
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <EditTool {...{ addTool, currentId, updateTool, handleClose2 }}></EditTool>
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

export default Links