function createVisit(payload) {

  const sheet = getSheet(
    CONFIG.SHEETS.VISITS
  );

  const visitId =
    generateId('VISIT');

  sheet.appendRow([

    visitId,

    payload.project_id,

    payload.visit_name,

    payload.department || '',

    payload.division || '',

    payload.visit_date,

    payload.location,

    payload.measurement_team,

    'Scheduled',

    '',

    new Date()

  ]);

  return {

    success: true,

    visit_id:
      visitId

  };

}

function getVisits() {

  const sheet = getSheet(
    CONFIG.SHEETS.VISITS
  );

  const data =
    sheet.getDataRange().getValues();

  let visits = [];

  for(let i = 1; i < data.length; i++) {

    visits.push({

      visit_id:
        data[i][0],

      project_id:
        data[i][1],

      visit_name:
        data[i][2],

      department:
        data[i][3],

      division:
        data[i][4],

      visit_date:
        data[i][5],

      location:
        data[i][6],

      measurement_team:
        data[i][7],

      status:
        data[i][8],

      notes:
        data[i][9]

    });

  }

  return visits;

}

function updateVisitStatus(payload) {

  const sheet = getSheet(
    CONFIG.SHEETS.VISITS
  );

  const data =
    sheet.getDataRange().getValues();

  for(let i = 1; i < data.length; i++) {

    const visitId =
      data[i][0];

    if(
      visitId ==
      payload.visit_id
    ) {

      sheet.getRange(
        i + 1,
        9
      ).setValue(
        payload.status
      );

      return {

        success: true

      };

    }

  }

  return {

    success: false

  };

}