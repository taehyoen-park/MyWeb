
  const user = {
    isLogin:false,
    user_id:null,
    user_name:null,
  }
  const userReducer = (state = user, action) => {
    
    switch (action.type) {
      case 'LOGIN':
        return {
          isLogin: true,
          user_id:action.user_id,
          user_name:action.user_name
        };
      case 'LOGOUT':
        return {
          isLogin: false,
          user_id:null,
          user_name:null
        };
      default:
        return state;
    }
  };
  
  export default userReducer;