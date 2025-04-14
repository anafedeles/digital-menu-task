import React, { useState } from 'react';
import { menuData, MenuCategory, Product } from '../data/menuData';  
import ProductCard from '../components/ProductCard'; 
import { useNavigate } from 'react-router-dom';
import { Dropdown, ButtonGroup } from 'react-bootstrap'; 

import ukflag from "../images/uk.jpg"; 
import roflag from "../images/ro.jpg"; 

const Menu: React.FC = () => {
  const navigate = useNavigate();  
  const [selectedCategory, setSelectedCategory] = useState<string>('All'); 
  const [order, setOrder] = useState<{ product: Product, quantity: number }[]>([]); 
  const [isCartVisible, setIsCartVisible] = useState<boolean>(false); 
  const [searchTerm, setSearchTerm] = useState<string>('');  
  const [sortOrder, setSortOrder] = useState<string>('asc');  

  const [lang, setLang] = useState("en"); 
  const [langLabel, setLangLabel] = useState(
    <div className="flex items-center">
      <img src={ukflag} width="20" alt="UK Flag" />
      <span className="ml-2">English</span>
    </div>
  ); 

  const options = [
    {
      value: "en",
      label: (
        <div className="flex items-center">
          <img src={ukflag} width="20" alt="UK Flag" />
          <span className="ml-2">English</span>
        </div>
      )
    },
    {
      value: "ro",
      label: (
        <div className="flex items-center">
          <img src={roflag} width="20" alt="Romania Flag" />
          <span className="ml-2">Română</span>
        </div>
      )
    }
  ];

  function handleClick(n: number) {
    setLangLabel(options[n].label);
    setLang(options[n].value);
  }

  const filteredData = selectedCategory === 'All'
    ? menuData
    : menuData.filter((category) => category.category === selectedCategory);

  const searchedData = filteredData.map((category) => ({
    ...category,
    products: category.products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  const sortedData = searchedData.map((category) => ({
    ...category,
    products: category.products.sort((a, b) =>
      sortOrder === 'asc'
        ? a.price - b.price
        : b.price - a.price
    ),
  }));

  const addToOrder = (product: Product) => {
    setOrder((prevOrder) => {
      const existingProduct = prevOrder.find((item) => item.product.id === product.id);
      if (existingProduct) {
        return prevOrder.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevOrder, { product, quantity: 1 }];
      }
    });
  };

  const removeFromOrder = (productId: string) => {
    setOrder((prevOrder) => prevOrder.filter((item) => item.product.id !== productId));
  };

  const changeQuantity = (productId: string, amount: number) => {
    setOrder((prevOrder) =>
      prevOrder.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(item.quantity + amount, 1) }  
          : item
      )
    );
  };

  const totalPrice = order.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="p-6 pt-40">
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-10 p-4 flex justify-between items-center">
        <button
          onClick={goToHome}
          className="bg-orange-400 text-white p-2 rounded-full"
        >
          🔙 Home
        </button>

        <Dropdown as={ButtonGroup} className="absolute top-4 right-4">
          <Dropdown.Toggle
            className="bg-transparent btn-outline-secondary border-0 p-3 text-lg"
            id="lng-dropdown"
          >
            {langLabel}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleClick(0)}>
              {options[0].label}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick(1)}>
              {options[1].label}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <button
          onClick={() => setIsCartVisible(!isCartVisible)}  
          className="bg-orange-400 text-white p-2 rounded-full"
        >
          🛒 Cart ({order.length})  
        </button>
      </div>

      {isCartVisible && (
        <div className="absolute top-16 right-0 mt-2 bg-white shadow-md rounded-lg w-80 p-4 z-20">
          <h3 className="text-lg font-semibold mb-4">{lang === "en" ? "Order Summary" : "Rezumatul Comenzii"}</h3>
          <ul className="space-y-2">
            {order.map((item) => (
              <li key={item.product.id} className="flex justify-between items-center">
                <span>{item.product.name} - {item.quantity} x ${item.product.price.toFixed(2)}</span>
                <div className="flex items-center space-x-2">
                  <button onClick={() => changeQuantity(item.product.id, 1)} className="text-green-500">+</button>
                  <button onClick={() => changeQuantity(item.product.id, -1)} className="text-red-500">-</button>
                  <button onClick={() => removeFromOrder(item.product.id)} className="text-red-500">🗑️</button>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-semibold">
            Total: ${totalPrice.toFixed(2)}
          </p>
        </div>
      )}

      <h1 className="text-5xl font-bold text-center text-orange-600 mb-6 animate__animated animate__fadeInDown">
        {lang === "en" ? "Digital Menu" : "Meniu Digital"}
      </h1>

      <div className="flex gap-4 mb-6 justify-center">
        <input
          type="text"
          className="border p-2 rounded w-1/3"
          placeholder={lang === "en" ? "Search products by name" : "Căutați produsele după nume"}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}  
        />

        <select
          className="border p-2 rounded w-1/3"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}  
        >
          <option value="asc">{lang === "en" ? "Sort by Price (Low to High)" : "Sortare după preț (Mic la mare)"}</option>
          <option value="desc">{lang === "en" ? "Sort by Price (High to Low)" : "Sortare după preț (Mare la mic)"}</option>
        </select>

        <select
          className="border p-2 rounded w-1/3"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">{lang === "en" ? "All" : "Toate"}</option>
          {menuData.map((category: MenuCategory) => (
            <option key={category.id} value={category.category}>
              {category.category}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {sortedData.map((category: MenuCategory) => (
          <div key={category.id} className="mb-8 w-full">
            <h2 className="text-3xl font-semibold text-center text-orange-600 mb-4">{category.category}</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {category.products.map((product: Product) => (
                <ProductCard key={product.id} product={product} onAddToOrder={addToOrder} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <footer className="bg-orange-500 text-white text-center py-6 mt-8">
        <p className="text-xl">&copy; 2025 Digital Menu. All Rights Reserved.</p>
        <p className="text-sm">{lang === "en" ? "Follow us on social media for the latest updates!" : "Urmăriți-ne pe rețelele sociale pentru ultimele noutăți!"}</p>
      </footer>
    </div>
  );
};

export default Menu;
