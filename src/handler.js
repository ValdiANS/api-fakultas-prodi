import {
  getFakultasList,
  getFakultasNameList,
  getListProdiOfFakultas,
  getAllProdi,
  getProdi,
} from './databaseHandler.js';

const fakultasProdiHandler = async (request, h) => {

  const fakultasProdiResp = {
    data: {
      universitas: 'Universitas Pendidikan Indonesia',
      listFakultas: await getFakultasList(),
    },
  };

  const response = h.response(JSON.stringify(fakultasProdiResp));
  response.code(200);
  response.header('Content-Type', 'application/json');

  return response;
};

const fakultasHandler = async (request, h) => {
  
  const fakultasResp = {
    data: await getFakultasNameList(),
  };

  const response = h.response(JSON.stringify(fakultasResp));
  response.code(200);
  response.header('Content-Type', 'application/json');

  return response;
};

const prodiFakultasHandler = async (request, h) => {
  const { namaFakultas } = request.params;
  let statusCode = 200;

  const prodiFakultas = await getListProdiOfFakultas(namaFakultas);

  const prodiFakultasResp = {};

  if (prodiFakultas.listProdi.length === 0) {
    statusCode = 404;
    prodiFakultasResp.errors = [
      {
        status: `${statusCode}`,
        title: 'Tidak ditemukan',
        detail: 'Prodi dari fakultas bersangkutan tidak ditemukan',
      },
    ];
  } else {
    prodiFakultasResp.data = prodiFakultas;
  }

  const response = h.response(JSON.stringify(prodiFakultasResp));
  response.code(statusCode);
  response.header('Content-Type', 'application/json');

  return response;
};

const prodiHandler = async (request, h) => {

  const prodiResp = {
    data: await getAllProdi(),
  };
  
  const response = h.response(JSON.stringify(prodiResp));
  response.code(200);
  response.header('Content-Type', 'application/json');

  return response;
};

const kodeProdiHandler = async (request, h) => {
  const { kodeProdi } = request.params;
  let statusCode = 200;

  const prodi = await getProdi(kodeProdi);
  const prodiResp = {};

  if (!prodi) {
    statusCode = 404;
    prodiResp.errors = [
      {
        status: `${statusCode}`,
        title: 'Tidak ditemukan',
        detail: 'Kode prodi tidak ditemukan',
      },
    ];
  } else {
    prodiResp.data = prodi;
  }

  const response = h.response(JSON.stringify(prodiResp));
  response.code(statusCode);
  response.header('Content-Type', 'application/json');

  return response;
};

export {
  fakultasProdiHandler,
  fakultasHandler,
  prodiFakultasHandler,
  prodiHandler,
  kodeProdiHandler,
};
