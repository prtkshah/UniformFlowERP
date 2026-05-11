const activeSession = JSON.parse(
  localStorage.getItem(
    'active_session'
  )
);

if(!activeSession) {

  alert(
    'No Active Session Found'
  );

  window.location.href =
    'visits.html';

}

let allMeasurements = [];

document.getElementById(
  'sessionInfo'
).innerHTML = `

  <div class="space-y-1">

    <p>

      <strong>Visit:</strong>

      ${activeSession.visit_name}

    </p>

    <p>

      <strong>Location:</strong>

      ${activeSession.location}

    </p>

    <p>

      <strong>Team:</strong>

      ${activeSession.measurement_team}

    </p>

  </div>

`;

document.getElementById(
  'person_code'
).focus();

setupAutoNext();

setupLiveSizePreview();

loadMeasurements();

syncOfflineMeasurements();

setupNetworkStatus();

function setupAutoNext() {

  const fields = [

    'person_code',
    'person_name',
    'gender',
    'chest',
    'top_length',
    'waist',
    'bottom_length'

  ];

  fields.forEach((field, index) => {

    document.getElementById(field)
      .addEventListener(
        'keydown',
        function(e) {

          if(e.key === 'Enter') {

            e.preventDefault();

            const nextField =
              fields[index + 1];

            if(nextField) {

              document.getElementById(
                nextField
              ).focus();

            } else {

              createMeasurement();

            }

          }

        }
      );

  });

}

function setupLiveSizePreview() {

  const fields = [

    'gender',
    'chest',
    'top_length',
    'waist',
    'bottom_length'

  ];

  fields.forEach(field => {

    document.getElementById(field)
      .addEventListener(
        'input',
        calculateLiveSize
      );

  });

}

async function calculateLiveSize() {

  const gender =
    document.getElementById(
      'gender'
    ).value;

  const chest =
    document.getElementById(
      'chest'
    ).value;

  const top_length =
    document.getElementById(
      'top_length'
    ).value;

  const waist =
    document.getElementById(
      'waist'
    ).value;

  const bottom_length =
    document.getElementById(
      'bottom_length'
    ).value;

  if(
    !chest ||
    !waist ||
    !top_length ||
    !bottom_length
  ) {

    return;

  }

  try {

    const response = await fetch(
      `${API_BASE_URL}?action=size-preview`,
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({

          gender,
          chest,
          top_length,
          waist,
          bottom_length

        })

      }
    );

    const result =
      await response.json();

    document.getElementById(
      'sizePreview'
    ).classList.remove(
      'hidden'
    );

    document.getElementById(
      'liveSize'
    ).innerText =
      result.data.size;

    if(result.data.custom) {

      document.getElementById(
        'customBadge'
      ).classList.remove(
        'hidden'
      );

    } else {

      document.getElementById(
        'customBadge'
      ).classList.add(
        'hidden'
      );

    }

  } catch(err) {

    console.error(err);

  }

}

async function createMeasurement() {

  const person_code =
    document.getElementById(
      'person_code'
    ).value;

  const person_name =
    document.getElementById(
      'person_name'
    ).value;

  const gender =
    document.getElementById(
      'gender'
    ).value;

  const chest =
    document.getElementById(
      'chest'
    ).value;

  const top_length =
    document.getElementById(
      'top_length'
    ).value;

  const waist =
    document.getElementById(
      'waist'
    ).value;

  const bottom_length =
    document.getElementById(
      'bottom_length'
    ).value;

  if(
    !person_code ||
    !person_name
  ) {

    alert(
      'Enter Person Details'
    );

    return;

  }

  const payload = {

    visit_id:
      activeSession.visit_id,

    person_code,
    person_name,
    gender,
    chest,
    top_length,
    waist,
    bottom_length

  };

  // OFFLINE SAVE

  if(!navigator.onLine) {

    let pending =
      JSON.parse(
        localStorage.getItem(
          'offline_measurements'
        ) || '[]'
      );

    pending.push(payload);

    localStorage.setItem(
      'offline_measurements',
      JSON.stringify(pending)
    );

    showToast(
      'Saved Offline'
    );

    clearForm();

    return;

  }

  try {

    await fetch(
      `${API_BASE_URL}?action=create-measurement`,
      {
        method: 'POST',

        mode: 'no-cors',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(payload)

      }
    );

    showToast(
      'Measurement Saved'
    );

    clearForm();

    loadMeasurements();

  } catch(err) {

    console.error(err);

  }

}

function clearForm() {

  document.getElementById(
    'person_code'
  ).value = '';

  document.getElementById(
    'person_name'
  ).value = '';

  document.getElementById(
    'chest'
  ).value = '';

  document.getElementById(
    'top_length'
  ).value = '';

  document.getElementById(
    'waist'
  ).value = '';

  document.getElementById(
    'bottom_length'
  ).value = '';

  document.getElementById(
    'sizePreview'
  ).classList.add(
    'hidden'
  );

  document.getElementById(
    'person_code'
  ).focus();

}

