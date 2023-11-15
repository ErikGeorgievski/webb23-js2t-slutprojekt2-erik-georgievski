import React, { useEffect } from 'react';
import img from './img/logo.png';


export default function Navbar({ isCartOpen, setIsCartOpen, numItemsInCart }) {
  console.log('Rendering Navbar with numItemsInCart:', numItemsInCart);

  useEffect(() => {
    console.log('numItemsInCart updated:', numItemsInCart);
  }, [numItemsInCart]);

  return (
    <div>
      <header className="App-header">
        <img className='logo-img' src={img} alt="ElectroElegance Logo" />
        <h1 className='namn'>ElectroElegance</h1>
      </header>

      <div className="shopping-cart">
        <marquee behavior="" direction="">
          🌟 Black Friday hos ElectroElegance! 🌟 Slå till på årets bästa erbjudanden hos
          ElectroElegance den här Black Friday! 🎉 Våra Black Friday Erbjudanden: 🎉
          Upp till 40% rabatt på utvalda laptops och smartwatches!, Gratis frakt för alla beställningar
          inom Sverige!  Exklusiva gåvor med ditt köp  bara för Black Friday!✨ ElectroElegance - Framtidens Teknik Med Elegans! ✨
        </marquee>
        <div className="cart-icon" onClick={() => setIsCartOpen(!isCartOpen)}>
  🛒 {numItemsInCart > 0 && <span className="cart-count">{numItemsInCart}</span>}
</div>

      </div>
    </div>
  );
}
