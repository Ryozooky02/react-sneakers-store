import '../App/App.scss';
import Header from '../Header/Header';
import Drawer from '../Drawer/Drawer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home';
import Favorites from '../../pages/Favorites';




function App() {

  const [items, setItems] = useState([]);
  const [CartOpened, setCartOpened] = useState(false);
  const [CartItems, setCartItems] = useState([]);
  const [FavoriteItems, setFavoriteItems] = useState([]);
  const [SearchValue, setSearchValue] = useState('');


  const onAddtoCart = (obj) => {
    axios.post('http://localhost:3001/cart', obj);
    setCartItems([...CartItems, obj])
  }

  const onRemoveFromCart = (id) => {
    console.log(id);
    axios.delete(`http://localhost:3001/cart/${id}`);
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const onSearchCard = (e) => {
    setSearchValue(e.target.value)
  }



  useEffect(() => {
    axios.get('http://localhost:3001/items').then(res => 
    setItems(res.data));
    axios.get('http://localhost:3001/cart').then(res => 
    setCartItems(res.data));
    axios.get('http://localhost:3001/favorites').then(res => 
    setFavoriteItems(res.data));
  }, [])

  

  const onAddtoFavorite = async (obj) => {
    try {
      if (FavoriteItems.find(favObj => favObj.id === obj.id)) {
        axios.delete(`http://localhost:3001/favorites/${obj.id}`)
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
    <div className="App">
      <div className="wrapper">
      <Header onOpenCart={() => setCartOpened(true)}/>

        {CartOpened && <Drawer onRemoveFromCart={onRemoveFromCart} 
        CartItems={CartItems} 
        onCloseDrawer={() => setCartOpened(false)}/>}
      
      <Routes>
        <Route path="/" element={
          <Home 
            SearchValue={SearchValue}
            onSearchCard={onSearchCard}
            setSearchValue={setSearchValue}
            items={items}
            onAddtoCart={onAddtoCart}
            onAddtoFavorite={onAddtoFavorite}/>
        }>
        </Route>
        <Route path='/favorites' element={
          <Favorites 
          FavoriteItems={FavoriteItems}
          onAddtoFavorite={onAddtoFavorite}/>
        }>
        </Route>
      </Routes>


      </div>
    </div>
  );
}

export default App;
