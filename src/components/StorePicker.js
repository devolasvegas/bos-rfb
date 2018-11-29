import React, { Fragment } from 'react';
import { format } from 'util';

class StorePicker extends React.Component {
    render() {
        return (
            <form className="store-selector">
                <input type="text" required placeholder="Store Name" />
                <button type="submit">Visit Store</button>
            </form>
        );
    }
}

export default StorePicker;