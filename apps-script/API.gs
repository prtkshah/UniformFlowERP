function doGet(e) {

  return handleRequest_(e);

}

function doPost(e) {

  return handleRequest_(e);

}

function handleRequest_(e) {

  try {

    const action =
      e.parameter.action;

    let payload = {};

    // POST PAYLOAD

    if(
      e.postData &&
      e.postData.contents
    ) {

      payload =
        JSON.parse(
          e.postData.contents
        );

    }

    let response;

    // ROUTES

    if(action) {

      if(e.postData) {

        response =
          handlePostRoutes(
            action,
            payload
          );

      } else {

        response =
          handleGetRoutes(
            action
          );

      }

    } else {

      response = {

        success: false,

        message:
          'No Action'

      };

    }

    // JSON RESPONSE

    return ContentService
      .createTextOutput(

        JSON.stringify(
          response
        )

      )
      .setMimeType(
        ContentService
          .MimeType
          .JSON
      );

  } catch(err) {

    return ContentService
      .createTextOutput(

        JSON.stringify({

          success: false,

          message:
            err.toString()

        })

      )
      .setMimeType(
        ContentService
          .MimeType
          .JSON
      );

  }

}