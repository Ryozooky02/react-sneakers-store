import Cardimg from '../../resources/image/img-1.jpg';
import '../Card/Card.scss';

const Card = () => {
    return ( 
        <div className="Card">
                <div className="Card__img">
                    <img src={Cardimg} alt="Card" />
                </div>
                <div className="Card__title">
                    <h3>Мужские Кроссовки Nike Blazer Mid Suede</h3>
                </div>
                <div className="Card__price">
                    <div className="Card__price-info">
                        <h4>Цена:</h4>
                        <p>12 999 руб.</p>
                    </div>

                    <div className="Card__price-svg">
                        <button><svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z"/></svg></button>
                    </div>
                </div>
            </div>
     );
}
 
export default Card;