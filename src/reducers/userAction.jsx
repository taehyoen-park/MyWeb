export const login = (userInfo) => {
    return {
      type: 'LOGIN',
      user_id:userInfo.userid,
      user_name:userInfo.username
    };
};
  
export const logout = () => {
    return {
        type: 'LOGOUT',
    };
};