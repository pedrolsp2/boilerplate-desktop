import instance from '..';
import { getHeaders } from '@/api/utils';
interface AuthenticateResponse {
  nomeUsuario: string;
  token: string;
  cod_usuario: string;
  matricula: string;
}

interface ValidateResponse {
  token: {
    exp: number;
    iat: number;
    usuario: {
      cod_filial: number;
      cod_usuario: number;
      email: string;
      nome: string;
    };
  };
}

export const authenticateUser = async ({
  user,
  password,
}: {
  user: string;
  password: string;
}) => {
  const response = await instance.post<AuthenticateResponse>(
    '/v2/perfil/usuario',
    {
      usuario: user,
      senha: password,
    },
    { headers: getHeaders() }
  );
  return response.data;
};

export const validateUserToken = async () => {
  const response = await instance.post(
    '/tokenvalidation',
    {},
    {
      headers: {
        'x-funcionalidade': 'Carregamento inicial',
        'x-acao': 'Carregamento inicial',
        ...getHeaders(),
      },
    }
  );
  return response.data;
};

export const recoverPassword = async (email: string) => {
  const response = await instance.post('/restorepassword', {
    email,
  });

  return response.data;
};

export const changePassword = async (password: string) => {
  const response = await instance.post(
    '/changepassword',
    {
      password,
    },
    { headers: getHeaders() }
  );

  return response.data;
};

export const validateProtheusToken = async (token: string) => {
  const response = await instance.post<ValidateResponse>(
    '/tokenvalidation',
    {},
    {
      headers: {
        'x-funcionalidade': 'Carregamento inicial',
        'x-acao': 'Carregamento inicial',
        'x-access-token': token,
        'x-sistema': 'GMAN',
      },
    }
  );
  return response.data;
};
