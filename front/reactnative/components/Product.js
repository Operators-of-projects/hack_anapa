import React from "react";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity  } from "react-native";
import { baseUrl } from "../config";

const ProductItem = (props) => (
  <Product key={props.product.name}>
    <ProductImage
      source={{ uri: `${baseUrl}${props.product.img}` }}
    />
    <ProductContent>
      <ProductName>{props.product.name}</ProductName>
      <Group>
      <TouchableOpacity onPress={props.onPress} sty>
        <ProductBuyBtn>
          <ProductCart>
            <Ionicons name="cart-outline" size={22} />
          </ProductCart>
          <ProductPrice>{props.product.price}</ProductPrice>
        </ProductBuyBtn>
      </TouchableOpacity>
      {props.onDelete && (<TouchableOpacity onPress={props.onPress}>
        <ProductBuyBtn>
          <ProductDelete>
            <Ionicons name="trash-outline" size={22} />
          </ProductDelete>
        </ProductBuyBtn>
      </TouchableOpacity>)}
      </Group>
    </ProductContent>
  </Product>
);

export default ProductItem
const Group = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`

const Product = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  border-color: #e5e7eb;
  border-bottom-width: 1px;
`;

const ProductContent = styled.View`
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.Text`
  font-weight: 600;
  font-size: 22px;
  color: #111827;
  width: 180px;
  text-align: right;
`;
const ProductBuyBtn = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: auto;
  background-color: #6b7280;
  padding: 5px 10px;
  border-radius: 3px;
  margin-left: 10px;
`;

const ProductPrice = styled.Text`
  color: #f9fafb;
  font-size: 20;
`;

const ProductCart = styled.Text`
  color: #f9fafb;
  font-size: 20;
  padding-left: 5px;
`;

const ProductDelete = styled.Text`
    color: red;
    font-size: 20;

`

const ProductImage = styled.Image`
  height: 120px;
  width: 120px;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
`;