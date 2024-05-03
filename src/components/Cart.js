import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ItemList from './ItemList';
import { clearCart } from '../utils/cartSlice';

const Cart = () => {

    // subscribe to the part of store u want to access
    const cartItems = useSelector((store) => store.cart.items);


    const dispatch = useDispatch();
    const handleClearCart = () => {
        dispatch(clearCart());
    }


    return (
        <div className='text-center m-4 p-4'>
            <h1 className='text-2xl font-bold'>Cart</h1>
            <div className='w-6/12 m-auto'>
                <button className='p-2 m-2 bg-black text-white rounded-lg'
                    onClick={handleClearCart}
                >Clear Cart</button>
                
                {cartItems.length === 0 &&  <div className='m-4'> <h1 className='text-red-400 font-bold'>Cart is empty! Add items 🥲</h1></div>}
                <ItemList items={cartItems} />
            </div>
        </div>
    )
}

export default Cart;