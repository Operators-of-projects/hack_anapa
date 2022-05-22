import { Modal, Alert, Pressable, Text, StyleSheet, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    modal: state.modal,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetModal: () =>
      dispatch({
        type: "RESET_MODAL",
      }),
  };
}

const GlobalModal = (props) => {
  const { modal } = props;
  console.log(modal)
  if (!modal) return null;
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modal && !modal.hidden}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        // this.props.resetModal();
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Ionicons
            name={modal && modal.icon}
            size={120}
            style={{ color: modal && modal.iconColor }}
          />
          <Text style={styles.modalText}>{modal && modal.message}</Text>
          {/* <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => props.resetModal()}
          >
            <Text style={styles.textStyle}>{modal && modal.closeMsg}</Text>
          </Pressable> */}
        </View>
      </View>
    </Modal>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalModal);

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
