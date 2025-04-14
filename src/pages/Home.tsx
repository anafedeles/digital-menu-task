import React, { useState } from "react";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import ukflag from "../images/uk.jpg"; 
import roflag from "../images/ro.jpg"; 
import { useNavigate } from "react-router-dom";
import imagePath from "../images/food_image.png"; 

const Home: React.FC = () => {
  const navigate = useNavigate(); 

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

  const [lang, setLang] = useState("en");
  const [langLabel, setLangLabel] = useState(options[0].label);


  function handleClick(n: number) {
    setLangLabel(options[n].label);
    setLang(options[n].value);
  }

  
  const startOrder = () => {
    navigate("/menu");
  };

  return (
    <div className="min-h-screen bg-white text-black flex p-8 relative">
      
      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-8">
       
        <div className="w-full">
          <img
            src={imagePath} 
            alt="Delicious Dish"
            className="w-full h-full object-cover "
          />
        </div>

      
        <div className="flex flex-col justify-center items-start w-full">
          
          <div className="absolute top-4 right-4">
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle
                className="bg-transparent btn-outline-secondary border-0 p-2"
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
          </div>

          
          <h1 className="text-5xl font-bold mb-6 animate__animated animate__fadeInDown">
            {lang === "en" ? "Welcome to Expressoft Digital Menu!" : "Bun venit la Meniul Digital Expressoft!"}
          </h1>

         
          <p className="text-xl mb-6 animate__animated animate__fadeIn animate__delay-1s">
            {lang === "en"
              ? "Explore delicious dishes, order online, and enjoy your meal from the comfort of your home!"
              : "Explorează preparate delicioase, comandă online și bucură-te de masa ta din confortul casei!"}
          </p>

          
          <button
            onClick={startOrder}
            className="bg-orange-500 hover:bg-yellow-400 text-white font-bold py-3 px-6 rounded-lg text-2xl transition duration-300 transform hover:scale-105"
          >
            {lang === "en" ? "Start Order" : "Începe Comanda"}
          </button>

         
        </div>
      </div>
    </div>
  );
};

export default Home;
