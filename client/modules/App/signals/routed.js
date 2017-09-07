import { parallel } from 'cerebral';
import getChronostrat from '../chains/getChronostrat';
import getDataset from '../chains/getDataset';

export default parallel('On Routed', [getChronostrat, getDataset]);
