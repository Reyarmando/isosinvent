import { Form, Button } from 'react-bootstrap'
import { db } from "../../firebase"
import { getDoc, doc } from "firebase/firestore"

import { useState, useEffect } from 'react'

const EditTool = (props) => {

    const initialStateValues = {
        description: '',
        serialnum: '',
        model: '',
        brand: '',
        peopleres: '',
        areares: '',
        name: ''
    }

    const [values, setValues] = useState(initialStateValues)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
    }



    const handleSubmit = (e) => {
        e.preventDefault()
        props.updateTool(values);
        props.handleClose2()
        setValues({ ...initialStateValues })
    }

    const getToolById = async (id) => {
        const toolDoc = doc(db, "tools", id);
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
                    text-md font-bold my-2">Name of tool:</label>
                <Form.Control
                    name="name"
                    type="text"
                    placeholder='names tool'
                    onChange={handleInputChange}
                    value={values.name}
                    required />
            </Form.Group>
            <Form.Group>
                <label className="block text-black
                    text-md font-bold my-2">Description:</label>
                <Form.Control
                    name="description"
                    type="text"
                    placeholder='description'
                    onChange={handleInputChange}
                    value={values.description}
                    required />
            </Form.Group>
            <Form.Group>
                <label className="block text-black
                    text-md font-bold my-2">Serial Num.:</label>
                <Form.Control
                    name="serialnum"
                    type="int"
                    placeholder='serialnum'
                    onChange={handleInputChange}
                    value={values.serialnum}
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
                    text-md font-bold my-2">People in charge:</label>
                <Form.Control
                    name="peopleres"
                    type="text"
                    placeholder='peopleres'
                    onChange={handleInputChange}
                    value={values.peopleres}
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
                    text-md font-bold my-2">Area in charge:</label>
                <Form.Control
                    name="areares"
                    type="text"
                    placeholder='areares'
                    onChange={handleInputChange}
                    value={values.areares}
                    required />
            </Form.Group>
            <Button type='submit' className="block
                    text-md font-bold my-4">
                Update Tool
            </Button>
        </Form>
    )
}

export default EditTool