import React from 'react';
import { withRouter } from 'react-router-dom';

const styles = require('./styles/index.less');

const MainView = () => {
    return (
        <div className={styles.container}>
            <span>hello world</span>
        </div>
    );
};

export default withRouter(MainView);
