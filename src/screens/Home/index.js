import React from 'react';
import { SafeAreaView, Text, StatusBar } from 'react-native';

const Page = () => {
    return (
        <SafeAreaView>
            <StatusBar barStyle="#dark-content" backgroundColor="#000"/>
            <Text>Teste</Text>
        </SafeAreaView>
    );
}

export default Page;