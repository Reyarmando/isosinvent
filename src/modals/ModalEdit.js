import { useEffect, useState } from "react"
//import { useParams } from "react-router-dom"
import { Form, Button } from 'react-bootstrap'
import { getDoc, updateDoc, doc } from "firebase/firestore"
import { db } from "../firebase"

const ModalEdit = ({ children, isOpen, closeModal, theWorker }) => {

    const id = theWorker.id;


    const [fullname, setFullname] = useState(theWorker.fullname)
    const [dni, setDni] = useState(theWorker.dni)
    const [dateborn, setDateborn] = useState(theWorker.dateborn)
    const [age, setAge] = useState(theWorker.age)
    const [directionhome, setDirectionHome] = useState(theWorker.directionhome)
    const [cellphone, setCellphone] = useState(theWorker.cellphone)
    const [dateadmission, setDateadmission] = useState(theWorker.dateadmission)
    const [position, setPosition] = useState(theWorker.position)



    const reload = () => {
        window.location.reload(true);
    }

    const update = async (e) => {
        e.preventDefault()
        const worker = doc(db, "workers", id)
        const data = { fullname: fullname, dni: dni, age: age, cellphone: cellphone, directionhome: directionhome, dateborn:dateborn, dateadmission: dateadmission, position:position }
        await updateDoc(worker, data)
        reload()
    }

    const getWorkerById = async (id) => {
        theWorker = await getDoc(doc(db, "workers", id))
        if (theWorker.exists()) {
            //console.log(worker.data())
            setFullname(theWorker.data().fullname)
            setDni(theWorker.data().dni)
        } else {
            console.log('no exist worker')
        }
    }

    useEffect(() => {
        getWorkerById(id)
        // eslint-disable-next-line
    }, [])

    return (
        <div className={`modal ${isOpen && "is-open"}`}>

            <div className="fixed inset-0 bg-gray-700 bg-opacity-75">


                <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">


                    <div className="inline-block align-bottom bg-white rounded-2xl overflow-hidden shadow-xl transform transition-all
                            sm:my-8 sm-align-middle sm:max-w-lg w-full">
                        <button onClick={closeModal}>close</button>
                        {children}
                        <h1>EDIT WORKER</h1>
                        <Form onSubmit={update}>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder='Fullname'
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                    required />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    type="int"
                                    placeholder='age'
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    required />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    type="int"
                                    placeholder='dni'
                                    value={dni}
                                    onChange={(e) => setDni(e.target.value)}
                                    required />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder='date of born'
                                    value={dateborn}
                                    onChange={(e) => setDateborn(e.target.value)}
                                    required />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    type="number"
                                    placeholder='cellphone'
                                    value={cellphone}
                                    onChange={(e) => setCellphone(e.target.value)}
                                    required />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder='direction your home'
                                    value={directionhome}
                                    onChange={(e) => setDirectionHome(e.target.value)}
                                    required />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder='dateadmision'
                                    value={dateadmission}
                                    onChange={(e) => setDateadmission(e.target.value)}
                                    required />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder='position'
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
                                    required />
                            </Form.Group>
                            <Button type='submit'>update</Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalEdit