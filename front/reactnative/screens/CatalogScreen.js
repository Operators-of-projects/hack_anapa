import React from "react";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity, StatusBar } from "react-native";
import { ScrollView, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

class CatalogScreen extends React.Component {
    static navigationOptions = {
        title: "Catalog",
    };

    componentDidMount() {
        StatusBar.setBarStyle("light-content", true);
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
                        <Image source={catalog.image} />
                        <Wrapper>
                            <Logo source={catalog.logo} />
                            <Subtitle>{catalog.subtitle}</Subtitle>
                        </Wrapper>
                        <Title>{catalog.title}</Title>
                        <Caption>{catalog.caption}</Caption>
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
                        {products.map(product => <Product key={product.name}>
                            <ProductImage source={{ uri: "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg" }} />
                            <ProductContent>
                                <ProductName>{product.name}</ProductName>
                                <ProductDescr>{product.price}</ProductDescr>
                            </ProductContent>
                        </Product>)}

                    </Content>
                </Container>
            </ScrollView>
        );
    }
}

export default CatalogScreen;

const Product = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #e5e7eb;
`

const ProductContent = styled.View`
    flex-direction: column;
    justify-content: space-around;
`

const ProductName = styled.Text`
    font-weight: 600;
    font-size: 22px;
    color: #111827;
    width: 180px;
    text-align: right;
`
const ProductDescr = styled.Text`
    font-size: 20;
    margin-left: auto;
    color: #111827;
`

const ProductImage = styled.Image`
    height: 120px;
    width: 120px;
    flex-shrink: 0;
    overflow: hidden;
    border-radius: 10px;
    border: 1px solid #e5e7eb;
`

const Card = styled.View`

`

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
]

const Content = styled.View`
padding: 20px;
font-size: 25px;
line-height: 30;
`

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
  color: white;
  font-weight: bold;
  width: 170px;
  position: absolute;
  top: 70px;
  left: 20px;
`;

const Caption = styled.Text`
  color: white;
  font-size: 17px;
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
