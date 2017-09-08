import { parallel } from 'cerebral';
import getChronostrat from '../chains/getChronostrat';
import getDataset from '../chains/getDataset';

// When the '/'-route is triggered, run getChronostrat and getDataset in parallel
export default parallel('On Routed', [getChronostrat, getDataset]);
