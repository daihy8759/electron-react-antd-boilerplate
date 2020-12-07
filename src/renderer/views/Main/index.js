import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Typography } from 'antd';
import useWordsModel from '../../stores/useWordsModel';
import * as styles from './index.module.less';

const MainView = () => {
    const { words, setWords } = useWordsModel();
    return (
        <div className={styles.default.container}>
            <Button
                type="primary"
                onClick={() => {
                    setWords('Hello World !');
                }}>
                Greeting
            </Button>
            {words && <Typography>{words}</Typography>}
        </div>
    );
};

export default withRouter(MainView);
