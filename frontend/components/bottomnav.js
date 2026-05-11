function renderBottomNav(activePage = '') {

  return `

    <nav class="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">

      <div class="grid grid-cols-4 text-center">

        <a
          href="../dashboard.html"
          class="p-3 ${activePage === 'dashboard'
            ? 'text-black font-bold'
            : 'text-gray-500'}"
        >
          Dashboard
        </a>

        <a
          href="./projects.html"
          class="p-3 ${activePage === 'projects'
            ? 'text-black font-bold'
            : 'text-gray-500'}"
        >
          Projects
        </a>

        <a
          href="./visits.html"
          class="p-3 ${activePage === 'visits'
            ? 'text-black font-bold'
            : 'text-gray-500'}"
        >
          Visits
        </a>

        <a
          href="./measurements.html"
          class="p-3 ${activePage === 'measurements'
            ? 'text-black font-bold'
            : 'text-gray-500'}"
        >
          Measure
        </a>

      </div>

    </nav>

  `;

}