const universalReducer = (state = {
  info: {},
}, action) => {
  switch (action.type) {
    case 'READ_ONLINE_DATA':
      state = {
          ...state,
          info: action.payload,
      };
      break;
    case 'READ_OFFLINE_DATA':
      state = {
          ...state,
          info: action.payload,
      };
      break;
    default:
      state = {
        ...state,
      };
  }
  return state;
};

export default universalReducer;
