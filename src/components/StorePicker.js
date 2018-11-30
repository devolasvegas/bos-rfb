import React, { Fragment } from 'react';
import { format } from 'util';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {

    myInput = React.createRef();

    goToStore = e => {
        // 1. Stop the form from submitting
        e.preventDefault();
        // 2. Get the value from the input
        const storeName = this.myInput.value.value;
        // 3. Redirect the page
        this.props.history.push(`/store/${storeName}`);
        
    }

    render() {
        return (
            <form className="store-selector" onSubmit={ this.goToStore }>
                <input 
                    type="text" 
                    ref={ this.myInput }
                    required 
                    placeholder="Store Name" 
                    defaultValue={ getFunName() } 
                />
                <button type="submit">Visit Store</button>
            </form>
        );
    }
}

export default StorePicker;