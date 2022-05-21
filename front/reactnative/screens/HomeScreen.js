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
import Shops from "../components/Course";
import Menu from "../components/Menu";
import { connect } from "react-redux";
import React from "react";
import Avatar from "../components/Avatar";
import Ionicons from "@expo/vector-icons/Ionicons";
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
  };
  componentDidUpdate() {
    this.toggleMenu();
  }

  async componentDidMount() {
    StatusBar.setBarStyle("dark-content", true);
    // try {
    //   const response = await axios.get(`${baseUrl}/api/client/1`);
    //   console.log(response.data);
    // } catch (error) {
    //   console.log(error);
    // }
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
            <ScrollView>
              <TitleBar>
                <TouchableOpacity
                  onPress={this.props.openMenu}
                  style={{ position: "absolute", top: 0, left: 20 }}
                >
                  <Avatar />
                </TouchableOpacity>
                <Title>Добро пожаловать,</Title>
                <Name>Иван</Name>
                <Balance>150</Balance>
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
              {courses.map((shop, index) => (
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
                    image={shop.image}
                    title={shop.title}
                    subtitle={shop.subtitle}
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
  color: #b8bece;
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
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse in massa non nisl tempor lobortis. Aliquam a nisi fermentum mauris imperdiet faucibus eget a elit. Duis scelerisque cursus nibh at ultrices. Vestibulum ac elit elementum, lacinia urna id, viverra ex. Suspendisse vel ornare nibh, ut tempus lacus. In lobortis porttitor ex vitae blandit. Aliquam tempor urna sit amet consectetur maximus. Nunc tristique turpis et viverra pulvinar. Fusce faucibus quam ac felis interdum, vehicula mattis sapien iaculis. Curabitur vitae orci diam. Aenean in pellentesque augue, sit amet tempus risus. Morbi id ultricies dolor, eget pellentesque felis. Fusce pharetra, ipsum at pulvinar volutpat, neque magna porttitor ante, id cursus sem felis eget felis. Nullam aliquam, lectus consectetur tincidunt consequat, ante augue mattis felis, sit amet interdum lorem ligula sollicitudin metus."
  },
  {
    title: "Пирожки от дяди Васи",
    image: require("../assets/bg2.jpg"),
    subtitle: "65 м",
    caption: "300 баллов в подарок",
    logo: "navigate-circle-outline",
    content: "Quisque maximus, nisi vitae sodales mollis, velit orci porta ex, ac vulputate erat dolor eget massa. Nulla at sem erat. Etiam pellentesque velit non massa condimentum iaculis. Vestibulum id consectetur ex, sed sodales nunc. Vivamus pretium condimentum pharetra. Morbi ac nibh risus. Pellentesque non odio sem. Fusce egestas libero ut ultrices euismod. Morbi condimentum faucibus eros eget consectetur. Praesent eu ullamcorper dui. Quisque congue purus ipsum, ut ullamcorper risus ultrices non. Aliquam fringilla tellus in feugiat lacinia. Quisque sed accumsan diam, in suscipit libero. Aliquam at erat vitae eros malesuada viverra. Morbi consequat aliquam felis, eget fringilla dolor dictum vel."
  },
  {
    title: "Донер Кебаб",
    image: require("../assets/bg3.jpg"),
    subtitle: "300 м",
    caption: "Special: Хачапури с моцареллой",
    logo: "navigate-circle-outline",
    content: "Vestibulum id interdum tellus, venenatis placerat odio. Donec ultrices, odio non hendrerit ultricies, turpis massa bibendum magna, vitae varius odio eros nec turpis. In convallis nisi dui, quis tincidunt felis pharetra ut. Phasellus malesuada volutpat pharetra. Suspendisse lacus dui, mollis eu mauris quis, ornare pellentesque augue. Suspendisse malesuada lorem at ligula viverra, ut congue libero lobortis. Integer nec lectus porta, tristique dolor non, dignissim leo. Fusce malesuada imperdiet arcu, quis sagittis lectus mattis vitae. Curabitur sed ornare urna. Suspendisse mi eros, blandit non nisl at, semper efficitur velit. Vivamus lobortis mattis leo, quis aliquet arcu ultrices eget. Fusce nec neque magna. Nunc sit amet lacus nunc. Morbi eget risus at eros bibendum egestas pretium vitae dolor. Ut vestibulum dolor sit amet tortor mollis, iaculis accumsan lorem venenatis. Nullam porta ac lectus vel malesuada."
  },
  {
    title: "Чебупельная",
    image: require("../assets/background14.jpg"),
    subtitle: "600 м",
    caption: "4 of 12 sections",
    logo: "navigate-circle-outline",
    content: "Integer eu dolor et ipsum ultricies convallis a eget justo. Aliquam cursus fringilla mauris, vitae blandit sapien porta blandit. Nulla facilisi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec ornare, ex sed egestas aliquam, nisi purus ullamcorper tortor, quis convallis lectus mi sit amet dui. Fusce purus velit, suscipit vitae sagittis sit amet, imperdiet non nunc. Sed varius accumsan lectus non ullamcorper. Proin efficitur tellus dapibus volutpat imperdiet. Sed feugiat felis velit, non luctus lorem tempor nec. Etiam dignissim velit sit amet eros auctor ultricies."
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
