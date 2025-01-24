const uri_api = 'https://api-keoplanner.herokuapp.com';

export const environment = {
  name: 'planner',
  uri: 'https://keoplanner.com',

  // Services
  serv_url: uri_api,
  socket_url: uri_api,

  production: true,

  recaptcha: {
    siteKey: '6LdWk9UhAAAAAH9dkBLfBgOcsCPbC_-7vUT-YTs-',
  },

  // new constants 22/01/2025
  uri_dashboard: 'http://localhost:4200',
};
