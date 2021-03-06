import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import base from '../base';

import sampleFishes from '../sample-fishes';

class App extends React.Component {

  state = {
    fishes: {},
    order: {},
  }

  static propTypes = {
    match: PropTypes.object,
  }

  componentDidMount() {
    const { params } = this.props.match;
    // First re-instate localstorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if(localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      })
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes',
    });
  } 
  
  componentDidUpdate() {
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    // How to update state
    // 1. Take a copy of existing state
    const fishes = {...this.state.fishes};
    // 2. Add new fish to the copy
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set updated object to state
    this.setState({
      fishes
    })
  }

  updateFish = (key, updatedFish) => {
    // 1. Take a copy of the current state
    const fishes = { ...this.state.fishes };
    // 2. Update state
    fishes[key] = updatedFish;
    // 3. Set the state
    this.setState({ fishes });
  }
  
  deleteFish = (key) => {
    // 1. Take a copy of state
    const fishes = { ...this.state.fishes };
    // Update the state
    fishes[key] = null;
    // 3. update state
    this.setState({ fishes });
  }

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes })
  }

  addToOrder = key => {
    // 1. Take a copy of state
    const order = { ...this.state.order };
    // 2. Either add to order, or update number of item ordered
    order[key] = order[key] + 1 || 1;
    // 3. Call setState
    this.setState({ order });
  }

  removeFromOrder = key => {
    // 1. Take a copy of state
    const order = { ...this.state.order};
    // 2. Remove the fish from order
    delete order[key];
    // 3. Set state
    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            { Object.keys(this.state.fishes).map(key => (
              <Fish 
                index={key} 
                key={key} 
                details={ this.state.fishes[key] } 
                addToOrder={ this.addToOrder } 
              />
            )) }
          </ul>
        </div>
        <Order 
          fishes={ this.state.fishes } 
          order={ this.state.order } 
          removeFromOrder={ this.removeFromOrder } 
        />
        <Inventory
          storeId={ this.props.match.params.storeId }
          fishes={ this.state.fishes }
          addFish={ this.addFish }
          updateFish={ this.updateFish }
          deleteFish={ this.deleteFish }
          loadSampleFishes={ this.loadSampleFishes }
        />
      </div>
    )
  }
}

export default App;
