import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { calculateTotal, fetchCartItems } from "./features/cart/cartSlice";
import Modal from "./components/Modal";


function App() {

  const { cartItems, isLoading } = useSelector(state => state.cart);
  const { isOpen } = useSelector(state => state.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems]);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    )
  }


  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>

  );
}
export default App;
