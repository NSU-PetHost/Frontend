import makeRequest from '../makeRequest';

export const registerUser = async ( dto ) => {
  try {
    return await makeRequest('POST', '/api/users/register', JSON.stringify(dto));
  } catch (error) {
    if (error.message.includes('Conflict')) {
      throw new Error("Имя пользователя уже существует. Пожалуйста, повторите попытку под другим именем.");
    }
    if (error.message.includes('Bad Request')) {
      throw new Error("Неверные данные регистрации. Пожалуйста, перепроверьте введенные поля.");
    }
    throw new Error(error.message || "Не удалось выполнить регистрацию. Пожалуйста попробуйте снова.");
  }
};
