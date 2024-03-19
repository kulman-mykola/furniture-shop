import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '../common/interfaces/product.interface.ts';
import { useNavigate } from 'react-router-dom';




const Products = () => {

    const [products, setProducts] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        await axios.get('http://localhost:3000/products',).then((res) => {
            setProducts(res.data)
        })
    }

    const handleAddProduct = async (event: FormEvent) => {
        event.preventDefault()

        const { name, price } = event.target

        await axios.post('http://localhost:3000/products', {
            name: name.value, price: price.value
        })

        fetchProducts()
    }

    const handleBuyClick = (product: Product) => {
        navigate('/checkout/' + product.id)
    }

    return (
        <>
        <h1>ProductPage</h1>



        <form onSubmit={handleAddProduct}>
            <input name={'name'} type={'text'} placeholder={'name'}/>
            <input name={'price'} type={'number'} step={'0.01'} placeholder={'price'}/>
            <button type={'submit'}>submit</button>
        </form>

            <table>
                <thead>
                <tr key={'header'}>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE ($)</th>
                </tr>
                </thead>

                <tbody>
                {products.map((product: Product) => {
                    return (

                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <th>
                                <button onClick={() => handleBuyClick(product)}>Buy</button>
                            </th>
                        </tr>

                )
                })}
                </tbody>
            </table>
        </>
                    )
                }

export default Products