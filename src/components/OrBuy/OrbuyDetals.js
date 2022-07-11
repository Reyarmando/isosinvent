import { Form, Button, Modal } from 'react-bootstrap'
import { db } from "../../firebase"
import { collection, addDoc, onSnapshot, doc, getDoc } from 'firebase/firestore'


import { useState, useEffect } from 'react'

import { motion, AnimatePresence } from 'framer-motion'
import OrbuyDetalsAdd from './OrbuyDetalsAdd'


const OrbuyDetals = (props) => {

    const [show, steShow] = useState(false)

    const handleShow = () => steShow(true)
    const handleClose = () => steShow(false)

    const getOrbuyById = async (id) => {
        const eppDoc = doc(db, "orbuys", id);
        const docE = await getDoc(eppDoc)
        setValues({ ...docE.data() })
    }


    const initialStateValues = {
        code: '',
        descript: '',
        img: '',
        state: '',
    }

    const [values, setValues] = useState(initialStateValues)

    const valuesProvider = {
        city: '',
        ruc: '',
        label: '',
        phone: '',
        email: ''
    }
    const [provider, setProvider] = useState(valuesProvider)

    const handleChangeSelect = async (val) => {
        const city = val.target.value.split(',')[0];
        const ruc = val.target.value.split(',')[1]
        const label = val.target.value.split(',')[2]
        const phone = val.target.value.split(',')[3]
        const email = val.target.value.split(',')[4]
        setProvider({ city: city, ruc: ruc, label: label, phone: phone, email: email })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
    }

    const rutaDetals = `${"orbuys"}/${props.currentId
        }/${"detals"}`;


    const DetalsCollection = collection(db, rutaDetals)

    const addDetals = async (objetDetals) => {
        await addDoc(DetalsCollection, (objetDetals))

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.updateMachinary(values);
        props.handleClose2()
        setValues({ ...initialStateValues })
    }

    const [orbuyDetal, setOrbuyDetal] = useState([])

    const [providers, setProviders] = useState([])

    const [subTotals, setSubTotals] = useState([])

    function suma(arr) {
        let counter = 0;
        for (let i = 0; i < arr.length; i++) {
            counter += parseInt(arr[i])
        }
        return counter;
    }

    //parseInt(arr[0], 10) + parseInt(arr[1], 10) + parseInt(arr[3], 10)

    function multiplicar(a, b) { return a * b }

    useEffect(() => {
        //getOrbuyDetals()
        const providersRef = collection(db, "providers");
        onSnapshot(providersRef, (snapshot) => {
            setProviders(snapshot.docs.map((doc) => ({
                idProviders: doc.id,
                ...doc.data(),
            })))
        })
        const detalsRef = collection(db, rutaDetals);
        onSnapshot(detalsRef, (snapshot) => {
            setOrbuyDetal(
                snapshot.docs.map((doc) => ({
                    idDetals: doc.id,
                    ...doc.data(),
                })))
        })
        onSnapshot(detalsRef, (snapshot) => {
            setSubTotals(
                snapshot.docs.map((doc) => ([
                    doc.data().stock * doc.data().price
                ]))
            )
        })
        if (props.currentId === "") {
            setValues({ ...initialStateValues })
        } else {
            getOrbuyById(props.currentId)
        }
    }, [props.currentId])

    return (
        <Form>
            <div className="container">
                <div className="row align-items-start border border-black text-center">
                    <div className="col">
                        <ol>
                            <h5>Datos de contacto:</h5>
                            <li>Av. Argentina 105 S.R. Pachacutec Cerro colorado</li>
                            <li>ciudad: Arequipa</li>
                            <li>RUC: 2055587456</li>
                            <li>Contacto: 987654321 - 986543217</li>
                            <li>E-mail: gerencia@mjwprov.com</li>
                        </ol>
                    </div>
                    <div className="col">
                        <h1>ORDEN DE COMPRA</h1>
                    </div>
                    <div className="col">
                        <h2>{values.code}</h2>
                        <h4>fecha: {values.date}</h4>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col">
                        <Form.Select name="provider"
                            type="text"
                            onChange={handleChangeSelect}
                            aria-label="Default select example">
                            <option>Please select this</option>
                            {providers.map(provider => (
                                <option key={provider.idProviders} value={[provider.city, provider.ruc, provider.label, provider.phone, provider.email]}>{provider.label}</option>
                            ))}
                        </Form.Select>
                        <ol>
                            <h5>Datos de provider:</h5>
                            <li>Señor: {provider.label}</li>
                            <li>ciudad: {provider.city}</li>
                            <li>RUC: {provider.ruc}</li>
                            <li>Contacto: {provider.phone}</li>
                            <li>E-mail: {provider.email}</li>
                        </ol>

                    </div>
                    <div className="col">
                        <ol>
                            <li>Fecha entrega estimada: 30/06/2022</li>
                            <li>Área Solicitante: Operaciones</li>
                            <li>Proyecto: Frente yura</li>
                        </ol>
                    </div>
                    <p>Sirvase enviarnos lo siguiente sujeto a las condiciones estipuladas en este pedido</p>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th><Button onClick={handleShow} className="btn btn-succsess">+</Button></th>
                                <th>CANT.</th>
                                <th>UNID.</th>
                                <th>MARCA.</th>
                                <th>PRE.UNIT.</th>
                                <th>TOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orbuyDetal.map((orbuy) => (
                                <tr key={orbuy.idDetals} >
                                    <td>-</td>
                                    <td>{orbuy.stock}</td>
                                    <td>{orbuy.unidad}</td>
                                    <td>{orbuy.brand}</td>
                                    <td>{orbuy.price}</td>
                                    <td className="pl-15 border border-black">{multiplicar(orbuy.price, orbuy.stock)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="row align-items-end">
                    <div className="col">
                        <label>SON: TRECIENTOS SETENTA Y SIETE CON 60/100</label>
                    </div>
                    <div className="col">
                        <label>CONDICIONES DE PAGO: CONTADO</label>
                    </div>
                    <div className="col border border-black text-end">
                        <div className="row">
                            <div className="col-6 col-sm-4">SUB-TOTAL:</div>
                            <div className="col-6 col-sm-4 border border-black">{ suma(subTotals)}</div>

                            <div className="w-100 d-none d-md-block"></div>

                            <div className="col-6 col-sm-4">IGV 18%:</div>
                            <div className="col-6 col-sm-4">57.60</div>

                            <div className="w-100 d-none d-md-block border border-black"></div>

                            <div className="col-6 col-sm-4">TOTAL S/.:</div>
                            <div className="col-6 col-sm-4">377.60</div>
                        </div>
                    </div>
                    <div className="border border-black">
                        <h5>OBSERVACIONES:</h5>
                        <p>TIEMPO DE ENTREGA: PACTADO CON EL PROVEEDOR</p>
                    </div>
                </div>
            </div>
            <Modal show={show}>
                <Modal.Header >
                    <Modal.Title>
                        Add Provider
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <OrbuyDetalsAdd {...{ addDetals, handleClose }}></OrbuyDetalsAdd>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} >
                        close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Form>
    )
}

export default OrbuyDetals