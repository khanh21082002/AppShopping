/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {Welcome , Login , Register ,FootList} from './src/screens/index';

AppRegistry.registerComponent(appName, () => FootList);
