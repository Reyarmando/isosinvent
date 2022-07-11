import { Form, Button } from 'react-bootstrap'


import { useState } from 'react'
import { serverTimestamp } from 'firebase/firestore'

const ProviderAdd = (props) => {


    const initialStateValues = {
        label: '',
        ruc: '',
        phone: '',
        direction: '',
        rubro: '',
        description: '',
        timestamp: serverTimestamp()
    }

    const [values, setValues] = useState(initialStateValues)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        props.addProvider(values);
        props.handleClose()
        setValues({ ...initialStateValues })
    }



    return (

        <Form className='px-4' onSubmit={handleSubmit}>
            <Form.Group>
                <label className="block text-black
                    text-md font-bold my-2">Business Name:</label>
                <Form.Control
                    name="label"
                    type="text"
                    placeholder='names provider'
                    onChange={handleInputChange}
                    value={values.label}
                    required />
            </Form.Group>
            <Form.Group>
                <label className="block text-black
                    text-md font-bold my-2">RUC:</label>
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
                Add Provider
            </Button>
        </Form>
    )
}

export default ProviderAdd