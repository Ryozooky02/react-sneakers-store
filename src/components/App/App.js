import '../App/App.scss';
import Header from '../Header/Header';
import Drawer from '../Drawer/Drawer';
import { useEffect, useState, createContext } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';

import Home from '../../pages/Home';
import Favorites from '../../pages/Favorites';
import Orders from '../../pages/Orders';


export const AppContext = createContext({});

function App() {

  const [items, setItems] = useState([]);
  const [CartOpened, setCartOpened] = useState(false);
  const [CartItems, setCartItems] = useState([]);
  const [FavoriteItems, setFavoriteItems] = useState([]);
  const [SearchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);


  const onAddtoCart = async (obj) => {

    try {
      const findItem = CartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems(prev => prev.filter(card => Number(card.parentId) !== Number(obj.id)));
        await axios.delete(`http://localhost:3001/cart/${findItem.id}`);
      } else {
        setCartItems(prev => [...prev, obj]);
        const { data } = await axios.post('http://localhost:3001/cart', obj);
        setCartItems((prev) => prev.map(item => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            }
          }
          return item;
        }));
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
    return CartItems.some((obj) => Number(obj.parentId) === Number(id))
  }



  useEffect(() => {
    try {
      async function fetchData() {
        const [itemsResponse, cartResponse, favoritesResponse] = await Promise.all([
          axios.get('http://localhost:3001/items'), 
          axios.get('http://localhost:3001/cart'), 
          axios.get('http://localhost:3001/favorites')
        ])
  
  
        setIsLoading(false);
  
        setCartItems(cartResponse.data);
        setFavoriteItems(favoritesResponse.data);
        setItems(itemsResponse.data);
      }
        fetchData();
    } catch (error) {
        alert('Упс, что-то пошло не так...')
        console.error(error);
    }
  
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
      console.error(error);
    }
  }

  return (
    <AppContext.Provider value={{
      
    items, 
    CartItems, 
    FavoriteItems, 
    isAddedItem, 
    setCartOpened, 
    setCartItems,

    
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
          <Route path='/orders' element={
            <Orders
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
