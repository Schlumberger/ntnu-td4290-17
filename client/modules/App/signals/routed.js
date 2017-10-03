import { parallel, sequence } from 'cerebral';
import getChronostrat from '../chains/getChronostrat';
import getDataset from '../chains/getDataset';
import getPlaces from '../chains/getPlaces';
import formatData from '../chains/formatData';

// When the '/'-route is triggered, run getChronostrat and getDataset in parallel
export default sequence('On Routed', [
  parallel([getChronostrat, getDataset, getPlaces]),
  formatData
]);
