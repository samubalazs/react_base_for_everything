import axios from 'axios';

export function serverOnlineRequest() {
  return (dispatch) => {
    axios
      .get('/datasource/dummy_online.json')
      .then(function(result) {
        dispatch({
          type: 'READ_ONLINE_DATA',
          payload: result.data,
          meta: {
            offline: {
              effect: { url: '', method: 'GET' },
              commit: {
                type: 'READ_ONLINE_DATA',
                meta: {},
              },
              rollback: {
                type: 'READ_OFFLINE_DATA',
                meta: {},
              },
            },
          },
        });
      });
  };
}

export function serverOfflineRequest(limit) {
  return (dispatch) => {
    axios
      .get('/datasource/dummy_offline.json')
      .then(function(result) {
        dispatch({
          type: 'READ_OFFLINE_DATA',
          payload: result.data,
        });
      });
  };
}
