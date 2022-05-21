import React from "react";
import styled from "styled-components/native";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    name: state.name,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateName: (name) =>
      dispatch({
        type: "UPDATE_NAME",
        name: name,
      }),
  };
}

class Avatar extends React.Component {
  state = {
    photo: require("../assets/avatar-default.jpg"),
  };
  componentDidMount() {
    // fetch("https://jsonplaceholder.typicode.com/users", {
    //   headers: new Headers({
    //     "X-API-KEY": "hi there",
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((response) => {
    //     response = "Наиль Исхаков";
    //     const obj = response;
    //     this.setState({
    //       photo: `https://ui-avatars.com/api/?name=${obj.split(" ").join("+")}`,
    //     });
    //     this.props.updateName(response);
    //   })
    //   .catch((err) => console.log(err));
  }
  render() {
    return <Image source={this.state.photo} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);

const Image = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
`;
