import React from "react";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity, StatusBar } from "react-native";
import { ScrollView, Dimensions } from "react-native";
import { connect } from "react-redux";
import ProductItem from "../components/Product";
import { baseUrl } from "../config";
import axios from "axios";


const screenWidth = Dimensions.get("window").width;

function mapStateToProps(state) {
  return {
    cart: state.cart,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addItem: (item) =>
      dispatch({
        type: "ADD_ITEM_CART",
        item: item,
      }),
  };
}

class CatalogScreen extends React.Component {
  static navigationOptions = {
    title: "Catalog",
  };

  state = {
    products: []
  }

  async componentDidMount() {
    StatusBar.setBarStyle("light-content", true);
    try {
      const { catalog } = this.props.route.params;
      const vendorId = catalog.id;
      const response = await axios.get(`${baseUrl}/api/vendor/${vendorId}/products`);
      this.setState({
        products: response.data
      })
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  componentWillUnmount() {
    StatusBar.setBarStyle("dark-content", true);
  }

  render() {
    const { navigation, route } = this.props;
    const { catalog } = route.params;
    // key={index}
    // image={shop.image}
    // title={shop.title}
    // subtitle={shop.subtitle}
    // logo={shop.logo}
    // author={shop.author}
    // avatar={shop.avatar}
    // caption={shop.caption}
    return (
      <ScrollView style={{ flex: 1, background: "white" }}>
        <Container>
          <StatusBar hidden />
          <Cover>
            <Image source={{ uri: `${baseUrl}${catalog.photo}` }} />
            <Wrapper>
              <Logo source={catalog.logo} />
              <Subtitle>{catalog.subtitle}</Subtitle>
            </Wrapper>
            <Title>{catalog.name}</Title>
            <Caption>{catalog.description}</Caption>
          </Cover>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
            style={{ position: "absolute", top: 20, right: 20 }}
          >
            <CloseView>
              <Ionicons
                name="ios-close"
                size={36}
                color="#4775f2"
                style={{ marginTop: 0 }}
              />
            </CloseView>
          </TouchableOpacity>
          <Content>
            {this.state.products.map((product, i) => (
              <ProductItem
                key={i}
                onPress={() => this.props.addItem(product)}
                product={product}
              />
            ))}
          </Content>
        </Container>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CatalogScreen);

const Card = styled.View``;

const products = [
  {
    name: "Шаверма классическая fsfd",
    status: true,
    price: 140,
  },
  {
    name: "Шаверма по аджарски",
    status: true,
    price: 140,
  },
  {
    name: "Гирос",
    status: true,
    price: 160,
  },
  {
    name: "Гирос ФРИ",
    status: true,
    price: 170,
  },
];

const Content = styled.View`
  padding: 20px;
  font-size: 25px;
  line-height: 30;
`;

const Container = styled.View`
  flex: 1;
  background: white;
`;

const Cover = styled.View`
  height: 375px;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Title = styled.Text`
  font-size: 24px;
  color: #3c4560;
  font-weight: bold;
  width: 170px;
  position: absolute;
  top: 70px;
  left: 20px;
`;

const Caption = styled.Text`
  color: #3c4560;
  font-size: 20px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 300px;
`;

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.View`
  flex-direction: row;
  position: absolute;
  top: 40px;
  left: 20px;
  align-items: center;
`;
const Logo = styled.Image`
  width: 24px;
  height: 24px;
`;

const Subtitle = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  margin-left: 5px;
  text-transform: uppercase;
`;
