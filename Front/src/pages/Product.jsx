import React from 'react';
import { useShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrum from '../components/breadcrum/Breadcrum';
import Productdisplay from '../components/productdisplay/Productdisplay';
import DescriptionBox from '../components/descriptionbox/DescriptionBox';
import RelatedProducts from '../components/relatedproducts/RelatedProducts';

const Product = () => {
  const { all_product } = useShopContext();
  const { productId } = useParams();

  // Wait until products are fetched
  if (all_product.length === 0) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>Loading product...</div>;
  }

  // Find the product by ID
  const product = all_product.find((item) => item.id === Number(productId));

  // Handle invalid product ID
  if (!product) {
    return <div style={{ padding: '50px', textAlign: 'center', color: 'red' }}>Product not found.</div>;
  }

  // Render product details
  return (
    <>
      <Breadcrum product={product} />
      <Productdisplay product={product} />
      <DescriptionBox />
      <RelatedProducts />
    </>
  );
};

export default Product;
