loadDashboard();

async function loadDashboard() {

  try {

    // CLIENTS

    const clientResponse =
      await fetch(
        `${API_BASE_URL}?action=clients`
      );

    const clientResult =
      await clientResponse.json();

    document.getElementById(
      'clientCount'
    ).innerText =
      clientResult.data.length;

    // PROJECTS

    const projectResponse =
      await fetch(
        `${API_BASE_URL}?action=projects`
      );

    const projectResult =
      await projectResponse.json();

    document.getElementById(
      'projectCount'
    ).innerText =
      projectResult.data.length;

    // VISITS

    const visitResponse =
      await fetch(
        `${API_BASE_URL}?action=visits`
      );

    const visitResult =
      await visitResponse.json();

    document.getElementById(
      'visitCount'
    ).innerText =
      visitResult.data.length;

    // MEASUREMENTS

    const measurementResponse =
      await fetch(
        `${API_BASE_URL}?action=measurements`
      );

    const measurementResult =
      await measurementResponse.json();

    const measurements =
      measurementResult.data;

    document.getElementById(
      'measurementCount'
    ).innerText =
      measurements.length;

    // PACKED

    const packed =
      measurements.filter(item => {

        return (
          item.packing_status ===
          'Packed'
        );

      }).length;

    document.getElementById(
      'packedCount'
    ).innerText =
      packed;

    // DELIVERED

    const delivered =
      measurements.filter(item => {

        return (
          item.delivery_status ===
          'Delivered'
        );

      }).length;

    document.getElementById(
      'deliveredCount'
    ).innerText =
      delivered;

    // CUSTOM

    const custom =
      measurements.filter(item => {

        return (
          item.custom_flag === true
        );

      }).length;

    document.getElementById(
      'customCount'
    ).innerText =
      custom;

  } catch(err) {

    console.error(err);

  }

}