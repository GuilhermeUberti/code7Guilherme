import React, { useState } from 'react';
import { StatusBar, ScrollView, ActivityIndicator } from "react-native";
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import useCod7Api from '../../useCod7Api';
import {
    Container,
    Header,
    HeaderTitle,
    Menu,
    MenuItem,
    MenuItemText,
    Input,
    ActionButton,
    ActionButtonText,
    LoadingArea
} from './styled';

const Page = (props) => {

    const api = useCod7Api();

    const [activeMenu, setActiveMenu] = useState('signin');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignIn = async () => {
        if (email && password) {
            setLoading(true);
            const res = await api.signin(email, password);
            setLoading(false);

            if (res.error) {
                alert(res.error)
            } else {
                //1. Guardar o token no Reducer
                props.setToken(res.token);
                props.setName(res.name);
                props.navigation.dispatch(StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'HomeDrawer' })
                    ]
                }));
            }
        }
    }

    const handleSignUp = async () => {
        if (email && password && password) {
            setLoading(true);
            const res = await api.signup(name, email, password);
            setLoading(false);

            if (res.error) {
                alert(res.error)
            } else {
                //1. Guardar o token no Reducer
                props.setToken(res.token);
                props.setName(res.name);
                props.navigation.dispatch(StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'HomeDrawer' })
                    ]
                }));
            }
        }
    }

    return (
        <Container>
            <ScrollView>
                <StatusBar barStyle="#3574CB" backgroundColor="#3574CB" />
                <Header>
                    <HeaderTitle>Portal cod7</HeaderTitle>
                </Header>
                <Menu>
                    <MenuItem active={activeMenu == 'signin'} onPress={() => setActiveMenu('signin')} underlayColor="transparent">
                        <MenuItemText>Login</MenuItemText>
                    </MenuItem>
                    <MenuItem active={activeMenu == 'signup'} onPress={() => setActiveMenu('signup')} underlayColor="transparent">
                        <MenuItemText>Cadastrar</MenuItemText>
                    </MenuItem>
                </Menu>

                {activeMenu == 'signup' &&
                    <Input editable={!loading} value={name} onChange={(t) => setName(t)} placeholder="Nome" placeholderTextColor="#6E6E6E" />
                }

                <Input editable={!loading} value={email} onChange={(t) => setEmail(t)} keyboardType="email-address" autoCapitalize="none"
                    placeholder="E-mail" placeholderTextColor="#6E6E6E" />

                <Input editable={!loading} value={password} onChange={(t) => setPassword(t)} placeholder="Senha" placeholderTextColor="#6E6E6E"
                    secureTextEntry={true} />

                {activeMenu == 'signin' &&
                    <ActionButton disabled={loading} onPress={handleSignIn} underlayColor="#3574CB">
                        <ActionButtonText>Entrar</ActionButtonText>
                    </ActionButton>
                }

                {activeMenu == 'signup' &&
                    <ActionButton disabled={loading} onPress={handleSignUp} underlayColor="#3574CB">
                        <ActionButtonText>Cadastrar</ActionButtonText>
                    </ActionButton>
                }

            </ScrollView>
            {loading &&
                <LoadingArea>
                    <ActivityIndicator size="large" color="#FFF" />
                </LoadingArea>
            }
        </Container>
    );
}

const mapStateToProps = (state) => {
    return {
        token: state.userReducer.token
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setToken: (token) => dispatch({ type: 'SET_TOKEN', payload: { token } }),
        setName: (name) => dispatch({ type: 'SET_NAME', payload: { name } })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);