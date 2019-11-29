import { 
  HOME_ADD_COUNT,
} from '../action/home'
const initialState:any = {
  count: 0,
  home: ''
};
const home = (state = initialState, action : any) => {
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