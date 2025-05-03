import makeRequest from '../makeRequest';

export const loginUser = async ( user ) => {
  try {
    const dto = new URLSearchParams();
    dto.append('username', user.username);
    dto.append('password', user.password);
    return await makeRequest('POST', '/api/users/token', dto, {'Content-Type': 'application/x-www-form-urlencoded'});
  } catch (error) {
    if (error.message.includes('Unauthorized')) {
      throw new Error("Неверные логин или пароль. Пожалуйста попробуйте снова.");
    }
    if (error.message.includes('Bad Request')) {
      throw new Error("Неверные данные входа. Пожалуйста, перепроверьте введенные поля.");
    }
    throw new Error(error.message || "Не удалось выполнить авторизацию. Пожалуйста попробуйте снова.");
  }
};
