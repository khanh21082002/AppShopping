/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {UITab} from "./src/navigation/UITab";
import App from "../ShoppingApp/src/navigation/App";
AppRegistry.registerComponent(appName, () => App);
