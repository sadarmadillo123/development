import "./App.css";
import Grid from "@mui/material/Grid"; // Grid version 1
import RadioButtonGroup from "./components/RadioButtonGroup";
import Checkbox from "./components/Checkbox";
import BakeryItem from "./components/BakeryItem";
import bakeryData from "./assets/bakery-data.json";
import { useState } from "react";

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [price, setPrice] = useState(0);
  const [sortCriteria, setSortCriteria] = useState("Popularity");

  /* Filtering Logic => on change triggers updateFilters => populates list of filters => bakeryData is filtered based on filters*/
  const [typeFilters, setTypeFilters] = useState([]);
  const [dietFilters, setDietFilters] = useState([]);
  const [filterMethods, setFilterMethods] = useState([]);

  function updateTypeFilters(filters) {
    let filterFuncList = [];
    for (let i = 0; i < filters.length; i++) {
      filterFuncList.push(matchesTypeFilter(filters[i]));
    }
    setTypeFilters(filterFuncList);
    setFilterMethods([...dietFilters].concat(filterFuncList));
  }

  function matchesTypeFilter(field) {
    const filterFieldFunc = (item) => {
      // All Items Shown
      if (field === "All") {
        return true;
      } else if (field === item.type) {
        return true;
      } else {
        return false;
      }
    };
    return filterFieldFunc;
  }

  function updateDietFilters(filters) {
    let filterFuncList = [];
    for (let i = 0; i < filters.length; i++) {
      if (filters[i] === "All") {
        continue;
      }
      filterFuncList.push(matchesDietFilter(filters[i]));
    }
    setDietFilters(filterFuncList);
    setFilterMethods([...typeFilters].concat(filterFuncList));
  }

  function matchesDietFilter(field) {
    const filterFieldFunc = (item) => {
      // All Items Shown
      if (field === "All") {
        return true;
      } else {
        return item.diet.includes(field);
      }
    };
    return filterFieldFunc;
  }

  function addToCart(item) {
    const resultCart = [];
    var seen = false;
    for (let i = 0; i < cartItems.length; i++) {
      resultCart[i] = cartItems[i];
      if (resultCart[i].name === item.name) {
        resultCart[i].count++;
        seen = true;
      }
    }
    if (!seen) {
      resultCart.push({ name: item.name, count: 1 });
    }

    setCartItems(resultCart);
    setPrice(price + item.price);
  }

  function removeFromCart(item) {
    const resultCart = [...cartItems];
    // Reverse Iterating to Prevent Deletion Issues
    for (let i = resultCart.length - 1; i >= 0; i--) {
      if (resultCart[i].name === item.name) {
        if (--resultCart[i].count === 0) {
          resultCart.splice(i, 1);
        }
        setPrice(price - item.price);
      }
    }
    setCartItems(resultCart);
  }
  /* Compare Func => Cart */
  function compareFunc(criteria) {
    if (criteria === "Popularity") {
      return function (a, b) {
        return b.popularity - a.popularity;
      };
    } else if (criteria === "Calories") {
      return function (a, b) {
        return a.calories - b.calories;
      };
    } else if (criteria === "Price") {
      return function (a, b) {
        return a.price - b.price;
      };
    }
  }

  function setCriteria(criteria) {
    setSortCriteria(criteria);
  }

  /* Sort Then Filter*/
  const sortedData = bakeryData.sort(compareFunc(sortCriteria));

  const filteredData = sortedData.filter((item) => {
    for (let i = 0; i < filterMethods.length; i++) {
      if (!filterMethods[i](item)) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="App">
      <header className="header">
        <h1 style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}>Josh's Sad Bakery</h1>
      </header>
      <div className="store-container">
        <div className="left-page">
          <h2 style={{ marginBottom: "0.5rem" }}>Filter Options</h2>
          <div className="left-page-box" id="filter-box">
            <div style={{ marginTop: "0.8rem" }} className="sort-group">
              <RadioButtonGroup setCriteria={setCriteria} />
            </div>
            <div className="sort-group">
              <Checkbox
                updateFilters={updateTypeFilters}
                formName="Types"
                value1="Bread"
                label1="Bread"
                value2="Pastry"
                label2="Pastry"
                value3="Cake"
                label3="Cake"
              />
            </div>
            <div className="sort-group">
              <Checkbox
                updateFilters={updateDietFilters}
                formName="Dietary Restrictions"
                value1="Gluten-free"
                label1="Gluten"
                value2="Dairy-free"
                label2="Dairy"
                value3="Nut-free"
                label3="Nut"
              />
            </div>
          </div>
          <h2 style={{ marginBottom: "0.5rem" }}>Your Cart</h2>
          <div className="left-page-box" id="cart-box">
            {cartItems.map((item, index) => (
              <p style={{ marginTop: "0.2rem", marginBottom: "0.2rem" }}>
                x{item.count} {item.name}
              </p>
            ))}

            <p style={{ marginTop: "0.2rem", marginBottom: "0.2rem" }}>
              <i>Total Price:</i> <b>${(Math.round(price * 100) / 100).toFixed(2)}</b>
            </p>
          </div>
        </div>
        <div className="right-page">
          <h2 style={{ marginBottom: "0.5rem" }}>Shop</h2>

          <Grid container rowSpacing={2} columnSpacing={4}>
            {filteredData.map((item) => (
              <BakeryItem
                item={item}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
              />
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default App;
