import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';




const CartIcon = () => {

    const navigate = useNavigate();


    const handleCartClicked = () => {

        navigate('/my-cart');
    }


    return (
        <span class="relative cursor-pointer" onClick={handleCartClicked}>
            <AiOutlineShoppingCart size={25} className="text-white" />
            {/* <div class="-top-2 -right-8 rounded-full w-8 bg-secondary absolute text-sm">+99</div> */}
        </span>
    );
};

export default CartIcon;