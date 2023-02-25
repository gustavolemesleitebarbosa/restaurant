import {
  PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import axios from "axios";
import Image from 'next/image';
import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderDetail from "../components/OrderDetail";
import { reset } from '../redux/cartSlice';
import styles from '../styles/Cart.module.css';

const Cart = () => {

  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const amount = cart.total;
  const currency = "BRL";
  const style = { "layout": "vertical" };
  const [open, setOpen] = useState(false)
  const [cash, setCash] = useState(false)
  const router = useRouter()


  const createOrder = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/orders", data)
      res.statusCode = 201 && router.push("/orders/" + res.data._id)
      dispatch(reset())
    }
    catch (err) {
      console.error('error over here', err);
    }
  }

  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);


    return (<>
      {(showSpinner && isPending) && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[amount, currency, style]}
        fundingSource={"paypal"}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            })
            .then((orderId) => {
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={function (data, actions) {
          return actions.order.capture().then(function (details) {
            const shipping = details.purchase_units[0].shipping;
            console.log('shipping over here', shipping);
            createOrder({
              customer: shipping.name.full_name,
              address: shipping.address.address_line_1,
              total: cart.total,
              method: 1
            })
          });
        }}
      />
    </>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th> Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.products.map((product) => (
              <tr className={styles.tr} key={product._id}>
                <td>
                  <div className={styles.imgContainer} >
                    <Image src={product.img} fill style={{ objectFit: "cover" }} alt="" />
                  </div>
                </td>
                <td>
                  <div className={styles.name} >
                    {product.title}
                  </div>
                </td>
                <td>
                  <span className={styles.extras} >
                    {product.extras.map((extra) => (<span key={extra._id}>{extra.text}, </span>))}
                  </span>
                </td>
                <td>
                  <span className={styles.price} >
                    {product.price}
                  </span>
                </td>
                <td>
                  <span className={styles.quantity} >
                    {product.quantity}
                  </span>
                </td>
                <td>
                  <span className={styles.total} >
                    {product.price * product.quantity}
                  </span>
                </td>
              </tr>

            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>{cart.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>{cart.total}
          </div>
          {open ? (
            <div className={styles.paymentMethods}>
              <button className={styles.payButton} onClick={() => setCash(true)}>CASH ONDELIVERY</button>
              <PayPalScriptProvider
                options={{
                  "client-id": "ASWqjIUc60Qb1ZaKtwOzTdgOE0aNfOuKA0Jz4sVGD-oi5RJ4Wa3y8rcPhLIsaWocUcr-uTbnRqBKKj7M",
                  components: "buttons",
                }}
              >
                <ButtonWrapper
                  currency={currency}
                  showSpinner={false}
                />
              </PayPalScriptProvider>
            </div>
          ) : (<button className={styles.payButton} onClick={() => setOpen(true)}>CHECKOUT NOW!</button>)
          }
        </div>
      </div>
      {cash && (<OrderDetail
      total ={cart.total}
      createOrder ={createOrder}
      setCash ={setCash}
      />)}
    </div>
  )
}

export default Cart