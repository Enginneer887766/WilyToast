<FlatList data={this.state.allTransactions} renderItem={({item})=>( <View style={{borderBottomWidth: 2}}> <Text>{"Book Id: " + item.bookId}</Text> 
<Text>{"Student id: " + item.studentId}</Text> 
<Text>{"Transaction Type: " + item.transactionType}</Text> 
<Text>{"Date: " + item.date.toDate()}</Text>
 </View> )} keyExtractor= {(item, index)=> index.toString()} onEndReached ={this.fetchMoreTransactions} onEndReachedThreshold={0.5} />
  </View>
