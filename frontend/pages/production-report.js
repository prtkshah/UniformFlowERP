let currentMeasurements = [];

loadVisits();

async function loadVisits() {

  try {

    const response = await fetch(
      `${API_BASE_URL}?action=visits`
    );

    const result =
      await response.json();

    const visits =
      result.data;

    const dropdown =
      document.getElementById(
        'visitFilter'
      );

    dropdown.innerHTML = `

      <option value="">

        Select Session

      </option>

    `;

    visits.reverse().forEach(visit => {

      dropdown.innerHTML += `

        <option value="${visit.visit_id}">

          ${visit.visit_name}

        </option>

      `;

    });

  } catch(err) {

    console.error(err);

  }

}

async function loadReport() {

  try {

    const visitId =
      document.getElementById(
        'visitFilter'
      ).value;

    if(!visitId) {

      return;

    }

    const response = await fetch(
      `${API_BASE_URL}?action=measurements&visit_id=${visitId}`
    );

    const result =
      await response.json();

    currentMeasurements =
      result.data;

    generateSummary(
      currentMeasurements
    );

    generateSizeTable(
      currentMeasurements
    );

    generateCustomQueue(
      currentMeasurements
    );

  } catch(err) {

    console.error(err);

  }

}

function generateSummary(measurements) {

  const total =
    measurements.length;

  const packed =
    measurements.filter(item => {

      return (
        item.packing_status ===
        'Packed'
      );

    }).length;

  const delivered =
    measurements.filter(item => {

      return (
        item.delivery_status ===
        'Delivered'
      );

    }).length;

  const custom =
    measurements.filter(item => {

      return (
        item.custom_flag === true
      );

    }).length;

  const pending =
    total - packed;

  document.getElementById(
    'summaryCards'
  ).innerHTML = `

    <div class="bg-white rounded-2xl p-4 shadow">

      <p class="text-gray-500 text-sm">

        Total Measurements

      </p>

      <h2 class="text-3xl font-bold mt-2">

        ${total}

      </h2>

    </div>

    <div class="bg-white rounded-2xl p-4 shadow">

      <p class="text-gray-500 text-sm">

        Packed

      </p>

      <h2 class="text-3xl font-bold mt-2 text-blue-600">

        ${packed}

      </h2>

    </div>

    <div class="bg-white rounded-2xl p-4 shadow">

      <p class="text-gray-500 text-sm">

        Delivered

      </p>

      <h2 class="text-3xl font-bold mt-2 text-green-600">

        ${delivered}

      </h2>

    </div>

    <div class="bg-white rounded-2xl p-4 shadow">

      <p class="text-gray-500 text-sm">

        Custom Sizes

      </p>

      <h2 class="text-3xl font-bold mt-2 text-red-600">

        ${custom}

      </h2>

    </div>

    <div class="bg-white rounded-2xl p-4 shadow col-span-2">

      <p class="text-gray-500 text-sm">

        Pending Packing

      </p>

      <h2 class="text-3xl font-bold mt-2 text-yellow-600">

        ${pending}

      </h2>

    </div>

  `;

}

function generateSizeTable(measurements) {

  const summary = {};

  measurements.forEach(item => {

    if(!summary[item.top_size]) {

      summary[item.top_size] = 0;

    }

    summary[item.top_size]++;

  });

  let html = `

    <table class="w-full">

      <thead class="bg-gray-100">

        <tr>

          <th class="text-left p-4">

            Size

          </th>

          <th class="text-right p-4">

            Qty

          </th>

        </tr>

      </thead>

      <tbody>

  `;

  Object.keys(summary)
    .sort()
    .forEach(size => {

      html += `

        <tr class="border-t">

          <td class="p-4 font-semibold">

            ${size}

          </td>

          <td class="p-4 text-right font-bold">

            ${summary[size]}

          </td>

        </tr>

      `;

    });

  html += `

      </tbody>

    </table>

  `;

  document.getElementById(
    'sizeTable'
  ).innerHTML = html;

}

function generateCustomQueue(measurements) {

  const custom =
    measurements.filter(item => {

      return (
        item.custom_flag === true
      );

    });

  if(custom.length === 0) {

    document.getElementById(
      'customQueue'
    ).innerHTML = `

      <div class="p-4 text-gray-500">

        No Custom Sizes

      </div>

    `;

    return;

  }

  let html = '';

  custom.forEach(item => {

    html += `

      <div class="p-4">

        <div class="flex justify-between items-start">

          <div>

            <h3 class="font-bold">

              ${item.person_name}

            </h3>

            <p class="text-sm text-gray-500 mt-1">

              ${item.person_code}

            </p>

          </div>

          <span class="bg-red-500 text-white px-3 py-1 rounded-xl text-xs">

            CUSTOM

          </span>

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

  document.getElementById(
    'customQueue'
  ).innerHTML = html;

}

function exportCSV() {

  if(currentMeasurements.length === 0) {

    alert(
      'No Data Available'
    );

    return;

  }

  let csv = `

Person Code,
Person Name,
Gender,
Chest,
Top Length,
Waist,
Bottom Length,
Size,
Packing Status,
Delivery Status

`;

  currentMeasurements.forEach(item => {

    csv += `

${item.person_code},
${item.person_name},
${item.gender},
${item.chest},
${item.top_length},
${item.waist},
${item.bottom_length},
${item.top_size},
${item.packing_status},
${item.delivery_status}

`;

  });

  const blob =
    new Blob(
      [csv],
      {
        type: 'text/csv'
      }
    );

  const url =
    window.URL.createObjectURL(blob);

  const a =
    document.createElement('a');

  a.href = url;

  a.download =
    'production-report.csv';

  a.click();

  window.URL.revokeObjectURL(
    url
  );

}