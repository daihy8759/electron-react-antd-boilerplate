import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import MainRouter from './routes';
import getStore from '../share/store';
import './app.css';

const store = getStore();

ReactDOM.render(<ConfigProvider locale={zhCN}>{MainRouter}</ConfigProvider>, document.getElementById('app'));
