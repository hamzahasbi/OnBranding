const UserLogin = {
  invalid: {
    email: 'h.hasbi@void.fr',
    password: 'wF2kM2vE6mQ2'
  },
  valid: {
    email: 'h.hasbi@void.fr',
    password: '123456'
  },
  with_no_password: {
    email: 'h.hasbi@void.fr'
  }
};

const UserRegister = {
  invalid_email: {
    email: 'h.hasbi.fr',
    password: '123456',
    name: 'hamzahasbi'
  },
  valid: {
    email: 'h.hasbi@void.fr',
    password: '123456',
    name: 'Morty'
  },
  with_missing_info: {
    email: 'h.hasbi@void.fr',
    password: 'wF2kM2vE6mQ2'
  },
  short_pwd: {
    email: 'h.hasbi@void.fr',
    password: '1234',
    name: 'MortyJs'
  }
};

module.exports = {
  UserLogin,
  UserRegister
};
