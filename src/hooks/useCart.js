import { useContext } from "react";
import { AppContext } from "../components/App/App";

export const useCart = () => {
    const {CartItems, setCartItems} = useContext(AppContext);
    const TotalPrice = CartItems.reduce((sum, obj) => obj.price + sum, 0);

    return { CartItems, setCartItems, TotalPrice };
}

