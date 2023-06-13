
const onlineUsers = [];
  const onlineUsersReducer = (state = onlineUsers, action) => {
    
    switch (action.type) {
      case 'SET_USERS':
        return {
            onlineUsers:action.onlineUsers
        };
    //   case '':
    //     return {
    //      
    //     };
      default:
        return state;
    }
  };
  
  export default onlineUsersReducer;