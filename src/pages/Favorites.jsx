import { useContext } from 'react';
import Card from '../components/Card/Card';
import { AppContext } from '../components/App/App';

function Favorites({ onAddtoFavorite, onAddtoCart}) {

    const { FavoriteItems } = useContext(AppContext);
    
    return (
        <div className="content-cards">
        <div className="Cards__header">
                <div className="Cards__title">
                    <h1>Мои закладки</h1>
                </div>
            </div>
            <div className="Cards_hero">
            {FavoriteItems.map((item, index) => (
                    <Card key={index} 
                      favorited={true}
                      onAddtoFavorite={onAddtoFavorite}
                      onAddtoCart={onAddtoCart}
                      {...item}
                      />
                  ))}
            </div>
      </div>
    )
}


export default Favorites;