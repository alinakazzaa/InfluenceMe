import * as React from 'react';
import { View, Text, YellowBox, StyleSheet, TouchableOpacity } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);


class AllCollabs extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>All Collabs</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewCollab')}>
                    <Text>View Collab</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AddCollab')}>
                    <Text>Add Collab</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            textAlign: 'center',
            color: 'black'
        }
    });

export default AllCollabs