import { legacy_createStore as createStore, combineReducers } from 'redux';
import userReducer from './userReducer';
import onlineUsersReducer from './onlineUsersReducer';

const rootReducer = combineReducers({
  user: userReducer,
  onlineUsers:onlineUsersReducer,
});

const store = createStore(rootReducer);

export default store;