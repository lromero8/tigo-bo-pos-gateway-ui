export const environment = {
  production: false,

  LOG_URL: 'http://localhost:3003/api/',
  SSO_URL: 'http://localhost:3003/api',

  SETUPS_URL: 'http://localhost:9292/',
  REPORTS_URL: 'http://localhost:2929/',
  SERVER_ERROR_MSG: 'Server Error',
  HEADER_SERVICE_CODE: 'service_code',
  SUCCESS_CODE: '0',
  HEADER_SERVICE_DESCRIPTION: 'service_description',
  INVALID_LOGIN: 'El usuario o la contraseña son inválidos',
  UNAUTHORIZED: 'Acceso inautorizado',

  /**
   * Idle settings
   */
  IDLE: 20 * 60,
  TIMEOUT: 1 * 60,
  PING: 5,
  REMANIG_TIME_FOR_GET_NEW_TOKEN: 10, // in seconds

  /**
   * Toaster settings
   */
  TOASTER_TIMEOUT: 10000,
  PREVENT_DUPLICATES: true,

  msgTooltip: 'Formulario invalido'

};

export const I18N_VALUES = {
  'fr': {
    weekdays: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'],
    months: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Déc'],
  },

  'es': {
    weekdays: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
    months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  }
};
