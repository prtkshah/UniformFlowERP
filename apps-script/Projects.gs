function createProject(payload) {

  const sheet = getSheet(
    CONFIG.SHEETS.PROJECTS
  );

  const projectId =
    generateId('PROJ');

  sheet.appendRow([

    projectId,

    payload.client_id,

    payload.project_name,

    payload.start_date,

    payload.end_date,

    new Date()

  ]);

  return {

    success: true,

    project_id:
      projectId

  };

}

function getProjects() {

  const projectSheet =
    getSheet(
      CONFIG.SHEETS.PROJECTS
    );

  const clientSheet =
    getSheet(
      CONFIG.SHEETS.CLIENTS
    );

  const projects =
    projectSheet
      .getDataRange()
      .getValues();

  const clients =
    clientSheet
      .getDataRange()
      .getValues();

  let clientMap = {};

  // CLIENT MAP

  for(let i = 1; i < clients.length; i++) {

    const clientId =
      clients[i][0];

    const clientName =
      clients[i][1];

    clientMap[
      clientId
    ] = clientName;

  }

  let result = [];

  // PROJECTS

  for(let i = 1; i < projects.length; i++) {

    const projectId =
      projects[i][0];

    const clientId =
      projects[i][1];

    const projectName =
      projects[i][2];

    const startDate =
      projects[i][3];

    const endDate =
      projects[i][4];

    const clientName =
      clientMap[clientId] || 'Unknown Client';

    result.push({

      project_id:
        projectId,

      client_id:
        clientId,

      client_name:
        clientName,

      project_name:
        projectName,

      start_date:
        startDate,

      end_date:
        endDate,

      display_name:
        `${clientName} — ${projectName}`

    });

  }

  return result;

}