import React from "react";
import {
  Text,
  View,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as firebase from "firebase";
import db from "../config.js";

export default class Searchscreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTransactions: [],
      lastVisibleTransaction: null,
    };
  }


  searchTransaction = async(text)=>{
    var enteredText = text.split('')
    var Text = text.toUpperCase();
    if (enteredText[0].toUpperCase() === "B") {
      const transaction = await db.collection('transactions').where('bookId', '==',Text).get();
      transaction.docs.map((doc)=>{
        this.setState({
          allTransactions: [this.state.allTransactions, doc.data()],
          lastVisibleTransaction: doc
        });
      })
    }

    else if (enteredText[0].toUpperCase() === "S") {
      const transaction = await db.collection('transactions').where('studentId', '==',Text).get();
      transaction.docs.map((doc)=>{
        this.setState({
          allTransactions: [this.state.allTransactions, doc.data()],
          lastVisibleTransaction: doc
        });
      })
    }
  }

  componentDidMount = async () => {
    const query = await db.collection("transactions").get();
    query.docs.map((doc) => {
      this.setState({
        allTransactions: [this.state.allTransactions, doc.data()],
      });
    });
  };

  
  
  fetchMoreTransactions = async () => {
    var Text = this.state.search.toUpperCase();
    var enteredText = ('')
    if (enteredText[0].toUpperCase() === "B") {
      const query = await db.collection('transactions').where('bookId', '==',Text).startAfter(this.state.lastVisibleTransaction).limit(10).get();
      query.docs.map((doc)=>{
        this.setState({
          allTransactions: [this.state.allTransactions, doc.data()],
          lastVisibleTransaction: doc
        });
      })
    }

    else if (enteredText[0].toUpperCase() === "S") {
      const query = await db.collection('transactions').where('studentId', '==',Text).startAfter(this.state.lastVisibleTransaction).limit(10).get();
      query.docs.map((doc)=>{
        this.setState({
          allTransactions: [this.state.allTransactions, doc.data()],
          lastVisibleTransaction: doc
        });
      })
    }

  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.textinput}
            placeholder="Enter the book ID or student ID"
            onChangeText={(text) => {
              this.setState({
                search: text,
              });
            }}
          ></TextInput>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              this.searchTransaction(this.state.search);
            }}
          ></TouchableOpacity>
        </View>

        <FlatList
          data={this.state.allTransactions}
          renderItem={({ item }) => (
            <View style={{ borderBottomWidth: 2 }}>
              <Text>{"Book Id: " + item.bookId}</Text>
              <Text>{"Student id: " + item.studentId}</Text>
              <Text>{"Transaction Type: " + item.transactionType}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={this.fetchMoreTransactions}
          onEndReachedThreshold={0.5}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  textinput: {
    padding:100,
    fontSize: 20,
    alignItems:"center"
  },
  searchButton: {
    
    borderWidth: 0.7,
    height: 30,
    width:50,
    backgroundColor: 'lightblue'
  },
  searchBox: {
    flexDirection: 'row',
    height: 40,
    width:'auto',
    borderWidth:0.7,
    alignItems: "center"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
