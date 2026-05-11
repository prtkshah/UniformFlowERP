loadProductionSummary();

async function loadProductionSummary() {

  try {

    const response = await fetch(
      `${API_BASE_URL}?action=production-summary`
    );

    const result =
      await response.json();

    const summary =
      result.data.summary;

    const customQueue =
      result.data.customQueue;

    const container =
      document.getElementById(
        'productionSummary'
      );

    container.innerHTML = '';

    // SIZE SUMMARY CARD

    let summaryHTML = `

      <div class="bg-white rounded-2xl p-4 shadow">

        <h2 class="text-xl font-bold mb-4">

          Size Summary

        </h2>

        <div class="grid grid-cols-2 gap-3">

    `;

    for(const size in summary) {

      summaryHTML += `

        <div class="bg-black text-white rounded-2xl p-4 text-center">

          <p class="text-sm text-gray-300">

            Size

          </p>

          <h3 class="text-3xl font-bold mt-1">

            ${size}

          </h3>

          <p class="mt-2 text-lg">

            ${summary[size]}

          </p>

        </div>

      `;

    }

    summaryHTML += `

        </div>

      </div>

    `;

    container.innerHTML +=
      summaryHTML;

    // CUSTOM QUEUE

    let customHTML = `

      <div class="bg-white rounded-2xl p-4 shadow">

        <h2 class="text-xl font-bold mb-4">

          Custom Size Queue

        </h2>

    `;

    if(customQueue.length === 0) {

      customHTML += `

        <div class="text-gray-500 text-sm">

          No Custom Sizes

        </div>

      `;

    }

    customQueue.forEach(item => {

      customHTML += `

        <div class="border rounded-2xl p-4 mb-3">

          <div class="flex items-start justify-between">

            <div>

              <h3 class="font-bold text-lg">

                ${item.person_name}

              </h3>

              <p class="text-sm text-gray-500">

                ${item.person_code}

              </p>

            </div>

            <span class="bg-red-500 text-white text-xs px-3 py-1 rounded-xl">

              CUSTOM

            </span>

          </div>

          <div class="flex gap-2 mt-3 flex-wrap">

            <span class="bg-gray-200 px-2 py-1 rounded text-sm">

              Chest:
              ${item.chest}"

            </span>

            <span class="bg-gray-200 px-2 py-1 rounded text-sm">

              Waist:
              ${item.waist}"

            </span>

          </div>

        </div>

      `;

    });

    customHTML += `
      </div>
    `;

    container.innerHTML +=
      customHTML;

  } catch(err) {

    console.error(err);

  }

}