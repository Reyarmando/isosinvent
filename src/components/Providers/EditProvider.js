import { Form, Button } from 'react-bootstrap'
import { db } from "../../firebase"
import { getDoc, doc } from "firebase/firestore"

import { useState, useEffect } from 'react'

const EditProvider = (props) => {

    const initialStateValues = {
        name: '',
        ruc: '',
        phone: '',
        direction: '',
        rubro: '',
        description: '',
    }

    const [values, setValues] = useState(initialStateValues)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
    }



    const handleSubmit = (e) => {
        e.preventDefault()
        props.updateProvider(values);
        props.handleClose2()
        setValues({ ...initialStateValues })
    }

    const getToolById = async (id) => {
        const toolDoc = doc(db, "providers", id);
        const docT = await getDoc(toolDoc)
        setValues({ ...docT.data() })
    }

    useEffect((id) => {
        if (props.currentId === "") {
            setValues({ ...initialStateValues })
        } else {
            getToolById(props.currentId)
        }

    }, [props.currentId])

    return (

        <Form onSubmit={handleSubmit}>
            <Form.Group>
            <label className="block text-black
                    text-md font-bold my-2">Business Name:</label>
                <Form.Control
                    name="name"
                    type="text"
                    placeholder='names provider'
                    onChange={handleInputChange}
                    value={values.name}
                    required />
            </Form.Group>
            <label className="block text-black
                    text-md font-bold my-2">RUC:</label>
            <Form.Group>
                <Form.Control
                    name="ruc"
                    type="number"
                    placeholder='ruc'
                    onChange={handleInputChange}
                    value={values.ruc}
                    required />
            </Form.Group>
            <Form.Group>
            <label className="block text-black
                    text-md font-bold my-2">Description:</label>
                <Form.Control
                    name="description"
                    as="textarea"
                    row={3}
                    onChange={handleInputChange}
                    value={values.description}
                    required />
            </Form.Group>
            <Form.Group>
            <label className="block text-black
                    text-md font-bold my-2">CellPhone Contact:</label>
                <Form.Control
                    name="phone"
                    type="number"
                    placeholder='phone business'
                    onChange={handleInputChange}
                    value={values.phone}
                    required />
            </Form.Group>
            <Form.Group>
            <label className="block text-black
                    text-md font-bold my-2">Rubro:</label>
                <Form.Control
                    name="rubro"
                    type="text"
                    placeholder='rubro'
                    onChange={handleInputChange}
                    value={values.rubro}
                    required />
            </Form.Group>
            <Form.Group>
            <label className="block text-black
                    text-md font-bold my-2">Direction:</label>
                <Form.Control
                    name="direction"
                    type="text"
                    placeholder='direction business'
                    onChange={handleInputChange}
                    value={values.direction}
                    required />
            </Form.Group>
            <Button type='submit' className="block
                    text-md font-bold my-4">
                Update Provider
            </Button>
        </Form>
    )
}

export default EditProvider