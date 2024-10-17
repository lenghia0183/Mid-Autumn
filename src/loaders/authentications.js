const checkAuth = () => {
  const user = localStorage.getItem("user");
  return user ? true : false;
};

export const authLoader = () => {
  if (!checkAuth()) {
    return redirect(PATH.LOGIN);
  }
  return null;
};