async function loadMeasurements() {

  try {

    const response = await fetch(
      `${API_BASE_URL}?action=measurements&visit_id=${activeSession.visit_id}`
    );

    const result =
      await response.json();

    allMeasurements =
      result.data;

    const search =
      document.getElementById(
        'searchMeasurement'
      ).value.toLowerCase();

    let filtered =
      allMeasurements.filter(item => {

        return (

          item.person_name
            .toLowerCase()
            .includes(search)

          ||

          item.person_code
            .toLowerCase()
            .includes(search)

        );

      });

    const container =
      document.getElementById(
        'measurementList'
      );

    document.getElementById(
      'entryCount'
    ).innerText =
      `${filtered.length} Entries`;

    container.innerHTML = '';

    filtered
      .reverse()
      .slice(0, 20)
      .forEach(item => {

      container.innerHTML += `

        <div class="border rounded-xl p-3 bg-white shadow">

          <div class="flex justify-between items-start">

            <div>

              <h3 class="font-bold">

                ${item.person_name}

              </h3>

              <p class="text-sm text-gray-500">

                ${item.person_code}

              </p>

            </div>

            <div class="flex gap-2">

              <span class="bg-brand-primary text-white text-xs px-2 py-1 rounded">

                ${item.top_size}

              </span>

              <button
                onclick='openEdit(${JSON.stringify(item)})'
                class="bg-gray-200 px-2 py-1 rounded text-xs"
              >

                EDIT

              </button>

            </div>

          </div>

          <div class="flex gap-2 mt-3 flex-wrap text-sm">

            <span class="bg-gray-200 px-2 py-1 rounded">

              Chest:
              ${item.chest}"

            </span>

            <span class="bg-gray-200 px-2 py-1 rounded">

              Waist:
              ${item.waist}"

            </span>

          </div>

        </div>

      `;

    });

  } catch(err) {

    console.error(err);

  }

}

function openEdit(item) {

  const person_name =
    prompt(
      'Person Name',
      item.person_name
    );

  if(person_name === null) return;

  const chest =
    prompt(
      'Chest',
      item.chest
    );

  const waist =
    prompt(
      'Waist',
      item.waist
    );

  const top_length =
    prompt(
      'Top Length',
      item.top_length
    );

  const bottom_length =
    prompt(
      'Bottom Length',
      item.bottom_length
    );

  updateMeasurement({

    row_number:
      item.row_number,

    person_code:
      item.person_code,

    person_name,

    gender:
      item.gender,

    chest,

    waist,

    top_length,

    bottom_length

  });

}

async function updateMeasurement(payload) {

  try {

    await fetch(
      `${API_BASE_URL}?action=update-measurement`,
      {
        method: 'POST',

        mode: 'no-cors',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(payload)

      }
    );

    showToast(
      'Measurement Updated'
    );

    setTimeout(() => {

      loadMeasurements();

    }, 1000);

  } catch(err) {

    console.error(err);

  }

}

async function syncOfflineMeasurements() {

  if(!navigator.onLine) {

    return;

  }

  let pending =
    JSON.parse(
      localStorage.getItem(
        'offline_measurements'
      ) || '[]'
    );

  if(pending.length === 0) {

    return;

  }

  showToast(
    `Syncing ${pending.length} Offline Entries`
  );

  for(const payload of pending) {

    try {

      await fetch(
        `${API_BASE_URL}?action=create-measurement`,
        {
          method: 'POST',

          mode: 'no-cors',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify(payload)

        }
      );

    } catch(err) {

      console.error(err);

      return;

    }

  }

  localStorage.removeItem(
    'offline_measurements'
  );

  showToast(
    'Offline Sync Complete'
  );

  loadMeasurements();

}

function showToast(message) {

  const toast =
    document.createElement('div');

  toast.className =
    'fixed bottom-32 left-1/2 -translate-x-1/2 bg-brand-primary text-white px-5 py-3 rounded-2xl shadow-lg z-50';

  toast.innerText =
    message;

  document.body.appendChild(
    toast
  );

  setTimeout(() => {

    toast.remove();

  }, 1500);

}

function changeSession() {

  localStorage.removeItem(
    'active_session'
  );

  window.location.href =
    'visits.html';

}

function setupNetworkStatus() {

  updateNetworkUI();

  window.addEventListener(
    'online',
    () => {

      updateNetworkUI();

      syncOfflineMeasurements();

    }
  );

  window.addEventListener(
    'offline',
    () => {

      updateNetworkUI();

    }
  );

}

function updateNetworkUI() {

  const statusBar =
    document.getElementById(
      'networkStatus'
    );

  if(navigator.onLine) {

    statusBar.className =
      'bg-green-500 text-white text-center py-2 text-sm font-semibold';

    statusBar.innerText =
      'ONLINE';

  } else {

    statusBar.className =
      'bg-red-500 text-white text-center py-2 text-sm font-semibold';

    statusBar.innerText =
      'OFFLINE MODE';

  }

}