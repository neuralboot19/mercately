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
    backgroundColor: '#FFF',
    justifyContent: 'center',
  },
  header: {
    fontWeight: "bold",
    fontSize: 28,
    color: "#514E5A",
  },
  descriptionText: {
    fontSize: 14,
    color: "#514E5A"
  },
  input: {
    height: 44,
    borderBottomWidth: 1.5,
    borderColor: "#ececec",
    // borderRadius: 30,
    // paddingHorizontal: 16,
    color: "#514E5A",
    fontWeight: "600"
  },
  enter: {
    marginVertical: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row'
  },
  texButton: {
    textTransform: "capitalize",
    fontWeight: 'bold',
    fontSize: 16
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