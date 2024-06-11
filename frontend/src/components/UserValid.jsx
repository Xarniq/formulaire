import Cookies from 'js-cookie';

function isUserValid(user) {
  // Check if the token exists
  const token = Cookies.get('token');
  if (!token) {
    return false;
  }

  // Check if all required user fields are present
  const requiredFields = ['name', 'email'];
  for (let field of requiredFields) {
    if (!user[field]) {
      return false;
    }
  }

  return true;
}

export default isUserValid;
