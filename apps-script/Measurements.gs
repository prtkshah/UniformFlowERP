function findSize(
  gender,
  chest,
  waist,
  topLength,
  bottomLength
) {

  const sheet = getSheet(
    CONFIG.SHEETS.SIZE_RANGES
  );

  const data =
    sheet.getDataRange().getValues();

  for(let i = 1; i < data.length; i++) {

    const row = data[i];

    const dbGender =
      row[0];

    const size =
      row[1];

    const chestMin =
      Number(row[2]);

    const chestMax =
      Number(row[3]);

    const topLengthMin =
      Number(row[4]);

    const topLengthMax =
      Number(row[5]);

    const waistMin =
      Number(row[6]);

    const waistMax =
      Number(row[7]);

    const bottomLengthMin =
      Number(row[8]);

    const bottomLengthMax =
      Number(row[9]);

    if(

      dbGender == gender &&

      chest >= (chestMin - 0.5) &&
      chest <= (chestMax + 0.5) &&

      topLength >= (topLengthMin - 0.5) &&
      topLength <= (topLengthMax + 0.5) &&

      waist >= (waistMin - 0.5) &&
      waist <= (waistMax + 0.5) &&

      bottomLength >= (bottomLengthMin - 0.5) &&
      bottomLength <= (bottomLengthMax + 0.5)

    ) {

      return {

        size: size,
        custom: false

      };

    }

  }

  return {

    size: 'CUSTOM',
    custom: true

  };

}

function previewSize(payload) {

  return findSize(

    payload.gender,

    Number(payload.chest),

    Number(payload.waist),

    Number(payload.top_length),

    Number(payload.bottom_length)

  );

}

function createMeasurement(payload) {

  const sheet = getSheet(
    CONFIG.SHEETS.MEASUREMENTS
  );

  const measurementId =
    generateId('MEAS');

  const sizeResult =
    findSize(

      payload.gender,

      Number(payload.chest),

      Number(payload.waist),

      Number(payload.top_length),

      Number(payload.bottom_length)

    );

  sheet.appendRow([

    measurementId,

    payload.visit_id || '',

    payload.project_id || '',

    payload.client_id || '',

    payload.person_code || '',

    payload.person_name || '',

    payload.gender || '',

    payload.age || '',

    'Present',

    'Measured',

    payload.chest || '',

    payload.top_length || '',

    payload.waist || '',

    payload.bottom_length || '',

    1,

    sizeResult.size,

    sizeResult.size,

    sizeResult.custom,

    'Pending',

    'Pending',

    'Pending',

    '',

    'Admin',

    '',

    new Date()

  ]);

  return {

    measurement_id:
      measurementId,

    top_size:
      sizeResult.size,

    bottom_size:
      sizeResult.size,

    custom_flag:
      sizeResult.custom

  };

}

function updateMeasurement(payload) {

  const sheet = getSheet(
    CONFIG.SHEETS.MEASUREMENTS
  );

  const row =
    payload.row_number;

  const sizeResult =
    findSize(

      payload.gender,

      Number(payload.chest),

      Number(payload.waist),

      Number(payload.top_length),

      Number(payload.bottom_length)

    );

  sheet.getRange(
    row,
    5
  ).setValue(
    payload.person_code
  );

  sheet.getRange(
    row,
    6
  ).setValue(
    payload.person_name
  );

  sheet.getRange(
    row,
    7
  ).setValue(
    payload.gender
  );

  sheet.getRange(
    row,
    11
  ).setValue(
    payload.chest
  );

  sheet.getRange(
    row,
    12
  ).setValue(
    payload.top_length
  );

  sheet.getRange(
    row,
    13
  ).setValue(
    payload.waist
  );

  sheet.getRange(
    row,
    14
  ).setValue(
    payload.bottom_length
  );

  sheet.getRange(
    row,
    16
  ).setValue(
    sizeResult.size
  );

  sheet.getRange(
    row,
    17
  ).setValue(
    sizeResult.size
  );

  sheet.getRange(
    row,
    18
  ).setValue(
    sizeResult.custom
  );

  return {

    success: true

  };

}

function getMeasurements(payload) {

  const sheet = getSheet(
    CONFIG.SHEETS.MEASUREMENTS
  );

  const data =
    sheet.getDataRange().getValues();

  let measurements = [];

  for(let i = 1; i < data.length; i++) {

    const visitId =
      data[i][1];

    if(
      payload &&
      payload.visit_id &&
      visitId != payload.visit_id
    ) {

      continue;

    }

    measurements.push({

      row_number:
        i + 1,

      measurement_id:
        data[i][0],

      visit_id:
        data[i][1],

      person_code:
        data[i][4],

      person_name:
        data[i][5],

      gender:
        data[i][6],

      chest:
        data[i][10],

      top_length:
        data[i][11],

      waist:
        data[i][12],

      bottom_length:
        data[i][13],

      top_size:
        data[i][15],

      custom_flag:
        data[i][17],

      packing_status:
        data[i][19],

      delivery_status:
        data[i][20]

    });

  }

  return measurements;

}

function getProductionSummary() {

  const sheet = getSheet(
    CONFIG.SHEETS.MEASUREMENTS
  );

  const data =
    sheet.getDataRange().getValues();

  let summary = {};

  let customQueue = [];

  for(let i = 1; i < data.length; i++) {

    const personName =
      data[i][5];

    const personCode =
      data[i][4];

    const chest =
      data[i][10];

    const waist =
      data[i][12];

    const topSize =
      data[i][15];

    const customFlag =
      data[i][17];

    if(!summary[topSize]) {

      summary[topSize] = 0;

    }

    summary[topSize]++;

    if(customFlag === true) {

      customQueue.push({

        person_name:
          personName,

        person_code:
          personCode,

        chest:
          chest,

        waist:
          waist,

        size:
          topSize

      });

    }

  }

  return {

    summary,
    customQueue

  };

}

function markPacked(payload) {

  const sheet = getSheet(
    CONFIG.SHEETS.MEASUREMENTS
  );

  // PRODUCTION STATUS

  sheet.getRange(
    payload.row_number,
    19
  ).setValue(
    'Completed'
  );

  // PACKING STATUS

  sheet.getRange(
    payload.row_number,
    20
  ).setValue(
    'Packed'
  );

  return {

    success: true

  };

}

function markDelivered(payload) {

  const sheet = getSheet(
    CONFIG.SHEETS.MEASUREMENTS
  );

  sheet.getRange(
    payload.row_number,
    21
  ).setValue(
    'Delivered'
  );

  return {

    success: true

  };

}