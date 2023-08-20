import '../Drawer/Drawer.scss';
import ArrowSVG from '../../resources/svg/drawer-button-arrow.svg';
import emptyBoxCart from '../../resources/cart/emptyBoxCart.png';
import OrderCompleteBoxCart from '../../resources/cart/cart-ordered.jpg';
import Info from '../Info/Info';
import { useState } from 'react';
import axios from 'axios';
import { useCart } from '../../hooks/useCart';


const Drawer = ({onCloseDrawer, itemsCart = [], onRemoveFromCart, opened}) => {

    const { CartItems, setCartItems, TotalPrice } = useCart()
    const [isOrderComplete, setisOrderComplete] = useState(false);
    const [OrderId, setOrderId] = useState(null);
    const [isLoadingOrder, setIsLoadingOrder] = useState(false);

    const TotalRoundedTax = (Math.round(TotalPrice / 100) * 5).toFixed(0);
    const TotalTax = (TotalPrice / 100) * 5;
    const TotalPriceWithTax = (TotalPrice - TotalTax).toFixed(0);



    const delay = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms))



    const onClickOrder = async () => {
        try {
            setIsLoadingOrder(true);
            const { data } = await axios.post('http://localhost:3001/orders', {
                items: CartItems
            });
            setOrderId(data.id);
            setisOrderComplete(true);
            setCartItems([]);

           for (let i = 0; i < CartItems.length; i++) {
            const item = CartItems[i];
            await axios.delete('http://localhost:3001/cart/' + item.id)
            await delay(1000);
           }
        } catch (error) {
            console.log(error);
            alert('Не удалось создать заказ :(')
        }
        setIsLoadingOrder(false);
    }
    

    return ( 
            <div onClick={onCloseDrawer} className="Overlay">
                <div onClick={(e) => e.stopPropagation()} className="Drawer">
                    <div className="Drawer__title">
                        <h3>Корзина</h3>
                        <div className="Drawer__remove">
                                <button onClick={onCloseDrawer}><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="white" stroke="#DBDBDB"/>
                                <path d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z" fill="#B5B5B5"/>
                                </svg></button>
                            </div>
                    </div>

                    {itemsCart.length > 0 ? (<div className='cartItemsFlex'>
                        <div className="Drawer__cards">
                        {itemsCart.map((item) => (
                            <div key={item.id} className="Drawer__card">
                                <div className="Drawer__img">
                                    <img src={item.image} alt="imageCard" />
                                </div>
                                <div className="Drawer__info">
                                    <p>{item.name}</p>
                                    <span>{item.price} руб.</span>
                                </div>
                                <div onClick={() => onRemoveFromCart(item.id)} className="Drawer__remove">
                                    <button><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="white" stroke="#DBDBDB"/>
                                    <path d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z" fill="#B5B5B5"/>
                                    </svg></button>
                                </div>
                            </div>
                        ))}
                    </div><div className="Drawer__total">
                        <div className="Drawer__amount">
                            <span>Итого:</span>
                            <p>{TotalPriceWithTax} руб. </p>
                        </div>
                        <div className="Drawer__tax">
                            <span>Налог 5%</span>
                            <p>{TotalRoundedTax} руб.</p>
                        </div>
                        <div className="Drawer__button">
                            <button disabled={isLoadingOrder} onClick={onClickOrder}>Оформить заказ</button>
                            <img src={ArrowSVG} alt="arrow" />
                        </div>
                    </div>
                    </div> ) :
                        <Info 
                        name={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
                        desc={isOrderComplete ? `Ваш заказ #${OrderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кросовок чтобы сделать заказ"} 
                        image={isOrderComplete ? OrderCompleteBoxCart : emptyBoxCart}/>}
                </div>
            </div>
     );
}
 
export default Drawer;