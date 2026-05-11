const savedVisit =
  localStorage.getItem(
    'packing_visit'
  );

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

    if(savedVisit) {

      dropdown.value =
        savedVisit;

    }

    if(savedVisit) {

      loadPackingData();

    }

  } catch(err) {

    console.error(err);

  }

}

async function loadPackingData() {

  try {

    const visitId =
      document.getElementById(
        'visitFilter'
      ).value;

    if(!visitId) {

      document.getElementById(
        'packingList'
      ).innerHTML = '';

      return;

    }

    const response = await fetch(
      `${API_BASE_URL}?action=measurements&visit_id=${visitId}`
    );

    const result =
      await response.json();

    let measurements =
      result.data;

    const search =
      document.getElementById(
        'searchInput'
      ).value.toLowerCase();

    measurements =
      measurements.filter(item => {

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
        'packingList'
      );

    container.innerHTML = '';

    measurements.reverse().forEach(item => {

      const isPacked =
        item.packing_status === 'Packed';

      container.innerHTML += `

        <div class="bg-white rounded-2xl p-4 shadow">

          <div class="flex items-start justify-between">

            <div>

              <h2 class="font-bold text-lg">

                ${item.person_name}

              </h2>

              <p class="text-sm text-gray-500">

                ${item.person_code}

              </p>

            </div>

            <span class="${
              isPacked
                ? 'bg-green-500'
                : 'bg-yellow-500'
            } text-white text-xs px-3 py-1 rounded-xl">

              ${
                isPacked
                  ? 'PACKED'
                  : 'PENDING'
              }

            </span>

          </div>

          <div class="flex gap-2 mt-3 flex-wrap">

            <span class="bg-brand-primary text-white px-3 py-1 rounded-lg text-sm">

              ${item.top_size}

            </span>

            <span class="bg-gray-200 px-2 py-1 rounded text-sm">

              Chest:
              ${item.chest}"

            </span>

            <span class="bg-gray-200 px-2 py-1 rounded text-sm">

              Waist:
              ${item.waist}"

            </span>

          </div>

          ${
            !isPacked
              ? `
                <button
                  onclick="markPacked(${item.row_number})"
                  class="w-full mt-4 bg-brand-primary text-white py-3 rounded-2xl font-bold"
                >

                  MARK PACKED

                </button>
              `
              : `
                <button
                  onclick="openDelivery('${visitId}')"
                  class="w-full mt-4 border border-brand-primary text-brand-primary py-3 rounded-2xl font-bold"
                >

                  OPEN DELIVERY

                </button>
              `
          }

        </div>

      `;

    });

  } catch(err) {

    console.error(err);

  }

}

async function markPacked(rowNumber) {

  try {

    await fetch(
      `${API_BASE_URL}?action=mark-packed`,
      {
        method: 'POST',

        mode: 'no-cors',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({

          row_number:
            rowNumber

        })

      }
    );

    showToast(
      'Marked Packed'
    );

    setTimeout(() => {

      loadPackingData();

    }, 1000);

  } catch(err) {

    console.error(err);

  }

}

function openDelivery(visitId) {

  localStorage.setItem(
    'delivery_visit',
    visitId
  );

  window.location.href =
    'delivery.html';

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