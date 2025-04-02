import {FC, useState} from 'react';
import {useCart} from '../../context/cart';
import {Link} from 'react-router-dom';

const Cart: FC = () => {
  const {items, removeFromCart, updateQuantity, total} = useCart();
  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });

  const shippingCost = 5.99;
  const tax = total * 0.18; // 18% tax
  const finalTotal = total + shippingCost + tax;

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('checkout');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically integrate with a payment processor
    alert('Order placed successfully!');
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link
          to="/"
          className="bg-grey-dark text-white font-medium px-4 py-2 rounded-[8px] transition hover:bg-black">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setStep('cart')}
          className={`px-4 py-2 rounded-lg ${
            step === 'cart'
              ? 'bg-my-blue text-white'
              : 'bg-gray-100 text-gray-600'
          }`}>
          Cart
        </button>
        <button
          onClick={() => setStep('checkout')}
          className={`px-4 py-2 rounded-lg ${
            step === 'checkout'
              ? 'bg-my-blue text-white'
              : 'bg-gray-100 text-gray-600'
          }`}>
          Checkout
        </button>
      </div>

      {step === 'cart' ? (
        <>
          <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
          <div className="grid gap-8">
            {items.map(item => (
              <div
                key={item._id}
                className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
                <img
                  src={`${import.meta.env.BASE_URL}${item.picture[0]}`}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-grey-dark">${item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <label>Quantity:</label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={e =>
                        updateQuantity(item._id, parseInt(e.target.value))
                      }
                      className="w-16 px-2 py-1 border rounded"
                    />
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:text-red-700">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (18%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setStep('checkout')}
              className="w-full bg-my-blue text-white font-medium px-6 py-3 rounded-[8px] transition hover:bg-blue-700 mt-6">
              Proceed to Checkout
            </button>
          </div>
        </>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
            <form onSubmit={handleAddressSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">Full Name</label>
                <input
                  type="text"
                  value={shippingAddress.fullName}
                  onChange={e =>
                    setShippingAddress({
                      ...shippingAddress,
                      fullName: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Address</label>
                <input
                  type="text"
                  value={shippingAddress.address}
                  onChange={e =>
                    setShippingAddress({
                      ...shippingAddress,
                      address: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">City</label>
                  <input
                    type="text"
                    value={shippingAddress.city}
                    onChange={e =>
                      setShippingAddress({
                        ...shippingAddress,
                        city: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">Postal Code</label>
                  <input
                    type="text"
                    value={shippingAddress.postalCode}
                    onChange={e =>
                      setShippingAddress({
                        ...shippingAddress,
                        postalCode: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block mb-1">Country</label>
                <input
                  type="text"
                  value={shippingAddress.country}
                  onChange={e =>
                    setShippingAddress({
                      ...shippingAddress,
                      country: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-my-blue text-white font-medium px-6 py-3 rounded-[8px] transition hover:bg-blue-700">
                Continue to Payment
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Payment Information</h2>
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">Payment Method</label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`flex-1 px-4 py-2 border rounded-lg ${
                      paymentMethod === 'card'
                        ? 'border-my-blue bg-blue-50'
                        : 'border-gray-200'
                    }`}>
                    Credit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`flex-1 px-4 py-2 border rounded-lg ${
                      paymentMethod === 'paypal'
                        ? 'border-my-blue bg-blue-50'
                        : 'border-gray-200'
                    }`}>
                    PayPal
                  </button>
                </div>
              </div>

              {paymentMethod === 'card' ? (
                <>
                  <div>
                    <label className="block mb-1">Card Number</label>
                    <input
                      type="text"
                      value={paymentInfo.cardNumber}
                      onChange={e =>
                        setPaymentInfo({
                          ...paymentInfo,
                          cardNumber: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1">Expiry Date</label>
                      <input
                        type="text"
                        value={paymentInfo.expiryDate}
                        onChange={e =>
                          setPaymentInfo({
                            ...paymentInfo,
                            expiryDate: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-1">CVV</label>
                      <input
                        type="text"
                        value={paymentInfo.cvv}
                        onChange={e =>
                          setPaymentInfo({...paymentInfo, cvv: e.target.value})
                        }
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      value={paymentInfo.cardName}
                      onChange={e =>
                        setPaymentInfo({
                          ...paymentInfo,
                          cardName: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border rounded-lg"
                      required
                    />
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">
                    You will be redirected to PayPal to complete your payment
                  </p>
                </div>
              )}

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (18%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-my-blue text-white font-medium px-6 py-3 rounded-[8px] transition hover:bg-blue-700">
                Place Order
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
