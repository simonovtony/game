import axios from "axios";

const http = axios.create({
  baseURL: 'http://localhost:8080/',
});

export const getUsers = async (data: any = {}): Promise<any> => {
  const params = new URLSearchParams({
    limit: data?.limit ?? 100,
  })
  const {
    data: {
      users,
    }
  } = await http.get(`/api/users?${params.toString()}`);
  return users;
};

export const createUser = async (data: any = {}): Promise<any> => {
  const {
    data: {
      user
    }
  } = await http.post('/api/users', {
    username: data.username,
    score: data.score,
  });
  return user;
};

export const updateUser = async (data: any = {}): Promise<any> => {
  const {
    data: {
      user
    }
  } = await http.put(`/api/users/${data.id}`, {
    score: data.score,
  });
  return user;
};

export const deleteUser = async (data: any = {}): Promise<any> => {
  await http.post(`/api/users/${data.id}`);
};