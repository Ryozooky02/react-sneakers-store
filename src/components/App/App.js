import '../App/App.scss';
import Header from '../Header/Header';
import Card from '../Card/Card';
import Drawer from '../Drawer/Drawer';
import Search from '../../resources/svg/search-card.svg';
import { useEffect, useState } from 'react';



function App() {

  const [items, setItems] = useState([]);
  const [CartOpened, setCartOpened] = useState(false);
  const [CartItems, setCartItems] = useState([]);

  const onAddtoCart = (obj) => {
    setCartItems([...CartItems, obj])
  }

  console.log(CartItems);

  useEffect(() => {
    fetch('https://64ca5b0f700d50e3c704c5cc.mockapi.io/items')
  .then(res => res.json())
  .then(json => setItems(json))
  }, [])

  return (
    <div className="App">
      <div className="wrapper">
        {CartOpened && <Drawer CartItems={CartItems} onCloseDrawer={() => setCartOpened(false)}/>}
        <Header onOpenCart={() => setCartOpened(true)}/>

        <div className="Cards__header">
                <div className="Cards__title">
                    <h1>Все кроссовки</h1>
                </div>
                <div className="Cards__input">
                    <img src={Search} alt="search" />
                    <input type="text" placeholder="Поиск..."/>
                </div>
            </div>
        <div className="Cards_hero">
          {items.map((item, index) => (
              <Card key={index} name={item.name} price={item.price} image={item.image} onPlus={(obj) => onAddtoCart(obj)}/>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
