import { 
  HOME_ADD_COUNT,
} from '../action/home'
const initialState = {
  count: 0
};
const home = (state = initialState, action) => {
    switch (action.type) {
    case HOME_ADD_COUNT:
      return {
        count: state.count + action.data
      }
    default:
      return state
    }
  }

export default home