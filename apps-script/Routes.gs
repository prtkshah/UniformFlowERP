function handleGetRoutes(action) {

  switch(action) {

    case 'clients':

      return {

        success: true,

        data:
          getClients()

      };

    case 'projects':

      return {

        success: true,

        data:
          getProjects()

      };

    case 'visits':

      return {

        success: true,

        data:
          getVisits()

      };

    case 'measurements':

      return {

        success: true,

        data:
          getMeasurements()

      };

    case 'production-summary':

      return {

        success: true,

        data:
          getProductionSummary()

      };

    default:

      return {

        success: false,

        message:
          'Invalid GET Route'

      };

  }

}

function handlePostRoutes(
  action,
  payload
) {

  switch(action) {

    // CLIENTS

    case 'create-client':

      return {

        success: true,

        data:
          createClient(payload)

      };

    // PROJECTS

    case 'create-project':

      return {

        success: true,

        data:
          createProject(payload)

      };

    // VISITS

    case 'create-visit':

      return {

        success: true,

        data:
          createVisit(payload)

      };

    case 'update-visit-status':

      return {

        success: true,

        data:
          updateVisitStatus(payload)

      };

    // MEASUREMENTS

    case 'create-measurement':

      return {

        success: true,

        data:
          createMeasurement(payload)

      };

    case 'update-measurement':

      return {

        success: true,

        data:
          updateMeasurement(payload)

      };

    // PACKING

    case 'mark-packed':

      return {

        success: true,

        data:
          markPacked(payload)

      };

    // DELIVERY

    case 'mark-delivered':

      return {

        success: true,

        data:
          markDelivered(payload)

      };

    default:

      return {

        success: false,

        message:
          'Invalid POST Route'

      };

  }

}