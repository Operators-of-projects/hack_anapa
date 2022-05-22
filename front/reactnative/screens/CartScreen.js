import React from "react";
import styled from "styled-components/native";
import { View, StyleSheet, Modal, Pressable, Alert } from "react-native";
import axios from "axios";
import { baseUrl } from "../config";
import { connect } from "react-redux";
import ProductItem from "../components/Product";
import Ionicons from "@expo/vector-icons/Ionicons";

function mapStateToProps(state) {
  return {
    cart: state.cart,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clearCart: () =>
      dispatch({
        type: "CLEAR_CART",
      }),
    setModal: (modal) =>
      dispatch({
        type: "SET_MODAL",
        modal,
      }),
    resetModal: () =>
      dispatch({
        type: "RESET_MODAL",
      }),
  };
}

class CartScreen extends React.Component {
  static navigationOptions = {
    title: "Cart",
  };
  state = {
    orders: [],
    products: [],
    vendors: [],
    modalVisible: false,
  };
  async makeOrder() {
    const resp = await axios.post(baseUrl + "/api/create-transaction/", {
      vendor_id: 1,
      products: [1],
      client_id: 1,
    });
    console.log(resp.data);
  }
  async seeOrders() {
    const vendorId = 1;
    const resp = await axios.get(
      baseUrl + `/api/vendor/${vendorId}/transactions`
    );
    console.log(resp.data);
    this.setState({ orders: resp.data });
  }
  async seeProducts() {
    const vendorId = 1;
    const resp = await axios.get(baseUrl + `/api/vendor/${vendorId}/products`);
    console.log(resp.data);
    this.setState({ products: resp.data });
  }
  async seeVendors() {
    const resp = await axios.get(baseUrl + `/api/vendors`);
    console.log(resp.data);
    this.setState({ vendors: resp.data });
  }
  async confirmOrder() {
    const resp = await axios.put(baseUrl + `/api/transaction/17/`, {
      status: 3,
    });
    console.log(resp.status);
  }
  handleSubmit = async () => {
    try {
      if (this.props.cart.length === 0) return;
      const vendorId = this.props.cart[0].vendor;
      const filteredProducts = new Set(
        this.props.cart
          .filter((product) => product.vendor === vendorId)
          .map((product) => product.id)
      );
      const response = await axios.post(baseUrl + `/api/create-transaction/`, {
        vendor_id: vendorId,
        products: Array.from(filteredProducts),
        client_id: 1,
      });
      this.props.clearCart();
      this.props.setModal({
        message:
          "Информация передана поставщику, дождитесь подтверждения заказа",
        icon: "time-outline",
        iconColor: "orange",
        closeMsg: "Продолжить",
      });

      const tx = response.data;
      console.log(tx);

      function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }

      let approved = false;
      while (!approved) {
        const appres = await axios.get(
          baseUrl + "/api/transaction/" + tx.trasaction_id
        );
        await sleep(2500);
        approved = appres.data.response == 2;
        console.log(appres.data.response);
      }
      console.log(response.data);

      this.props.setModal({
        message:
          "Заказ подтвержден, ожидайте продавца",
        icon: "checkmark-outline",
        iconColor: "green",
      });
      await sleep(2500);
      this.props.resetModal();
      this.props.navigation.push("Home");
    } catch (err) {
      console.log(err);
    }
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  render() {
    const { modalVisible } = this.state;
    return (
      <Container>
        {/* <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Ionicons
                name="time-outline"
                size={120}
                style={{ color: "orange" }}
              />
              <Text style={styles.modalText}>
                Информация передана поставщику, дождитесь подтверждения заказа
              </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Понятно</Text>
              </Pressable>
            </View>
          </View>
        </Modal> */}
        <Content>
          {this.props.cart &&
            this.props.cart.map((product, i) => (
              <ProductItem
                key={i}
                onPress={() => {}}
                onDelete={true}
                product={product}
              />
            ))}
        </Content>
        <Button title="Сделать заказ" onPress={this.handleSubmit} />

        {/* <Text>Cart Screen</Text>
        {this.state.orders.map((o, index) => (
          <Text key={index}>{o.cost}</Text>
        ))}
        {this.state.products.map((p, i) => (
          <Image key={i} source={{ uri: baseUrl + p.img }} />
        ))}
        {this.state.vendors.map((p, i) => (
          <Image key={i} source={{ uri: baseUrl + p.photo }} />
        ))}
        <Button title="Close" onPress={() => this.props.navigation.goBack()} />
        <Button title="Make order" onPress={() => this.makeOrder()} />
        <Button title="See orders" onPress={() => this.seeOrders()} />
        <Button title="See products" onPress={() => this.seeProducts()} />
        <Button title="See vendors" onPress={() => this.seeVendors()} />
        <Button title="Confirm order" onPress={() => this.confirmOrder()} /> */}
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

const Button = styled.Button`
  height: 60px;
`;

const Content = styled.View`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
`;

const Text = styled.Text``;

const Image = styled.Image`
  width: 200px;
  height: 200px;
`;
