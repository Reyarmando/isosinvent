import { Form, Button } from 'react-bootstrap'


import { useState } from 'react'
import { serverTimestamp } from 'firebase/firestore'

const ProviderAdd = (props) => {

    function multiplicar(a, b) { return a * b }

    const initialStateValues = {
        brand: '',
        name: '',
        price: 0,
        stock: 0,
        total: '',
        timestamp: serverTimestamp()
    }



    const [values, setValues] = useState(initialStateValues)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
    }

    const handleInputChangeUauto = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
        console.log(value)
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        props.addDetals(values);
        props.handleClose()
        setValues({ ...initialStateValues })
    }



    return (

        <Form className='px-4' onSubmit={handleSubmit}>
            <Form.Group>
                <label className="block text-black
                    text-md font-bold my-2">Name Product:</label>
                <Form.Control
                    name="name"
                    type="text"
                    placeholder='names provider'
                    onChange={handleInputChange}
                    value={values.name}
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
                    text-md font-bold my-2">Stock:</label>
                <Form.Control
                    name="stock"
                    type="number"
                    placeholder='stock'
                    onChange={handleInputChange}
                    value={values.stock}
                    required />
            </Form.Group>
            <Form.Group>
                <label className="block text-black
                    text-md font-bold my-2">Price unit.:</label>
                <Form.Control
                    name="price"
                    type="text"
                    placeholder='price of product'
                    onChange={handleInputChange}
                    value={values.price}
                    required />
            </Form.Group>
            <Form.Group>
                <label className="block text-black
                    text-md font-bold my-2">total.:</label>
                <Form.Control
                    name="total"
                    type="text"
                    placeholder='total'
                    onChange={handleInputChangeUauto}
                    value={multiplicar(values.price, values.stock)}
                    required
                />
            </Form.Group>
            <Button type='submit' className="block
                    text-md font-bold my-4">
                Add Provider
            </Button>
        </Form>
    )
}

export default ProviderAdd