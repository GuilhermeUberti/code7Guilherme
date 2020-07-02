import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import { MenuArea, MenuImage } from './styled';

const Page = (props) => {

    handleMenu = () => {
        props.navigation.openDrawer();
    }

    return (
        <SafeAreaView>
            <StatusBar barStyle="#dark-content" backgroundColor="#000" />
            <MenuArea underlayColor="transparent" onPress={handleMenu}>
                <MenuImage source={require('../../assets/menu.png')} />
            </MenuArea>
        </SafeAreaView>

    );
}

export default Page;