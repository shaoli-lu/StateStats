import { statesAG } from './states-ag';
import { statesHM } from './states-hm';
import { statesMN } from './states-mn';
import { statesNS } from './states-ns';
import { statesTW } from './states-tw';

export const allStates = [
  ...statesAG,
  ...statesHM,
  ...statesMN,
  ...statesNS,
  ...statesTW,
].sort((a, b) => a.name.localeCompare(b.name));

export default allStates;
