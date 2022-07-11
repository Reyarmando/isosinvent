import { Form, Button } from 'react-bootstrap'
import { db } from "../../firebase"
import { useState, useEffect } from 'react'
import { serverTimestamp, collection, onSnapshot } from 'firebase/firestore'

const OrbuyAdd = (props) => {


    


    const [provider, setProvider] = useState({})

    const valuesProvider = []

    const initialStateValues = {
        code: '',
        descript: '',
        img: '',
        date: '',
        dateset: '',
        areasol: '',
        project: '',
        
        timestamp: serverTimestamp(),
    }

    const [values, setValues] = useState(initialStateValues)
    const handleChangeSelect = async (val) => {
        const city = val.target.value.split(',')[0]
        const ruc = val.target.value.split(',')[1]
        const label = val.target.value.split(',')[2]
        const phone = val.target.value.split(',')[3]
        const email = val.target.value.split(',')[4]
        setValues({ provider: [city, ruc, label, phone, email] })
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
    }



    const handleSubmit = (e) => {
        e.preventDefault()
        props.addOrbuy(values);
        props.handleClose()
        setValues({ ...initialStateValues })
    }



    const [providers, setProviders] = useState([])

    const [states, setStates] = useState([])


    useEffect(() => {
        //getOrbuyDetals()
        const statesRef = collection(db, "statesOrbuy");
        onSnapshot(statesRef, (snapshot) => {
            setStates(snapshot.docs.map((doc) => ({
                idStates: doc.id,
                ...doc.data(),
            })))
        })
        const providersRef = collection(db, "providers");
        onSnapshot(providersRef, (snapshot) => {
            setProviders(snapshot.docs.map((doc) => ({
                idProviders: doc.id,
                ...doc.data(),
            })))
        })
    }, [props.currentId])


    return (

        <Form className='px-4' onSubmit={handleSubmit}>
            <Form.Group>
                <label className="block text-black
                    text-md font-bold my-2">Code:</label>
                <Form.Control
                    name="code"
                    type="text"
                    placeholder='code'
                    onChange={handleInputChange}
                    value={values.code}
                    required />
            </Form.Group>
            <Form.Group>
                <label className="block text-black
                    text-md font-bold my-2">providers:</label>
                <Form.Select name="provider"
                    type="text"
                    onChange={handleChangeSelect}
                    aria-label="Default select example">
                    <option>Please select this</option>
                    {providers.map(provider => (
                        <option key={provider.idProviders} value={[provider.city, provider.ruc, provider.label, provider.phone, provider.email]}>{provider.label}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group>
                <label className="block text-black
                    text-md font-bold my-2">date:</label>
                <Form.Control
                    name="date"
                    type="date"
                    placeholder='date'
                    onChange={handleInputChange}
                    value={values.date}
                    required />
            </Form.Group>
            <Form.Group>
                <label className="block text-black
                    text-md font-bold my-2">date entrega:</label>
                <Form.Control
                    name="dateset"
                    type="date"
                    placeholder='dateset'
                    onChange={handleInputChange}
                    value={values.dateset}
                    required />
            </Form.Group>
            <Form.Group>
                <label className="block text-black
                    text-md font-bold my-2">Area Solicitante:</label>
                <Form.Control
                    name="areasol"
                    type="text"
                    placeholder='area solicitante'
                    onChange={handleInputChange}
                    value={values.areasol}
                    required />
            </Form.Group>
            <Form.Group>
                <label className="block text-black
                    text-md font-bold my-2">Proyecto:</label>
                <Form.Control
                    name="project"
                    type="text"
                    placeholder='proyecto'
                    onChange={handleInputChange}
                    value={values.project}
                    required />
            </Form.Group>
            <Form.Group>
                <label className="block text-black
                    text-md font-bold my-2">state:</label>

                <Form.Select name="state"
                    type="text"
                    onChange={handleInputChange}
                    value={values.state}
                    aria-label="Default select example">
                    <option>Please select this</option>
                    {states.map(state => (

                        <option key={state.idStates} value={state.label}>{state.label}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group>
                <label className="block text-black
                    text-md font-bold my-2">Description/Obs:</label>
                <Form.Control
                    name="descript"
                    as="textarea"
                    row={3}
                    onChange={handleInputChange}
                    value={values.descript}
                    required />
            </Form.Group>
            <Button type='submit' className="block
                    text-md font-bold my-4">
                Add Order buy
            </Button>
        </Form>
    )
}

export default OrbuyAdd