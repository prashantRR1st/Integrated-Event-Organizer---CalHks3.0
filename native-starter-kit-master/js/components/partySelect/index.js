
import React, { Component } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Text, Button, Icon,  Card, CardItem, Thumbnail } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import { setIndex } from '../../actions/list';
import myTheme from '../../themes/base-theme';
import styles from './styles';

const {
  reset,
  pushRoute,
} = actions;
const smallParty = require('../../../images/small.jpg')
const largeParty = require('../../../images/large.jpg')


class PartySelect extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    setIndex: React.PropTypes.func,
    openDrawer: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    reset: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  pushRoute(route, index) {
    this.props.setIndex(index);
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }
  render() {
    return (
      <Container theme={myTheme} style={styles.container}>
        <Header>

          <Title>{(this.props.name) ? this.props.name : 'Party Type'}</Title>
          <Button transparent onPress={() => this.props.reset(this.props.navigation.key)}>
            <Icon name="ios-power" />
          </Button>
        </Header>
        <Content>

        <Card >
            <CardItem button onPress = {() => this.pushRoute('tabSelect')}>
            <Image source={smallParty} />
            </CardItem>
            <CardItem button onPress = {() => this.pushRoute('tabSelect')}>
              <Text>Small Party</Text>
              <Text > {'<20 People'} </Text>
            </CardItem>
        </Card>


        <Card>
            <CardItem button onPress = {() => this.pushRoute('tabSelect')}>
            <Image source={largeParty} />
            </CardItem>
            <CardItem button onPress = {() => this.pushRoute('tabSelect')}>
              <Text>Large Party</Text>
              <Text > {'20+ People'} </Text>
            </CardItem>
        </Card>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer()),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    reset: key => dispatch(reset([{ key: 'login' }], key, 0)),
  };
}

const mapStateToProps = state => ({
  name: state.user.name,
  list: state.list.list,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(PartySelect);
