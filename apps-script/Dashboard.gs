function getDashboardStats() {

  const measurementsSheet =
    getSheet(
      CONFIG.SHEETS.MEASUREMENTS
    );

  const visitsSheet =
    getSheet(
      CONFIG.SHEETS.VISITS
    );

  const projectsSheet =
    getSheet(
      CONFIG.SHEETS.PROJECTS
    );

  const clientsSheet =
    getSheet(
      CONFIG.SHEETS.CLIENTS
    );

  const measurements =
    measurementsSheet
      .getDataRange()
      .getValues();

  const visits =
    visitsSheet
      .getDataRange()
      .getValues();

  const projects =
    projectsSheet
      .getDataRange()
      .getValues();

  const clients =
    clientsSheet
      .getDataRange()
      .getValues();

  let totalMeasurements = 0;

  let packedCount = 0;

  let deliveredCount = 0;

  let customCount = 0;

  for(let i = 1; i < measurements.length; i++) {

    totalMeasurements++;

    if(
      measurements[i][19] === 'Packed'
    ) {

      packedCount++;

    }

    if(
      measurements[i][20] === 'Delivered'
    ) {

      deliveredCount++;

    }

    if(
      measurements[i][17] === true
    ) {

      customCount++;

    }

  }

  return {

    clients:
      clients.length - 1,

    projects:
      projects.length - 1,

    visits:
      visits.length - 1,

    measurements:
      totalMeasurements,

    packed:
      packedCount,

    delivered:
      deliveredCount,

    custom:
      customCount

  };

}