import {
  fakultasProdiHandler,
  fakultasHandler,
  prodiFakultasHandler,
  prodiHandler,
  kodeProdiHandler,
} from './handler.js';

const routes = [
  {
    method: 'GET',
    path: '/fakultas-prodi',
    handler: fakultasProdiHandler,
  },
  
  {
    method: 'GET',
    path: '/fakultas',
    handler: fakultasHandler,
  },

  {
    method: 'GET',
    path: '/fakultas/{namaFakultas}/prodi',
    handler: prodiFakultasHandler,
  },

  {
    method: 'GET',
    path: '/prodi',
    handler: prodiHandler,
  },

  {
    method: 'GET',
    path: '/prodi/{kodeProdi}',
    handler: kodeProdiHandler,
  },
];

export default routes;
