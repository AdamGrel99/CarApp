import axios from 'axios';

interface LoginResponse {
  token: string;
  displayName: string;
}

export const loginApi = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>('https://localhost:7072/api/account/login', {
    email,
    password,
  });
  console.log(response.data)
  return response.data;
};