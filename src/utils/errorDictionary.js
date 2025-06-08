// tabla general se divide en usuario, mascota y autenticacion. cada una con su propio codigo de error y mensaje

export const ERROR_CODES = {
  USER_CREATION_ERROR: {
    code: 1001,
    message: "Faltan campos obligatorios al crear usuario",
  },
  PET_CREATION_ERROR: {
    code: 1002,
    message: "Faltan datos para crear mascota",
  },
  AUTH_ERROR: {
    code: 1003,
    message: "Credenciales invalidas/error de autenticacion",
  },
};
