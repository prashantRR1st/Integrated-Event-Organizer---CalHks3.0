
import React, { Component } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Text, Button, Tabs, Icon, Footer, FooterTab} from 'native-base';

import { openDrawer } from '../../actions/drawer';
import { setIndex } from '../../actions/list';
import myTheme from '../../themes/base-theme';
import styles from './styles';



const {
  reset,
  pushRoute,
} = actions;


class TabSelect extends Component {

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

generateIcon(icon) {
    tabIdxToIcon = {0:"ios-people",1:"ios-musical-notes",2:"ios-wineglass",3:"ion-ios-star" }
    if ( icon == tabIdxToIcon[this.props.currentTab] ) {
        return icon + '-outline'
    }
    return icon
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
        </Header>
        <Content>
        </Content>
        <Footer >
        <FooterTab>
            <Button onPress={ () => {this.props.currTab=0}}>
                Venues
                <Icon name={ this.generateIcon('ios-apps-outline') } />
            </Button>
            <Button>
                Music
                <Icon name={ this.generateIcon('ios-apps-outline') } />
            </Button>
            <Button active>
                Catering
                <Icon name={ this.generateIcon('ios-apps-outline') } />
            </Button>
            <Button>
                Extras
                <Icon name={ this.generateIcon('ios-apps-outline') } />
            </Button>
        </FooterTab>
        </Footer>
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

function CurrentTab(props) {
  const currTab = 0
}



class Venue extends Component {
  render() {
    return (
      <Text>Venue Page Here</Text>
    );
  }
}




class Music extends Component {
  render() {
    return (
      <Text>Music Page Here</Text>
    );
  }
}

export default connect(mapStateToProps, bindAction)(TabSelect);
