import React from 'react';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
class AppWrapper extends React.Component {
    render() {
        const { children } = this.props;
        return <div className="App">{children}</div>;
    }
}

export default AppWrapper;
