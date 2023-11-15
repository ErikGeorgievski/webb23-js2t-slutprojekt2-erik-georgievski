import React, { useState, useEffect } from 'react';
import ShoppingCart from './ShoppingCart';
import SearchBar from './SearchBar';
import Product from './Product';
import Navbar from './Navbar';

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [showDescription, setShowDescription] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [okMessage, setOkMessage] = useState('');
  const [statusPurchase, setStatusPurchase] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  
  const numItemsInCart = Object.values(cart).reduce((acc, qty) => acc + qty, 0);
   /*function för att hämta produktdatan från min backend http://localhost:3000/products. Om hämtningen är ok, uppdateras komponentens products-tillstånd med den hämtade datan. Om det uppstår något fel under hämtningen loggas felmeddelandet.*/
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('http://localhost:3000/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error('Error fetching products:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, [numItemsInCart]);

  const addToCart = (product) => {
     /*Kollar om produkten är tillgänglig i lagret och saldot är mer ån 0 (inventariet > 0)*/
    if (product.inventory > 0) {
      /* Kontrollera om antalet produkter som användaren vill lägga till inte överstiger lagersaldot */
      if (cart[product.id] === undefined || cart[product.id] < product.inventory) {
        setCart((prevCart) => {
          const updatedCart = { ...prevCart };
          updatedCart[product.id] = (updatedCart[product.id] || 0) + 1;
          setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price);
          return updatedCart;
        });
      } else {
        setOkMessage('Du kan inte lägga till fler av denna produkt i varukorgen.');
        setTimeout(() => {
          setOkMessage('');
        }, 3000);
      }
    } else {
      setOkMessage('Produkten är slutsåld.');
      setTimeout(() => {
        setOkMessage('');
      }, 3000);
    }
    
    
  };

  
/* funktion hanterar klickhändelsen för att visa eller dölja produktbeskrivningen genom att växla mellan true och false för den angivna produktens id i showDescription*/
  const handleClick = (productId) => {
    setShowDescription((prevState) => {
      const updatedDescription = { ...prevState };
      updatedDescription[productId] = !prevState[productId] || false;
      return updatedDescription;
    });
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
/*funktionen används för att sortera produkterna antingen stigande (asc) eller fallande (desc) efter deras pris och uppdateras komponentens products med de sorterade produkterna och sorteringsordningen sparas också.*/ 
  const sortProductsByPrice = (order) => {
    const sortedProducts = [...products];

    sortedProducts.sort((a, b) => {
      if (order === 'asc') {
        return a.price - b.price;
      } else if (order === 'desc') {
        return b.price - a.price;
      }

      return 0;
    });

    setProducts(sortedProducts);
    setSortOrder(order);
  };

  return (
    <div className="App">
      <Navbar
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        cart={cart}
        numItemsInCart={numItemsInCart}
        
        
      />

      <div className='shop'>
        <div className='varukorg'>
          {isCartOpen && (
            <ShoppingCart
              products={products}
              cart={cart}
              setCart={setCart}
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
              setOkMessage={setOkMessage}
              setStatusPurchase={setStatusPurchase}
              
            />
          )}
        </div>
      </div>
      <a href=".product-list">
        <h2 className='produkter'>Produkter</h2>
      </a>

      <div className="div01">
        <div className='search-bar'>
          <SearchBar searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
          <select onChange={(e) => sortProductsByPrice(e.target.value)}>
            <option value="">Sortera Pris</option>
            <option value="asc">Pris-Stigande</option>
            <option value="desc">Pris-Fallande</option>
          </select>
        </div>
      </div>
      {okMessage && <div className="ok-message">{okMessage}</div>}

      <div className="product-list">
        {filteredProducts.map((product) => (
          <Product
            key={product.id}
            product={product}
            addToCart={addToCart}
            handleClick={handleClick}
            showDescription={showDescription}
          />
        ))}
      </div>
    </div>
  );
}











