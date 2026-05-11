generateStickers();

async function generateStickers() {

  try {

    const response = await fetch(
      `${API_BASE_URL}?action=measurements`
    );

    const result =
      await response.json();

    const measurements =
      result.data;

    const template =
      document.getElementById(
        'template'
      ).value;

    const container =
      document.getElementById(
        'stickerContainer'
      );

    // TEMPLATE SWITCH

    if(template === '2x4') {

      container.className =
        'grid grid-cols-2 gap-3';

    } else {

      container.className =
        'grid grid-cols-3 gap-2';

    }

    container.innerHTML = '';

    measurements.forEach(item => {

      const qrId =
        `qr-${item.measurement_id}`;

      container.innerHTML += `

        <div class="bg-white border rounded-xl p-2 shadow break-inside-avoid">

          <div class="text-center">

            <h2 class="font-bold text-sm leading-tight">

              ${item.person_name}

            </h2>

            <p class="text-xs text-gray-500 mt-1">

              ${item.person_code}

            </p>

          </div>

          <div class="flex justify-center my-2">

            <div id="${qrId}"></div>

          </div>

          <div class="text-center">

            <span class="bg-black text-white px-3 py-1 rounded-lg text-sm font-bold">

              ${item.top_size}

            </span>

          </div>

          <div class="mt-2 text-center text-xs text-gray-500">

            Chest:
            ${item.chest}"

            |

            Waist:
            ${item.waist}"

          </div>

          ${item.custom_flag
            ? `
              <div class="mt-2 text-center">

                <span class="bg-red-500 text-white text-xs px-2 py-1 rounded">

                  CUSTOM

                </span>

              </div>
            `
            : ''
          }

        </div>

      `;

      setTimeout(() => {

        new QRCode(
          document.getElementById(qrId),
          {

            text:

              `${item.person_code}|${item.top_size}`,

            width:
              template === '2x4'
                ? 70
                : 50,

            height:
              template === '2x4'
                ? 70
                : 50

          }
        );

      }, 100);

    });

  } catch(err) {

    console.error(err);

  }

}