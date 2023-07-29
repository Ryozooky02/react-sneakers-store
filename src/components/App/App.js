import '../App/App.scss';
import Header from '../Header/Header';
import Cards from '../Cards/Cards';
import Drawer from '../Drawer/Drawer';


function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header/>
        <Cards/>
        <Drawer/>
      </div>
    </div>
  );
}

export default App;
