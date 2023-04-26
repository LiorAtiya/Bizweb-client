import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom";
import ApiClient from '../api/ApiRoutes';
import '../styles/MyShoppingCart.css'
import { useTranslation } from 'react-i18next';

export default function MyShoppingCart() {

    let { userID } = useParams();
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const { t } = useTranslation();

    useEffect(() => {
        const getResult = async () => {
            // gets details of user
            ApiClient.getUserDetails(userID)
                .then((res) => {
                    localStorage.setItem("token", JSON.stringify(res.data));
                    setCart(JSON.parse(localStorage.getItem('token')));
                    const total = res.data.myShoppingCart.reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity), 0)
                    setTotalPrice(total);
                })
                .catch((err) => console.log(err));
        };
        getResult();
    }, [userID]);

    const handleRemoveFromCart = (cartItem) => {
        ApiClient.RemoveProductFromCart(userID, cartItem.id)
            .then((res) => {
                window.location.reload(false);
            })
            .catch((err) => console.log(err));

            window.location.reload(false);
    }

    const handleDecreaseCart = (cartItem, index) => {
        ApiClient.decreaseQuantity(userID, cartItem)
            .then((res) => {
                window.location.reload(false);
            })
            .catch((err) => console.log(err));
    }

    const handleIncreaseCart = (cartItem, index) => {
        ApiClient.increaseQuantity(userID, cartItem)
            .then((res) => {
                window.location.reload(false);
            })
            .catch((err) => console.log(err));
    }

    const handleClearCart = () => {
        ApiClient.clearCart(userID)
            .then((res) => {
                console.log(res);
                window.location.reload(false);
            })
            .catch((err) => console.log(err));

        window.location.reload(false);
    }

    return (
        <div className="cart-container">
            <h2>{t("ShoppingCart")}</h2>
            {
                cart.myShoppingCart?.length === 0 ? (
                    <div className="cart-empty">
                        <p>{t("EmptyCart")}</p>
                    </div>
                ) : (
                    <div>
                        <div className="titles">
                            <h3 className="product-title">{t("Product")}</h3>
                            <h3 className="shop">{t("Shop")}</h3>
                            <h3 className="price">{t("Price")}</h3>
                            <h3 className="quantity">{t("Quantity")}</h3>
                            <h3 className="total">{t("Total")}</h3>
                        </div>
                        <div className="cart-items">

                            {cart.myShoppingCart && cart.myShoppingCart.map((cartItem, index) => (<div className="cart-item" key={cartItem.id}>
                                <div className="cart-product">
                                    <img src={cartItem.image.url} alt={cartItem.name} />
                                    <div>
                                        <h3>{cartItem.name}</h3>
                                        <p>{cartItem.description}</p>
                                        <button onClick={() => handleRemoveFromCart(cartItem)}>{t("Remove")}</button>
                                    </div>
                                </div>
                                <div className="cart-product-shop">{cartItem.businessName}</div>
                                <div className="cart-product-price">₪{cartItem.price}</div>
                                <div className="cart-product-quantity">
                                    <button onClick={() => handleDecreaseCart(cartItem, index)}>-</button>
                                    <div className="count">{cartItem.quantity}</div>
                                    <button onClick={() => handleIncreaseCart(cartItem, index)}>+</button>
                                </div>
                                <div className="cart-product-total-price">
                                    ₪{cartItem.price * cartItem.quantity}
                                </div>
                            </div>))}
                        </div>
                        <div className="cart-summary">
                            <button className="clear-btn" onClick={() => handleClearCart()}>{t("ClearCart")}</button>
                            <div className="cart-checkout">
                                <div className="subtotal">
                                    <span>{t("Subtotal")}</span>
                                    <span className="amount">₪{totalPrice}</span>
                                </div>
                                <p>{t("Taxes")}</p>
                                <button>{t("CheckOut")}</button>
                                {/* <div className="continue-shopping">
                                    <Link>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                                        </svg>
                                        <span>Continue Shopping</span>
                                    </Link>
                                </div> */}
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
