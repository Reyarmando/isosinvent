import '../css/Modal.css'
import { Form } from 'react-bootstrap'
import { db } from '../firebase'
import { collection, addDoc, getDocs } from 'firebase/firestore'

import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'


export const ModalAdd = () => {

    const [fullname, setFullname] = useState('')
    const [dni, setDni] = useState()
    const [dateborn, setDateborn] = useState()
    const [age, setAge] = useState()
    const [directionhome, setDirectionHome] = useState()
    const [cellphone, setCellphone] = useState()
    const [dateadmission, setDateadmission] = useState()
    const [position, setPosition] = useState()


    const workersCollection = collection(db, "workers")

    const reload = () => {
        window.location.reload(true);
    }

    const [workers, setWorkers] = useState([])
    const getWorkers = async () => {
        const data = await getDocs(workersCollection)
        //console.log(data.docs)
        setWorkers(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
        
    }

    const onInputChancge = async() => {
        
        const data = await getDocs(workersCollection)
        const getData = data.docs.length
        
        const more = 10
        if(getData > more ){
            getWorkers()
        }
        console.log(getData)
        
        
    }

    useEffect(() => {
        onInputChancge()
        getWorkers()
        //slint-disable-next-line
    }, [])


    const save = async (e) => {
        e.preventDefault()
        await addDoc(workersCollection, { fullname: fullname, dni: dni, age: age, cellphone: cellphone, directionhome: directionhome, dateborn:dateborn, dateadmission: dateadmission, position:position })
        //onInputChancge()
        reload()
    }



    return (
        <>


            <Form onSubmit={save}>
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
                        type="date"
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
                        type="date"
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
                <Button type='submit'>addWorker</Button>
            </Form>
            {/*<div className={`modal ${isOpen && "is-open"}`}>
            <div className="fixed inset-0 bg-gray-700 bg-opacity-75">
                <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                    < className="inline-block align-bottom bg-white rounded-2xl overflow-hidden shadow-xl transform transition-all
                        sm:my-8 sm-align-middle sm:max-w-lg w-full">
                        <button onClick={closeModal}>close</button>
                        {children}
                        {/*<form onSubmit={save} className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
                            <label className='font-blod'>Fullname</label>
                            <input
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                                type="text"
                                className='shadow-2xl'
                            />
                            <div >
                                <label className='font-blod'>DNI</label>
                                <input
                                    value={dni}
                                    onChange={(e) => setDni(e.target.value)}
                                    type="text"
                                    className='shadow-2xl'
                                />
                            </div>
                            <button type='submit' className='border border-collapse'>createee</button>

                        </form>
                        
                    </div>
                </div>
            </div>
            <button> close</button>

                    </div>*/}
        </>



    )
}
export default ModalAdd;

