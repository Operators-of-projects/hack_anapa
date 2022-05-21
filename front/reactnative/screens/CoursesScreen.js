import React from "react";
import styled from "styled-components/native";
import { Button, View } from "react-native";
import axios from "axios";
import { baseUrl } from "../config";

class CoursesScren extends React.Component {
  static navigationOptions = {
    title: "Courses",
  };
  state = {
    orders: [],
    products: []
  }
  async makeOrder() {
    const resp = await axios.post(baseUrl + "/api/create-transaction/", {
      vendor_id: 1,
      products: [1],
      client_id: 1
    })
    console.log(resp.data)
  }
  async seeOrders() {
    const vendorId = 1
    const resp = await axios.get(baseUrl + `/api/vendor/${vendorId}/transactions`)
    console.log(resp.data)
    this.setState({orders: resp.data})
  }
  async seeProducts() {
    const vendorId = 1;
    const resp = await axios.get(baseUrl + `/api/vendor/${vendorId}/products`)
    console.log(resp.data)
    this.setState({products: resp.data})
  }
  render() {
    return (
      <Container>
        <Text>Cart Screen</Text>
        {this.state.orders.map((o, index) => <Text key={index}>{o.cost}</Text>)}
        {this.state.products.map((p, i) => <Text key={i}>{p.name}</Text>)}
        <Button title="Close" onPress={() => this.props.navigation.goBack()} />
        <Button title="Make order" onPress={() => this.makeOrder()} />
        <Button title="See orders" onPress={() => this.seeOrders()} />
        <Button title="See products" onPress={() => this.seeProducts()} />
      </Container>
    );
  }
}

export default CoursesScren;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;
