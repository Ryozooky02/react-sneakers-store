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
  const [SearchValue, setSearchValue] = useState('')

  const onAddtoCart = (obj) => {
    setCartItems([...CartItems, obj])
  }

  const onSearchCard = (e) => {
    setSearchValue(e.target.value)
  }

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
                    <h1>{SearchValue ? `Поиск по запросу '${SearchValue}'` : 'Все кросовки'}</h1>
                </div>
                <div className="Cards__input">
                    <img src={Search} alt="search" />
                    <input onChange={onSearchCard} value={SearchValue} type="text" placeholder="Поиск..."/>
                    { SearchValue && <button onClick={() => setSearchValue('')} className='clearInput'><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="white" stroke="#DBDBDB"/>
                                <path d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z" fill="#B5B5B5"/>
                                </svg></button>}
                </div>
            </div>
        <div className="Cards_hero">
          {items.filter(item => item.name.toLowerCase().includes(SearchValue.toLowerCase())).map((item, index) => (
              <Card key={index} name={item.name} price={item.price} image={item.image} onPlus={(obj) => onAddtoCart(obj)}/>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
