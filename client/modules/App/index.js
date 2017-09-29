import routed from './signals/routed';
import layerSettingClicked from './signals/layerSettingClicked';
import yAxisOptionClicked from './signals/yAxisOptionClicked';
import layerClicked from './signals/layerClicked';
import emptyClicked from './signals/emptyClicked';

// A module contains state and signals(functions)
export default {
  // State is the object that contains server and app data
  state: {
    info: false
  },
  // A signal is an array of functions that are executed in sequence or parallel
  // The return value from the first one is merged with the second ones input
  // In order to use a signal, it must be defined here
  // It is then accessed by signal`app.routed` for example
  signals: {
    routed,
    layerSettingClicked,
    yAxisOptionClicked,
    layerClicked,
    emptyClicked
  }
};
