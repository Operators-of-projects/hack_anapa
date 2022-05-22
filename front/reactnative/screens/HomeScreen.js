import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar,
} from "react-native";
import styled from "styled-components/native";
import Card from "../components/Card";
import Logo from "../components/Logo";
import Shops from "../components/Shop";
import Menu from "../components/Menu";
import { connect } from "react-redux";
import React from "react";
import Avatar from "../components/Avatar";
import axios from "axios";
import { baseUrl } from "../config";

function mapStateToProps(state) {
  return { action: state.action, name: state.name };
}

function mapDispatchToProps(dispatch) {
  return {
    openMenu: () =>
      dispatch({
        type: "OPEN_MENU",
      }),
  };
}

class HomeScreen extends React.Component {
  state = {
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1),
    userBalance: 0,
    vendors: [],
  };
  componentDidUpdate() {
    this.toggleMenu();
  }

  async componentDidMount() {
    StatusBar.setBarStyle("dark-content", true);
    try {
      const response = await axios.get(`${baseUrl}/api/vendors`);
      
      console.log(response.data);
      const clientres = await axios.get(baseUrl + "/api/client/1")
      console.log(clientres.data.balance)
      this.setState({
        vendors: response.data,
        userBalance: clientres.data.balance
      })
      
    } catch (error) {
      console.log(error);
    }
  }

  toggleMenu = () => {
    if (this.props.action == "openMenu") {
      Animated.timing(this.state.scale, {
        toValue: 0.9,
        duration: 300,
        easing: Easing.in(),
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 0.5,
      }).start();

      StatusBar.setBarStyle("light-content", true);
    }

    if (this.props.action == "closeMenu") {
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: 300,
        easing: Easing.in(),
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 1,
      }).start();
      StatusBar.setBarStyle("dark-content", true);
    }
  };
  render() {
    return (
      <RootView>
        <Menu />
        <AnimatedContainer
          style={{
            transform: [{ scale: this.state.scale }],
            opacity: this.state.opacity,
            flex: 1,
          }}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <ScrollView >
              <TitleBar>
                <TouchableOpacity
                  onPress={this.props.openMenu}
                  style={{ position: "absolute", top: 0, left: 20 }}
                >
                  <Avatar />
                </TouchableOpacity>
                <Title>Добро пожаловать,</Title>
                <Name>Иван</Name>
                <Balance>{this.state.userBalance}</Balance>
              </TitleBar>
              <ScrollView
                style={{
                  flexDirection: "row",
                  padding: 20,
                  paddingLeft: 12,
                  paddingTop: 30,
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                {logos.map((logo, index) => (
                  <Logo image={logo.image} text={logo.text} key={index} />
                ))}
              </ScrollView>
              <Subtitle>Акции</Subtitle>
              <ScrollView
                horizontal
                style={{ paddingBottom: 30 }}
                showsHorizontalScrollIndicator={false}
              >
                {cards.map((card, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      this.props.navigation.push("Section", {
                        section: card,
                      });
                    }}
                  >
                    <Card
                      title={card.title}
                      image={card.image}
                      caption={card.caption}
                      logo={card.logo}
                      subtitle={card.subtitle}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <Subtitle>Магазины поблизости</Subtitle>
              {this.state.vendors.map((shop, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    this.props.navigation.push("Catalog", {
                      catalog: shop,
                    });
                  }}
                >
                  <Shops
                    key={index}
                    image={`${baseUrl}${shop.photo}`}
                    title={shop.name}
                    subtitle={shop.description}
                    logo={shop.logo}
                    author={shop.author}
                    avatar={shop.avatar}
                    caption={shop.caption}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </SafeAreaView>
        </AnimatedContainer>
      </RootView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const RootView = styled.View`
  background: black;
  flex: 1;
`;

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-top: 20px;
  margin-left: 20px;
  text-transform: uppercase;
`;

const Container = styled.View`
  /* flex: 1; */
  background-color: #f0f3f5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  /* justify-content: center;
  align-items: center; */
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Title = styled.Text`
  font-size: 16px;
  color: #000000;// #b8bece;
  font-weight: 500;
`;

const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;

const TitleBar = styled.View`
  width: 100%;
  margin-top: 50px;
  padding-left: 80px;
`;

const Balance = styled.Text`
font-size: 25px;
position: absolute;
right: 20; 
top: 5;
`

const logos = [
  {
    image: "caret-down-outline",
    text: "Оплата -100",
  },
  {
    image: "caret-up-outline",
    text: "Возврат +50",
  },
  {
    image: "caret-down-outline",
    text: "Оплата -122",
  },
  {
    image: "caret-down-outline",
    text: "Оплата -650",
  },
  {
    image: "caret-up-outline",
    text: "Пополнение +5000",
  },
  {
    image: "caret-up-outline",
    text: "Пополнение +50",
  },
  {
    image: "caret-up-outline",
    text: "Пополнение +1",
  },
];

const cards = [
  {
    title: "Шаурмичная",
    image: require("../assets/bg1.jpg"),
    subtitle: "1 м",
    caption: "2 шаурмы по цене 1ой",
    logo: "navigate-circle-outline",
    content: "Только сегодня в честь дня города 2 шаурмы по цене одной. Предложение не доступно в ресторанах, располагающихся на территории аэропортов, а также военных частей."
  },
  {
    title: "Пирожки от дяди Васи",
    image: require("../assets/bg2.jpg"),
    subtitle: "65 м",
    caption: "300 баллов в подарок",
    logo: "navigate-circle-outline",
    content: "В честь скорого праздника, предложение не распространяется на физических и юридических лиц старше 18 лет"
  },
  {
    title: "Донер Кебаб",
    image: require("../assets/bg3.jpg"),
    subtitle: "300 м",
    caption: "Special: Хачапури с моцареллой",
    logo: "navigate-circle-outline",
    content: "Специальное предложение - лучшие санкционные сыры у вашего дома. Хачапури с моцареллой выгодно отличается от остальных хачапури. Лучше только хачапури с рокфором, но это предложение зарезервировано на следующую пятницу 13"
  },
];

const shops = [
  {
    title: "KFC",
    subtitle: "20.05.2022",
    image: require("../assets/background13.jpg"),
    logo: require("../assets/logo-studio.png"),
    author: "Новости Анапы",
    avatar: require("../assets/avatar.jpg"),
    caption: "В июле откроется самый большой аквапарк на юге России",
  },
]

const courses = [
  {
    title: "В Анапе открылся виртуальный концертный зал",
    subtitle: "20.05.2022",
    image: require("../assets/background13.jpg"),
    logo: require("../assets/logo-studio.png"),
    author: "Новости Анапы",
    avatar: require("../assets/avatar.jpg"),
    caption: "В июле откроется самый большой аквапарк на юге России",
  },
  {
    title: "Молодёжь Анапы может подать заявку на стипендию администрации Краснодарского края",
    subtitle: "21.05.2022",
    image: require("../assets/background11.jpg"),
    logo: require("../assets/logo-react.png"),
    author: "Технополис Эра",
    avatar: require("../assets/avatar.jpg"),
    caption: "Начался прием заявок на ежегодный краевой конкурс на соискание специальной молодежной стипендии администрации края.",
  },
  {
    title: "Design and code with Framer X",
    subtitle: "10 sections",
    image: require("../assets/background14.jpg"),
    logo: require("../assets/logo-framerx.png"),
    author: "Pavel",
    avatar: require("../assets/avatar.jpg"),
    caption: "Create powerful design and code components for your app",
  },
  {
    title: "Design Systems in Figma",
    subtitle: "10 sections",
    image: require("../assets/background6.jpg"),
    logo: require("../assets/logo-figma.png"),
    author: "Yura",
    avatar: require("../assets/avatar.jpg"),
    caption:
      "Complete guide to designing a site using a colaborative design tool",
  },
];
