loadProjects();

loadVisits();

async function loadProjects() {

  try {

    const response = await fetch(
      `${API_BASE_URL}?action=projects`
    );

    const result =
      await response.json();

    const projects =
      result.data;

    const dropdown =
      document.getElementById(
        'project_id'
      );

    dropdown.innerHTML = `

      <option value="">

        Select Project

      </option>

    `;

    projects.forEach(project => {

      dropdown.innerHTML += `

        <option value="${project.project_id}">

          ${project.display_name}

        </option>

      `;

    });

  } catch(err) {

    console.error(err);

  }

}

async function createVisit() {

  const project_id =
    document.getElementById(
      'project_id'
    ).value;

  const visit_name =
    document.getElementById(
      'visit_name'
    ).value;

  const department =
    document.getElementById(
      'department'
    ).value;

  const division =
    document.getElementById(
      'division'
    ).value;

  const visit_date =
    document.getElementById(
      'visit_date'
    ).value;

  const location =
    document.getElementById(
      'location'
    ).value;

  const measurement_team =
    document.getElementById(
      'measurement_team'
    ).value;

  const notes =
    document.getElementById(
      'notes'
    ).value;

  if(
    !project_id ||
    !visit_name
  ) {

    alert(
      'Enter Required Fields'
    );

    return;

  }

  try {

    const response = await fetch(
      `${API_BASE_URL}?action=create-visit`,
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({

          project_id,
          visit_name,
          department,
          division,
          visit_date,
          location,
          measurement_team,
          notes

        })

      }
    );

    const result =
      await response.json();

    if(result.success) {

      showToast(
        'Visit Created'
      );

      clearForm();

      setTimeout(() => {

        loadVisits();

      }, 1000);

    } else {

      alert(
        result.message || 'Error'
      );

    }

  } catch(err) {

    console.error(err);

  }

}

function clearForm() {

  document.getElementById(
    'visit_name'
  ).value = '';

  document.getElementById(
    'department'
  ).value = '';

  document.getElementById(
    'division'
  ).value = '';

  document.getElementById(
    'location'
  ).value = '';

  document.getElementById(
    'measurement_team'
  ).value = '';

  document.getElementById(
    'notes'
  ).value = '';

}

async function loadVisits() {

  try {

    const response = await fetch(
      `${API_BASE_URL}?action=visits`
    );

    const result =
      await response.json();

    const visits =
      result.data;

    const container =
      document.getElementById(
        'visitList'
      );

    container.innerHTML = '';

    visits.reverse().forEach(visit => {

      let statusColor =
        'bg-gray-500';

      if(
        visit.status ===
        'In Progress'
      ) {

        statusColor =
          'bg-blue-500';

      }

      if(
        visit.status ===
        'Measurement Done'
      ) {

        statusColor =
          'bg-yellow-500';

      }

      if(
        visit.status ===
        'Packing Running'
      ) {

        statusColor =
          'bg-orange-500';

      }

      if(
        visit.status ===
        'Delivered'
      ) {

        statusColor =
          'bg-green-500';

      }

      container.innerHTML += `

        <div class="bg-white rounded-2xl p-4 shadow">

          <div class="flex justify-between items-start">

            <div>

              <h2 class="font-bold text-lg">

                ${visit.visit_name}

              </h2>

              <p class="text-sm text-gray-500 mt-1">

                ${visit.department}
                -
                ${visit.division}

              </p>

            </div>

            <span class="${statusColor} text-white text-xs px-3 py-1 rounded-xl">

              ${visit.status}

            </span>

          </div>

          <div class="mt-3 text-sm text-gray-600">

            Location:
            ${visit.location}

          </div>

          <div class="mt-1 text-sm text-gray-600">

            Team:
            ${visit.measurement_team}

          </div>

          <div class="mt-1 text-sm text-gray-600">

            Date:
            ${visit.visit_date}

          </div>

          <!-- STATUS -->

          <select
            onchange="updateVisitStatus(
              '${visit.visit_id}',
              this.value
            )"
            class="w-full border rounded-2xl px-4 py-3 mt-4"
          >

            <option value="Scheduled">

              Scheduled

            </option>

            <option value="In Progress">

              In Progress

            </option>

            <option value="Measurement Done">

              Measurement Done

            </option>

            <option value="Packing Running">

              Packing Running

            </option>

            <option value="Delivered">

              Delivered

            </option>

          </select>

          <!-- ACTIONS -->

          <div class="grid grid-cols-2 gap-3 mt-4">

            <button
              onclick='startMeasurement(${JSON.stringify(visit)})'
              class="bg-brand-primary text-white py-3 rounded-2xl font-bold"
            >

              START

            </button>

            <button
              onclick='openPacking(\"${visit.visit_id}\")'
              class="border border-brand-primary text-brand-primary py-3 rounded-2xl font-bold"
            >

              PACKING

            </button>

          </div>

        </div>

      `;

    });

  } catch(err) {

    console.error(err);

  }

}

async function updateVisitStatus(
  visitId,
  status
) {

  try {

    await fetch(
      `${API_BASE_URL}?action=update-visit-status`,
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({

          visit_id:
            visitId,

          status:
            status

        })

      }
    );

    showToast(
      'Status Updated'
    );

    setTimeout(() => {

      loadVisits();

    }, 1000);

  } catch(err) {

    console.error(err);

  }

}

function startMeasurement(visit) {

  localStorage.setItem(
    'active_session',
    JSON.stringify(visit)
  );

  window.location.href =
    'measurements.html';

}

function openPacking(visitId) {

  localStorage.setItem(
    'packing_visit',
    visitId
  );

  window.location.href =
    'packing.html';

}

function showToast(message) {

  const toast =
    document.createElement('div');

  toast.className =
    'fixed bottom-24 left-1/2 -translate-x-1/2 bg-brand-primary text-white px-5 py-3 rounded-2xl shadow-lg z-50';

  toast.innerText =
    message;

  document.body.appendChild(
    toast
  );

  setTimeout(() => {

    toast.remove();

  }, 1500);

}