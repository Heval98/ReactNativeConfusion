import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Switch, Button, Picker, Modal } from 'react-native';
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
            showModal: false,
            showDatePicker: false
        }
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
    }

    resetForm(){
        this.setState({
            guests: 1,
            smoking: false,
            date: ''
        });
    }

    toggleModal(){
        this.setState({ showModal: !this.state.showModal })
    }

    showDatePicker(){
        this.setState({ showDatePicker: true });
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
                    {this.state.showDatePicker && (<DateTimePicker
                        value={todayDate}
                        style={{ flex: 2, marginRight: 20 }}
                        date={this.state.date}
                        mode='date'
                        minimumDate={minDate}
                        onChange={(date) => {this.setState({ date: date.nativeEvent.timestamp })}}
                        onResponderEnd={this.setState({ showDatePicker: false })}
                    />)}
                </View>
                <View style={styles.formRow}>
                    <Button 
                        title='Reserve'
                        color='#512DA8'
                        onPress={() => this.handleReservation()}
                        accessibilityLabel='Learn more about this purple button'
                    />
                </View>
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => {this.toggleModal(); this.resetForm()}}
                    onRequestClose={() => {this.toggleModal(); this.resetForm()}}
                >
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Your Reservation</Text>
                        <Text style={styles.modalText}>Number of Guests: {this.state.guests}</Text>
                        <Text style={styles.modalText}>Smoking? : {this.state.smoking ? 'Yes' : 'No'}</Text>
                        <Text style={styles.modalText}>Date and Time: {this.state.date}</Text>
                        <Button
                            onPress={() => {this.toggleModal(); this.resetForm()}}
                            color='#512DA8'
                            title='Close'
                        />
                    </View>
                </Modal>
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
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
})

export default Reservation;