function createClient(payload) {

  const sheet = getSheet(
    CONFIG.SHEETS.CLIENTS
  );

  const clientId = generateId('CLI');

  sheet.appendRow([
    clientId,
    payload.client_name || '',
    payload.client_type || '',
    payload.address || '',
    payload.contact_person || '',
    payload.phone || '',
    'Active',
    new Date()
  ]);

  return {
    client_id: clientId
  };

}

function getClients() {

  const sheet = getSheet(
    CONFIG.SHEETS.CLIENTS
  );

  const data =
    sheet.getDataRange().getValues();

  let clients = [];

  for(let i = 1; i < data.length; i++) {

    clients.push({

      client_id: data[i][0],
      client_name: data[i][1],
      client_type: data[i][2],
      address: data[i][3],
      contact_person: data[i][4],
      phone: data[i][5],
      status: data[i][6]

    });

  }

  return clients;

}