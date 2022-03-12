import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import db from '../config';
export default class SearchScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            search: "",
            allTransactions: [],
            lastTransaction: null
        }
    }

    searchTransaction = async (searchText) => {
        searchText = searchText.split("")[0].toUpperCase() + searchText.split("")[1].toLowerCase() + searchText.substring(2);
        console.log(searchText)
        var firstAlphabet = searchText.split("")[0]
        if (firstAlphabet === "B") {
            var transaction = await db.collection("Transaction").where("bookId", "==", searchText).limit(10).get();
            transaction.docs.map(doc => {
                this.setState({
                    allTransactions: [...this.state.allTransactions, doc.data()],
                    lastTransaction: doc
                })
            })
            console.log(this.state.lastTransaction.id)
            console.log(this.state.allTransactions.length)
        }
        else if (firstAlphabet === "S") {
            var transaction = await db.collection("Transaction").where("studentId", "==", searchText).limit(10).get();
            transaction.docs.map(doc => {
                this.setState({
                    allTransactions: [...this.state.allTransactions, doc.data()],
                    lastTransaction: doc
                })
            })
            console.log(this.state.lastTransaction.id)
            console.log(this.state.allTransactions.length)
        }
    }

    fetchMore = async (searchText) => {
        searchText = searchText.split("")[0].toUpperCase() + searchText.split("")[1].toLowerCase() + searchText.substring(2);
        console.log(searchText)
        var firstAlphabet = searchText.split("")[0]
        if (firstAlphabet === "B") {
            var transaction = await db.collection("Transaction").where("bookId", "==", searchText).startAfter(this.state.lastTransaction).limit(10).get();
            transaction.docs.map(doc => {
                this.setState({
                    allTransactions: [...this.state.allTransactions, doc.data()],
                    lastTransaction: doc
                })
            })
            console.log(this.state.lastTransaction.id)
            console.log(this.state.allTransactions.length)
        }
        else if (firstAlphabet === "S") {
            var transaction = await db.collection("Transaction").where("studentId", "==", searchText).startAfter(this.state.lastTransaction).limit(10).get();
            transaction.docs.map(doc => {
                this.setState({
                    allTransactions: [...this.state.allTransactions, doc.data()],
                    lastTransaction: doc
                })
            })
            console.log(this.state.lastTransaction.id)
            console.log(this.state.allTransactions.length)
        }
    }
    render() {
        return (
            <View>
                <View style={{ marginTop: 80, flexDirection: "row" }}>
                    <TextInput
                        style={{ width: 250, height: 30, borderWidth: 2 }}
                        placeholder="Enter Student ID or Book ID"
                        onChangeText={text => {
                            this.setState({
                                search: text
                            })
                        }} />
                    <TouchableOpacity style={{ backgroundColor: "orange", height: 30, width: 70 }}
                        onPress={() => this.searchTransaction(this.state.search)}>
                        <Text>
                            Search
                            </Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={this.state.allTransactions}
                    keyExtractor={(item, index) => { index.toString() }}
                    renderItem={({ item }) => (
                        <View style={{ borderBottomWidth: 2 }}>
                            <Text>{"Book ID :" + item.bookId}</Text>
                            <Text>{"Student ID :" + item.studentId}</Text>
                            <Text>{"Transaction Type :" + item.transactionType}</Text>
                            <Text>{"Date :" + item.date.toDate()}</Text>
                        </View>
                    )}
                    onEndReached={() => this.fetchMore(this.state.search)}
                    onEndReachedThreshold={0.5} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
