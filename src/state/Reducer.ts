// TODO: add all the reducing stuffys inside :)
// TODO: if needed, create reducers folder, and put specific reducers inside
export const reducer = (state, action) => {
  switch (action.type) {
    case "WINDOW_RESIZE":
      return {
        ...state,
        client: action.value
      };
    case "SET_LOADING":
      return {
        ...state,
        status: action.value
      };
    case "changeTheme":
      return {
        ...state,
        theme: action.newTheme
      };

    default:
      return state;
  }
};
