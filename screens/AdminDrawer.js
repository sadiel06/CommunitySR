import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import React from "react";
import AntDesingIcon from 'react-native-vector-icons/AntDesign';
// import Animated from 'react-native-reanimated';
import { Container, Content, Footer, Header ,Button, Right, ListItem, Left, Thumbnail, Body, Text, H3} from "native-base";
import { DrawerActions } from '@react-navigation/native';
// import { color } from "react-native-reanimated";
// import {DrawerActions} from '@react-navigation/native';
function AdminDrawer({ ...props }) {

    const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
    return (
        <Container>
            <Header style={{backgroundColor: "#fff",borderEndWidth:0}}>
                <Right>
                    <Button transparent onPress={()=>props.navigation.dispatch(DrawerActions.closeDrawer())}>
                        <AntDesingIcon name="menu-unfold" style={{fontSize:20, color:'blue'}}/>
                    </Button>
                    
                </Right>
            </Header>
            <Content>
                <ListItem thumbnail>
                    <Left>
                        <Thumbnail source={{uri:uri}}
                            />
                    </Left>
                    <Body>
                        <H3>Sadiel Henriquez</H3>
                        <Text note>Administrador</Text>
                    </Body>
                </ListItem>
                <DrawerContentScrollView {...props}>

                    <DrawerItemList {...props} />
                    <DrawerItem label='Rate us'
                        icon={({ color, size }) => <AntDesingIcon name="staro" style={{ fontSize: size, color: color }} />}
                        onPress={() => props.navigation.navigate("Home")}
                    />
                </DrawerContentScrollView>
            </Content>
            <Footer>

            </Footer>
        </Container>




    );
}

export default AdminDrawer;