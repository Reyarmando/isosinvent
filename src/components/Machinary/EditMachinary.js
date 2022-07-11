import { Form, Button } from 'react-bootstrap'
import { db } from "../../firebase"
import { getDoc, doc } from "firebase/firestore"

import { useState, useEffect } from 'react'

const EditMachinary = (props) => {

    const initialStateValues = {
        name: '',
        codeinv: '',
        brand: '',
        stock: '',
        model: '',
        descobs: ''
    }

    const [values, setValues] = useState(initialStateValues)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
    }



    const handleSubmit = (e) => {
        e.preventDefault()
        props.updateMachinary(values);
        props.handleClose2()
        setValues({ ...initialStateValues })
    }

    const getMachinaryById = async (id) => {
        const eppDoc = doc(db, "machinaries", id);
        const docE = await getDoc(eppDoc)
        setValues({ ...docE.data() })
    }

    useEffect((id) => {
        if (props.currentId === "") {
            setValues({ ...initialStateValues })
        } else {
            getMachinaryById(props.currentId)
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
                    text-md font-bold my-2">Inventory Code:</label>
            <Form.Group>
                <Form.Control
                    name="codeinv"
                    type="text"
                    placeholder='inventory code'
                    onChange={handleInputChange}
                    value={values.codeinv}
                    required />
            </Form.Group>
            <Form.Group>
                <label className="block text-black
                    text-md font-bold my-2">Brand:</label>
                <Form.Control
                    name="brand"
                    type="text"
                    placeholder='brand'
                    onChange={handleInputChange}
                    value={values.brand}
                    required />
            </Form.Group>
            <Form.Group>
                <label className="block text-black
                    text-md font-bold my-2">stock:</label>
                <Form.Control
                    name="stock"
                    type="number"
                    placeholder='0'
                    onChange={handleInputChange}
                    value={values.stock}
                    required />
            </Form.Group>
            <Form.Group>
                <label className="block text-black
                    text-md font-bold my-2">Model:</label>
                <Form.Control
                    name="model"
                    type="text"
                    placeholder='model'
                    onChange={handleInputChange}
                    value={values.model}
                    required />
            </Form.Group>
            <Form.Group>
                <label className="block text-black
                    text-md font-bold my-2">Description/Obs:</label>
                <Form.Control
                    name="descobs"
                    as="textarea"
                    row={3}
                    onChange={handleInputChange}
                    value={values.descobs}
                    required />
            </Form.Group>
            <Button type='submit' className="block
                    text-md font-bold my-4">
                Update Machinary
            </Button>
        </Form>
    )
}

export default EditMachinary