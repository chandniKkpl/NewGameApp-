/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import { IVetApp} from './src/navigator/Navigator';

import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => IVetApp);
