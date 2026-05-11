loadClients();

loadProjects();

async function loadClients() {

  try {

    const response = await fetch(
      `${API_BASE_URL}?action=clients`
    );

    const result =
      await response.json();

    const clients =
      result.data;

    const dropdown =
      document.getElementById(
        'client_id'
      );

    clients.forEach(client => {

      dropdown.innerHTML += `

        <option value="${client.client_id}">

          ${client.client_name}

        </option>

      `;

    });

  } catch(err) {

    console.error(err);

  }

}

async function createProject() {

  const client_id =
    document.getElementById(
      'client_id'
    ).value;

  const project_name =
    document.getElementById(
      'project_name'
    ).value;

  const project_type =
    document.getElementById(
      'project_type'
    ).value;

  const academic_year =
    document.getElementById(
      'academic_year'
    ).value;

  try {

    await fetch(
      `${API_BASE_URL}?action=create-project`,
      {
        method: 'POST',

        mode: 'no-cors',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({

          client_id,
          project_name,
          project_type,
          academic_year

        })

      }
    );

    alert(
      'Project Saved Successfully'
    );

    location.reload();

  } catch(err) {

    console.error(err);

    alert('Network Error');

  }

}

async function loadProjects() {

  try {

    const response = await fetch(
      `${API_BASE_URL}?action=projects`
    );

    const result =
      await response.json();

    const projects =
      result.data;

    const container =
      document.getElementById(
        'projectList'
      );

    container.innerHTML = '';

    projects.forEach(project => {

      container.innerHTML += `

        <div class="border rounded-xl p-3">

          <h3 class="font-bold">

            ${project.project_name}

          </h3>

          <p class="text-sm text-gray-500 mt-1">

            ${project.project_type}

          </p>

          <p class="text-sm text-gray-400">

            ${project.academic_year}

          </p>

        </div>

      `;

    });

  } catch(err) {

    console.error(err);

  }

}