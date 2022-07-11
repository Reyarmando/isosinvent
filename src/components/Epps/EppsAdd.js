import { Form, Button } from 'react-bootstrap'


import { useState } from 'react'
import { serverTimestamp } from 'firebase/firestore'

const EppsAdd = (props) => {


    const initialStateValues = {
        name: '',
        codeinv: '',
        brand: '',
        stock: 0,
        model: '',
        timestamp: serverTimestamp()
    }

    const [values, setValues] = useState(initialStateValues)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        props.addEpps(values);
        props.handleClose()
        setValues({ ...initialStateValues })
    }



    return (

        <Form className='px-4' onSubmit={handleSubmit}>
            <Form.Group>
                <label className="block text-black
                    text-md font-bold my-2">Name:</label>
                <Form.Control
                    name="name"
                    type="text"
                    placeholder='name'
                    onChange={handleInputChange}
                    value={values.name}
                    required />
            </Form.Group>
            <Form.Group>
                <label className="block text-black
                    text-md font-bold my-2">Inventory Code:</label>
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
                    placeholder='Brand'
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
                    placeholder='Model'
                    onChange={handleInputChange}
                    value={values.model}
                    required />
            </Form.Group>
            <Button type='submit' className="block
                    text-md font-bold my-4">
                Add Epp
            </Button>
        </Form>
    )
}

export default EppsAdd