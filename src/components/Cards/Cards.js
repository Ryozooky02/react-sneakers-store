import '../Cards/Cards.scss';
import Search from '../../resources/svg/search-card.svg';
import Card from '../Card/Card';

const Cards = () => {
    return ( 
        <div className="Cards">
            <div className="Cards__header">
                <div className="Cards__title">
                    <h1>Все кроссовки</h1>
                </div>
                <div className="Cards__input">
                    <img src={Search} alt="search" />
                    <input type="text" placeholder="Поиск..."/>
                </div>
            </div>
        <div className="Cards__list">
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </div>
        </div>
     );
}
 
export default Cards;