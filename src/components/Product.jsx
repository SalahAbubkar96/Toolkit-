import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice";
import { getProducts } from "../store/productSlice";

import StatusCode from "../utlis/StatusCode";

const Product = () => {
  const dispatch = useDispatch();

  const { data: products, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  if (status === StatusCode.LOADING) {
    return <p>loading....</p>;
  }
  if (status === StatusCode.ERROR) {
    return <p>Someting went wrong! Try again later</p>;
  }

  const addToCart = (product) => {
    console.log("product", product);
    dispatch(add(product));
  };

  const cards = products.map((product) => (
    <div className="col-md-8" style={{ marginBottom: "10px" }}>
      <Card key={product.id} className="h-100">
        <div className="text-center">
          <Card.Img
            variant="top"
            src={product.image}
            style={{ width: "100px", height: "130px" }}
          />
        </div>
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>INR: {product.price}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button variant="success" onClick={() => addToCart(product)}>
            Add Item
          </Button>
        </Card.Footer>
      </Card>
    </div>
  ));
  return (
    <>
      <h>Product Dashboard</h>
      {cards}
    </>
  );
};

export default Product;
