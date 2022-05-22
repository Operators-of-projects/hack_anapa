import React from "react";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity, StatusBar } from "react-native";
import { ScrollView } from "react-native";

class SectionScreen extends React.Component {
  static navigationOptions = {
    title: "Section",
  };

  componentDidMount() {
    StatusBar.setBarStyle("light-content", true);
  }

  componentWillUnmount() {
    StatusBar.setBarStyle("dark-content", true);
  }

  render() {
    const { navigation, route } = this.props;
    const { section } = route.params;
    return (
      <ScrollView style={{flex: 1}}>
      <Container>
        <StatusBar hidden />
        <Cover>
          <Image source={section.image} />
          <Wrapper>
            <Logo source={section.logo} />
            <Subtitle>{section.subtitle}</Subtitle>
          </Wrapper>
          <Title>{section.title}</Title>
          <Caption>{section.caption}</Caption>
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
          <Card>
            {section.content}
          </Card>
        </Content>
      </Container>
      </ScrollView>
    );
  }
}

export default SectionScreen;

const Card = styled.Text`

`

const products = [
  {
    name: "Шаверма классическая",
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
