loadClients();

async function createClient() {

  const client_name =
    document.getElementById(
      'client_name'
    ).value;

  const client_type =
    document.getElementById(
      'client_type'
    ).value;

  const contact_person =
    document.getElementById(
      'contact_person'
    ).value;

  const phone =
    document.getElementById(
      'phone'
    ).value;

  const address =
    document.getElementById(
      'address'
    ).value;

  if(!client_name) {

    alert(
      'Enter Client Name'
    );

    return;

  }

  try {

    await fetch(
      `${API_BASE_URL}?action=create-client`,
      {
        method: 'POST',

        mode: 'no-cors',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({

          client_name,
          client_type,
          contact_person,
          phone,
          address

        })

      }
    );

    showToast(
      'Client Created'
    );

    clearForm();

    setTimeout(() => {

      loadClients();

    }, 1000);

  } catch(err) {

    console.error(err);

  }

}

async function loadClients() {

  try {

    const response = await fetch(
      `${API_BASE_URL}?action=clients`
    );

    const result =
      await response.json();

    const clients =
      result.data;

    const container =
      document.getElementById(
        'clientList'
      );

    container.innerHTML = '';

    clients.reverse().forEach(client => {

      container.innerHTML += `

        <div class="bg-white rounded-2xl p-4 shadow">

          <div class="flex justify-between items-start">

            <div>

              <h2 class="font-bold text-lg">

                ${client.client_name}

              </h2>

              <p class="text-sm text-gray-500 mt-1">

                ${client.client_type}

              </p>

            </div>

            <span class="bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-xl text-xs">

              CLIENT

            </span>

          </div>

          <div class="mt-4 space-y-2 text-sm">

            <p>

              <strong>Contact:</strong>

              ${client.contact_person}

            </p>

            <p>

              <strong>Phone:</strong>

              ${client.phone}

            </p>

            <p>

              <strong>Address:</strong>

              ${client.address}

            </p>

          </div>

        </div>

      `;

    });

  } catch(err) {

    console.error(err);

  }

}

function clearForm() {

  document.getElementById(
    'client_name'
  ).value = '';

  document.getElementById(
    'contact_person'
  ).value = '';

  document.getElementById(
    'phone'
  ).value = '';

  document.getElementById(
    'address'
  ).value = '';

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