import Card from '../components/Card/Card';

function Favorites({FavoriteItems, onAddtoFavorite}) {

    console.log(FavoriteItems);
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
                      {...item}
                      />
                  ))}
            </div>
      </div>
    )
}


export default Favorites;