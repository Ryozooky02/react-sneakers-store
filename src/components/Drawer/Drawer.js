import '../Drawer/Drawer.scss';
import Cardimg from '../../resources/image/img-1.jpg';
import ArrowSVG from '../../resources/svg/drawer-button-arrow.svg';
const Drawer = () => {
    return ( 
        <div className="Drawer__overlay">
            <div className="Overlay">
                <div className="Drawer">
                    <div className="Drawer__title">
                        <h3>Корзина</h3>
                        <div className="Drawer__remove">
                                <button><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="white" stroke="#DBDBDB"/>
                                <path d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z" fill="#B5B5B5"/>
                                </svg></button>
                            </div>
                    </div>
                    <div className="Drawer__cards">
                        <div className="Drawer__card">
                            <div className="Drawer__img">
                                <img src={Cardimg} alt="imageCard" />
                            </div>
                            <div className="Drawer__info">
                                <p>Мужские Кроссовки Nike Air Max 270</p>
                                <span>12 999 руб.</span>
                            </div>
                            <div className="Drawer__remove">
                                <button><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="white" stroke="#DBDBDB"/>
                                <path d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z" fill="#B5B5B5"/>
                                </svg></button>
                            </div>
                        </div>
                        {/* 2 */}
                        <div className="Drawer__card">
                            <div className="Drawer__img">
                                <img src={Cardimg} alt="imageCard" />
                            </div>
                            <div className="Drawer__info">
                                <p>Мужские Кроссовки Nike Air Max 270</p>
                                <span>12 999 руб.</span>
                            </div>
                            <div className="Drawer__remove">
                                <button><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="white" stroke="#DBDBDB"/>
                                <path d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z" fill="#B5B5B5"/>
                                </svg></button>
                            </div>
                        </div>
                    </div>
                    <div className="Drawer__total">
                        <div className="Drawer__amount">
                            <span>Итого:</span>
                            <p>21 498 руб. </p>
                        </div>
                        <div className="Drawer__tax">
                            <span>Налог 5%</span>
                            <p>1074 руб.</p>
                        </div>
                        <div className="Drawer__button">
                            <button>Оформить заказ</button>
                            <img src={ArrowSVG} alt="arrow" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Drawer;