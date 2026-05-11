function jsonResponse(data) {

  const output = ContentService
    .createTextOutput(
      JSON.stringify(data)
    );

  output.setMimeType(
    ContentService.MimeType.JSON
  );

  return output;

}

function successResponse(
  data = {},
  message = 'Success'
) {

  return jsonResponse({
    success: true,
    message,
    data
  });

}

function errorResponse(
  message = 'Error'
) {

  return jsonResponse({
    success: false,
    message
  });

}