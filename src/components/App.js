import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component {

  state = {
    fishes: {},
    order: {},
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

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
        </div>
        <Order />
        <Inventory addFish={ this.addFish } />
      </div>
    )
  }
}

export default App;
