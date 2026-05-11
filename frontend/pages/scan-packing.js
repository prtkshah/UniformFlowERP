startScanner();

function startScanner() {

  const html5QrCode =
    new Html5Qrcode(
      "reader"
    );

  html5QrCode.start(

    {
      facingMode: "environment"
    },

    {
      fps: 10,
      qrbox: 250
    },

    async (decodedText) => {

      html5QrCode.stop();

      handleScan(decodedText);

    },

    (errorMessage) => {

      // ignore scan errors

    }

  ).catch(err => {

    console.error(err);

  });

}

async function handleScan(qrText) {

  try {

    const personCode =
      qrText.split('|')[0];

    const response = await fetch(
      `${API_BASE_URL}?action=measurements`
    );

    const result =
      await response.json();

    const measurements =
      result.data;

    const found =
      measurements.find(item => {

        return (
          item.person_code ===
          personCode
        );

      });

    const container =
      document.getElementById(
        'scanResult'
      );

    if(!found) {

      container.innerHTML = `

        <div class="bg-red-100 border border-red-300 text-red-700 rounded-2xl p-4">

          Record Not Found

        </div>

      `;

      restartScanner();

      return;

    }

    const isPacked =
      found.packing_status ===
      'Packed';

    container.innerHTML = `

      <div class="bg-white rounded-2xl p-4 shadow">

        <div class="flex justify-between items-start">

          <div>

            <h2 class="text-xl font-bold">

              ${found.person_name}

            </h2>

            <p class="text-sm text-gray-500 mt-1">

              ${found.person_code}

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

        <div class="flex gap-2 mt-4 flex-wrap">

          <span class="bg-brand-primary text-white px-3 py-1 rounded-lg text-sm">

            ${found.top_size}

          </span>

          <span class="bg-gray-200 px-2 py-1 rounded text-sm">

            Chest:
            ${found.chest}"

          </span>

          <span class="bg-gray-200 px-2 py-1 rounded text-sm">

            Waist:
            ${found.waist}"

          </span>

        </div>

        ${
          !isPacked
            ? `
              <button
                onclick="markPacked(${found.row_number})"
                class="w-full mt-5 bg-brand-primary text-white py-4 rounded-2xl font-bold"
              >

                MARK PACKED

              </button>
            `
            : `
              <div class="mt-5 bg-green-100 text-green-700 rounded-2xl p-4 text-center font-bold">

                Already Packed

              </div>
            `
        }

      </div>

    `;

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

    document.getElementById(
      'scanResult'
    ).innerHTML += `

      <div class="bg-green-100 text-green-700 rounded-2xl p-4 text-center font-bold">

        Packed Successfully

      </div>

    `;

    setTimeout(() => {

      restartScanner();

    }, 1500);

  } catch(err) {

    console.error(err);

  }

}

function restartScanner() {

  setTimeout(() => {

    document.getElementById(
      'scanResult'
    ).innerHTML = '';

    startScanner();

  }, 1500);

}