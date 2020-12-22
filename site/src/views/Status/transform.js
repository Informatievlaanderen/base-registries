const projectionStateMapping = {
  'crashed' : 'error',
  'stopped' : 'stopped',
  'catchingup': 'active',
  'subscribed': 'active',
};

const calculateProjectionProgress = (currentPosition = -1, streamPosition = -1) => {
  return {
    position: currentPosition,
    relativePostion: currentPosition - streamPosition,
    percentage: streamPosition < 0 ? 100 : (currentPosition + 1) / (streamPosition + 1) * 100,
    streamPosition,
    isBehind: currentPosition < streamPosition,
  };
};

const determineAlertLevel = (projectionstate = '', progress= {}) => {
  if (projectionstate === 'error') {
    return 'error';
  }
  if (projectionstate === 'stopped') {
    return 'warning';
  }
  if (projectionstate === 'active') {
    return progress.relativePostion < -50 ? 'warning' : 'success';
  }
  return 'unkown';
};

const createProjectionStatusModel = (projection = { }, streamPosition = -1) => {
  const { name , currentPosition = -1, state = 'unknown' } = projection;
  let progress = calculateProjectionProgress(currentPosition, streamPosition);
  
  const projectionState = projectionStateMapping[state.toLowerCase()] || 'unknown';
  return {
    name,
    alertLevel: determineAlertLevel(projectionState, progress),
    state: projectionState,
    progress,
  };
};

const aggregateAlertLevel = (items = []) => 
  items.reduce(
    (level, { alertLevel = 'unknown' }) => {
      if ([level, alertLevel].includes('error')) {
        return 'error';
      }
      if ([level, alertLevel].includes('warning')) {
        return 'warning';
      }
      if ([level, alertLevel].includes('success')) {
        return 'success';
      }
      return 'unknown';
    },
    'unknown');

export {
  createProjectionStatusModel,
  aggregateAlertLevel,
};