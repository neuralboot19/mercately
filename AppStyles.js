import {StyleSheet} from 'react-native'

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F7',
    // alignItems: 'center',
    justifyContent: 'center',
    marginTop:30
  },
  containerLogin: {
    flex: 1,
    backgroundColor: '#F4F5F7',
    justifyContent: 'center',
  },
  circle: {
    width: 500,
    height: 500,
    borderRadius: 500 / 2,
    backgroundColor: "#FFF",
    position: "absolute",
    left: -120,
    top: -20
  },
  header: {
    fontWeight: "800",
    fontSize: 30,
    color: "#514E5A",
  },
  descriptionText: {
    fontSize: 14,
    color: "#514E5A"
  },
  input: {
    marginHorizontal: 25,
    marginTop: 20,
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#BAB7C3",
    borderRadius: 30,
    paddingHorizontal: 16,
    color: "#514E5A",
    fontWeight: "600"
  },
  enter: {
    marginHorizontal: 25,
    height: 50,
    borderRadius: 70 / 2,
    backgroundColor: "#9075E3",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
  },
  cardChatSelect: {
    marginHorizontal: 20,
    marginVertical: 10,
    marginTop: 20,
    borderRadius: 70 / 2,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
  }
});