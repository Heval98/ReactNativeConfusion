import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Switch, Button, Picker } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';

const todayDate = Date.now();
const minDate = Date.now;

class Reservation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            guests: 1,
            smoking: false,
            date: '',
            show: false
        }
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        this.setState({
            guests: 1,
            smoking: false,
            date: ''
        });
    }

    showDatePicker(){
        this.setState({ show: true });
    }

    render() {
        return (
            <ScrollView style={{ marginTop: 25 }}>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel} >Number of Guests</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.guests}
                        onValueChange={(itemValue, itemIndex) => this.setState({ guests: itemValue })}
                    >
                        <Picker.Item label='1' value='1' />
                        <Picker.Item label='2' value='2' />
                        <Picker.Item label='3' value='3' />
                        <Picker.Item label='4' value='4' />
                        <Picker.Item label='5' value='5' />
                        <Picker.Item label='6' value='6' />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel} >Smoking/Non-Smoking?</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.smoking}
                        trackColor={{ false: "#767577", true: "#512DA8" }}
                        onValueChange={(value) => this.setState({ smoking: value})}
                    >
                        
                    </Switch>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel} >Date and Time</Text>
                    <Icon style={styles.formItem} name='event' onPress={() => this.showDatePicker()}></Icon>
                    {this.state.show && (<DateTimePicker
                        value={todayDate}
                        style={{ flex: 2, marginRight: 20 }}
                        date={this.state.date}
                        mode='date'
                        minimumDate={minDate}
                        onChange={(date) => {this.setState({ date: date.nativeEvent.timestamp })}}
                        onResponderEnd={this.setState({ show: false })}
                    />)}
                </View>
                <View style={styles.formRow}>
                    <Button 
                        style={styles.button}
                        title='Reserve'
                        color='#512DA8'
                        onPress={() => this.handleReservation()}
                        accessibilityLabel='Learn more about this purple button'
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20,
    },
    formLabel: {
        fontSize: 18,
        flex: 2,
    },
    formItem: {
        flex: 1
    },
    button: {
        borderRadius: 10,
        padding: 10
    }
})

export default Reservation;