import React from "react";
import {CONN} from "../../backend";
const ProductImage=(props)=>{
    return(
        <img
            src={`${CONN}products/image/${props.productId}`}
            alt="photoo"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
            className="mb-3 rounded"
          />
    )
}
export default ProductImage;
