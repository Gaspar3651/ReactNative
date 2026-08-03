import { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList} from 'react-native';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render(){
        return (
            <View style={styles.header}>
                <TouchableOpacity>
                    <Image source={require('../img/logo.png')} style={styles.logo}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../img/send.png')} style={styles.send}/>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        height: 55,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,

        borderBottomWidth: 0.2,
        borderBottomColor: '#ddd'
    },

    logo:{

    },

    send:{
        width: 23,
        height: 23,
    }
});
