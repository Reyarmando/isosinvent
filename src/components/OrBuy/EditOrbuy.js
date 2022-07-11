import { Form, Button } from 'react-bootstrap'
import { db } from "../../firebase"
import { getDoc, doc } from "firebase/firestore"

import { useState, useEffect } from 'react'

const EditOrbuy = (props) => {

    const initialStateValues = {
        code: '',
        descript: '',
        img: '',
        state: '',
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

    const getOrbuyById = async (id) => {
        const eppDoc = doc(db, "orbuys", id);
        const docE = await getDoc(eppDoc)
        setValues({ ...docE.data() })
    }

    useEffect((id) => {
        if (props.currentId === "") {
            setValues({ ...initialStateValues })
        } else {
            getOrbuyById(props.currentId)
        }

    }, [props.currentId])

    return (

        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <label className="block text-black
                    text-md font-bold my-2">Business Name:</label>
                <Form.Control
                    name="code"
                    type="text"
                    placeholder='names provider'
                    onChange={handleInputChange}
                    value={values.code}
                    required />
            </Form.Group>
            <label className="block text-black
                    text-md font-bold my-2">Inventory Code:</label>
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
            <Form.Group>
                <label className="block text-black
                    text-md font-bold my-2">Brand:</label>
                <Form.Control
                    name="brand"
                    type="text"
                    placeholder='brand'
                    onChange={handleInputChange}
                    value={values.img}
                    required />
            </Form.Group>
            <Form.Group>
                <label className="block text-black
                    text-md font-bold my-2">stock:</label>
                <Form.Control
                    name="stock"
                    type="text"
                    placeholder='0'
                    onChange={handleInputChange}
                    value={values.state}
                    required />
            </Form.Group>
            <Button type='submit' className="block
                    text-md font-bold my-4">
                Update Machinary
            </Button>
        </Form>
    )
}

export default EditOrbuy