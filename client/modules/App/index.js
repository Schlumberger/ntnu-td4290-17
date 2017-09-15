import routed from './signals/routed';
import layerClicked from './signals/layerClicked';
import transitionClicked from './signals/transitionClicked';

// A module contains state and signals(functions)
export default {
  // State is the object that contains server and app data
  state: {},
  // A signal is an array of functions that are executed in sequence or parallel
  // The return value from the first one is merged with the second ones input
  // In order to use a signal, it must be defined here
  // It is then accessed by signal`app.routed` for example
  signals: {
    routed,
    layerClicked,
    transitionClicked
  }
};
