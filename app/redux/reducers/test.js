import ActionTypes from '../actions/actionTypes';

const initState = {
  list: {
    data: [],
    index: 0,
  },
  index: 0,

  params: {
    searchParam: {
      page: 1,
      size: 10,
    },
    fileList: [],
  },
  loading: false,
};

export const confirm = (state = initState, action) => {
  const { param, type, payload } = action;

  switch (type) {
    case ActionTypes.COMMON_CONFIRM_REQUEST:
      return { ...state, loading: true }
    case ActionTypes.COMMON_CONFIRM_SUCCESS:
      return { ...state, loading: false, list: { ...state.list, data: payload } }
    case ActionTypes.COMMON_CONFIRM_FAILURE:
      return { ...state, loading: false }
    case 'reset state':
      return initState;
    default:
      return state;
  }
}

export const userInfo = (state = initState, action) => {
  const { param, type, payload } = action;

  switch (type) {
    case 'test1':
      return { ...state, test: false }
    default:
      return state;
  }
}

