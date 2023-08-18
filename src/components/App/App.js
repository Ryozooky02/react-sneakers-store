import '../App/App.scss';
import Header from '../Header/Header';
import Drawer from '../Drawer/Drawer';
import { useEffect, useState, createContext } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home';
import Favorites from '../../pages/Favorites';


export const AppContext = createContext({});

function App() {

  const [items, setItems] = useState([]);
  const [CartOpened, setCartOpened] = useState(false);
  const [CartItems, setCartItems] = useState([]);
  const [FavoriteItems, setFavoriteItems] = useState([]);
  const [SearchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);


  const onAddtoCart = (obj) => {

    try {
      if (CartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(`http://localhost:3001/cart/${obj.id}`);
        setCartItems(prev => prev.filter(card => Number(card.id) !== Number(obj.id)));
      } else {
        axios.post('http://localhost:3001/cart', obj);
        setCartItems([...CartItems, obj]);
      }
     
    } catch (error) {
      alert('Ошибка запроса на добавление...')
    }
    
  }

  const onRemoveFromCart = (id) => {
    axios.delete(`http://localhost:3001/cart/${id}`);
    setCartItems(prev => prev.filter(item => item.id !== id));
  }

  const onSearchCard = (e) => {
    setSearchValue(e.target.value)
  }

  const isAddedItem = (id) => {
    return CartItems.some((obj) => Number(obj.id ) === Number(id))
  }



  useEffect(() => {
    async function fetchData() {
      const itemsResponse = await axios.get('http://localhost:3001/items');
      const cartResponse = await axios.get('http://localhost:3001/cart');
      const favoritesResponse = await axios.get('http://localhost:3001/favorites');

      setIsLoading(false);

      setCartItems(cartResponse.data);
      setFavoriteItems(favoritesResponse.data);
      setItems(itemsResponse.data);
    }
    fetchData();
  }, [])

  

  const onAddtoFavorite = async (obj) => {
    try {
      if (FavoriteItems.find(favObj => favObj.id === obj.id)) {
        axios.delete(`http://localhost:3001/favorites/${obj.id}`);
        setFavoriteItems(prev => prev.filter(card => Number(card.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post('http://localhost:3001/favorites', obj);
        setFavoriteItems((prev) => [...prev, data])
      }
    }
    catch (error) {
      alert('Не удалось добавить в закладки...');
    }
  }

  return (
    <AppContext.Provider value={{
      
    items, 
    CartItems, 
    FavoriteItems, 
    isAddedItem, 
    setCartOpened, 
    setCartItems
    
    }}>
      <div className="App">
        <div className="wrapper">
        <Header 
          onOpenCart={() => setCartOpened(true)} 
          />

          {CartOpened && <Drawer 
            onRemoveFromCart={onRemoveFromCart} 
            itemsCart={CartItems} 
            onCloseDrawer={() => setCartOpened(false)}
            />}
        
        <Routes>
          <Route path="/" element={
            <Home 
              SearchValue={SearchValue}
              onSearchCard={onSearchCard}
              setSearchValue={setSearchValue}
              items={items}
              onAddtoCart={onAddtoCart}
              onAddtoFavorite={onAddtoFavorite}
              CartItems={CartItems}
              isLoading={isLoading}/>
          }>
          </Route>
          <Route path='/favorites' element={
            <Favorites 
            onAddtoFavorite={onAddtoFavorite}
            onAddtoCart={onAddtoCart}/>
          }>
          </Route>
        </Routes>


        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
