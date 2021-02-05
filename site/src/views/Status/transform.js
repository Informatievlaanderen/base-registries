const projectionStateMapping = {
  'crashed' : 'error',
  'stopped' : 'stopped',
  'catchingup': 'active',
  'subscribed': 'active',
};

const calculateProjectionProgress = (currentPosition = -1, streamPosition = -1) => {
  return {
    position: currentPosition,
    relativePosition: currentPosition - streamPosition,
    percentage: streamPosition < 0 ? 100 : (currentPosition + 1) / (streamPosition + 1) * 100,
    streamPosition,
    isBehind: currentPosition < streamPosition,
  };
};

const determineProjectionAlertLevel = (projectionstate = '', progress= {}) => {
  if (projectionstate === 'error') {
    return 'error';
  }
  if (projectionstate === 'stopped') {
    return 'warning';
  }
  if (projectionstate === 'active') {
    return progress.relativePosition < -50 ? 'warning' : 'success';
  }
  return 'unkown';
};

const createProjectionStatusModel = (projection = {}, streamPosition = -1) => {
  const { name , currentPosition = -1, state = 'unknown' } = projection;
  let progress = calculateProjectionProgress(currentPosition, streamPosition);
  
  const projectionState = projectionStateMapping[state.toLowerCase()] || 'unknown';
  return {
    name,
    alertLevel: determineProjectionAlertLevel(projectionState, progress),
    state: projectionState,
    progress,
  };
};

const determineImportAlertLevel = (lastCompleted, state) => {
  if (!lastCompleted) {
    return 'error';
  }

  if (state === 'active' && lastCompleted < new Date(Date.now() - 360000)) {
    return 'warning';
  }

  if (state === 'active' && lastCompleted < new Date(Date.now() - 3600000)) {
    return 'error';
  }

  return 'success';
};

const createImportStatusModel = (importStatus = {}) => {
  const { currentImport, lastCompletedImport } = importStatus || {};
  const state = currentImport ? 'active' : 'stopped';

  return {
    name: importStatus.name,
    state,
    lastCompleted: lastCompletedImport ? new Date(lastCompletedImport.until) : null,
    from: state === 'active' ? new Date(currentImport.from) : null,
    to: state === 'active' ? new Date(currentImport.until) : null,
    alertLevel: determineImportAlertLevel(lastCompletedImport, state),
  };
};

const determineCacheAlertLevel = numberOfRecordsToProcess => {
  if (numberOfRecordsToProcess === 0) {
    return 'success';
  }

  return numberOfRecordsToProcess ? 'warning' : 'error';
};

const createCacheStatusModel = (cache = {}) => {
  const { name = '', numberOfRecordsToProcess = null } = cache;
  return {
    name,
    numberOfRecordsToProcess,
    alertLevel: determineCacheAlertLevel(numberOfRecordsToProcess),
    debug: cache,
  };
};

const determineSyndicationAlertLevel = progress => {
  const { relativePosition } = progress || {};
  if (relativePosition) {
    return relativePosition < -50 ? 'warning' : 'success';
  }

  return 'unkown';
};

const createSyndicationStatusModel = (syndication = {}, getStreamPositionFor = () => -1) => {
  const { name , currentPosition = -1 } = syndication;
  const streamPosition = getStreamPositionFor(name);
  let progress = Number.isNaN(streamPosition) ? null : calculateProjectionProgress(currentPosition, streamPosition);

  return {
    name,
    alertLevel: determineSyndicationAlertLevel(progress),
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

const capitalizeFirstCharacter = value => {
  const val = value || '';
  return val.length <= 1 ? val.toUpperCase() : val[0].toUpperCase() + val.slice(1) ;
};

export {
  createProjectionStatusModel,
  createImportStatusModel,
  createCacheStatusModel,
  createSyndicationStatusModel,
  aggregateAlertLevel,
  capitalizeFirstCharacter,
};
