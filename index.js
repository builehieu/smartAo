import { AppRegistry } from 'react-native';
import App from './App';
import WithProvider from './src/components/WithProvider';

AppRegistry.registerComponent('smartAo', () => WithProvider(App));
