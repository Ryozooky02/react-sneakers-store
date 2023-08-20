import { useEffect, useState } from 'react';
import Card from '../components/Card/Card';
import axios from 'axios';



function Orders() {

    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect( () =>  {
        ( async () => {
            try {
                const { data } = await axios.get('https://re-reactive-store.onrender.com/orders');
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
                setIsLoading(false);
            } catch (error) {
                alert('Что-то пошло не так с покупками...  :(');
                console.error(error);
            }
        })();
    }, [])

    return (
        <div className="content-cards">
        <div className="Cards__header">
                <div className="Cards__title">
                    <h1>Мои покупки</h1>
                </div>
            </div>
            <div className="Cards_hero">
            {(isLoading ? [...Array(12)] : orders).map((item, index) => (
                    <Card key={index} 
                        loading={isLoading}
                        {...item}
                      />
                  ))}
            </div>
      </div>
    )
}


export default Orders;