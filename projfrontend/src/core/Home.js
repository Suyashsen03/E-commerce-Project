import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import "../styles.css";

import Base from "./Base";
import Card from "./Card";
import { getAllProducts } from "./helper/coreapicalls";

function Home() {
  const [products, setProducts] = useState([]);
  const preload = () => {
    getAllProducts().then((data) => {
      if (data.err) console.log(data.err);
      else setProducts(data.natija);
    });
  };

  useEffect(preload, []);

  return (
    <Base
      title="My Title"
      description="My description"
      className="bg-dark text-white p-4"
    >
      <div className="row text-center">
        {products &&
          products.map((element) => {
            return (
              <div className="col-4" key={element._id}>
                <Card
                  showAddToCart={true}
                  showRemoveFromCart={false}
                  name={element.name}
                  description={element.description}
                  price={element.price}
                  productId={element._id}
                  product={element}
                />
              </div>
            );
          })}
      </div>
    </Base>
  );
}

export default Home;
