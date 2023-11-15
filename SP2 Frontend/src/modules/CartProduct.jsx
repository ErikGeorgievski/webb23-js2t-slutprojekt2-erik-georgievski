import React from 'react';

export default function CartProduct({ product, removeFromCart, quantity }) {
  return (
    <div className="cart-item-korg">
      <img className='img-korg' src={product.image} alt={product.name} />
      <h3 className='name-korg'>{product.name}</h3>
      <p className='pris-korg'>Pris: {product.price}:-</p>
      <p>Antal: {quantity}</p>
      <button className='button-remove-korg' onClick={() => removeFromCart(product)}>Ta bort</button>
    </div>
  );
}
