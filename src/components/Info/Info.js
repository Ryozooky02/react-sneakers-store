import React, { useContext } from 'react'
import arrowBoxCart from '../../resources/cart/arrowEmptyCart.png';
import { AppContext } from '../App/App';

const Info = ({image, name, desc}) => {

    const { setCartOpened } = useContext(AppContext);


  return (
    <div className="emptyCart">
            <img className='emptyCart__box' src={image} alt="emptyBoxCart" />
            <h2>{name}</h2>
            <p>{desc}</p>
            <button onClick={() => setCartOpened(false)}>
            <img src={arrowBoxCart} alt="arrowBoxCart" />
            Вернуться назад</button>
    </div>
  )
}


export default Info;