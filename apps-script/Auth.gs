function loginUser(payload) {

  const sheet = getSheet(CONFIG.SHEETS.USERS);

  const data = sheet.getDataRange().getValues();

  for(let i = 1; i < data.length; i++) {

    const row = data[i];

    const email = row[2];
    const password = row[3];
    const active = row[5];

    if(
      email == payload.email &&
      password == payload.password &&
      active == true
    ) {

      return {
        success: true,
        user: {
          user_id: row[0],
          name: row[1],
          email: row[2],
          role: row[4]
        }
      };

    }

  }

  return {
    success: false
  };

}