const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');
const navLogo = document.querySelector('#navbar__logo');

const mobileMenu = () => {
  menu.classList.toggle('is-active');
  menuLinks.classList.toggle('active');
};
menu.addEventListener('click', mobileMenu);

const highlightMenu = () => {
  const elem = document.querySelector('.highlight');
  const homeMenu = document.querySelector('#home-page');
  const aboutMenu = document.querySelector('#about-page');
  const servicesMenu = document.querySelector('#services-page');
  let scrollPos = window.scrollY;
 
  if (window.innerWidth > 960 && scrollPos < 600) {
    homeMenu.classList.add('highlight');
    aboutMenu.classList.remove('highlight');
    return;
  } else if (window.innerWidth > 960 && scrollPos < 1400) {
    aboutMenu.classList.add('highlight');
    homeMenu.classList.remove('highlight');
    servicesMenu.classList.remove('highlight');
    return;
  } else if (window.innerWidth > 960 && scrollPos < 2345) {
    servicesMenu.classList.add('highlight');
    aboutMenu.classList.remove('highlight');
    return;
  }

  if ((elem && window.innerWIdth < 960 && scrollPos < 600) || elem) {
    elem.classList.remove('highlight');
  }
};

window.addEventListener('scroll', highlightMenu);
window.addEventListener('click', highlightMenu);

const hideMobileMenu = () => {
  const menuBars = document.querySelector('.is-active');
  if (window.innerWidth <= 768 && menuBars) {
    menu.classList.toggle('is-active');
    menuLinks.classList.remove('active');
  }
};

menuLinks.addEventListener('click', hideMobileMenu);
navLogo.addEventListener('click', hideMobileMenu);

const reqUrl = `https://catalog.api.2gis.com/get_dist_matrix?key=rubfpx2151&version=2.0`;
const map = new mapgl.Map('container', {
    center: [55.26553, 25.23399],
    zoom: 10,
    key: 'bfd8bbca-8abf-11ea-b033-5fa57aae2de7',
});
function renderMarkersWithData(routes) {
    function generateTooltipText(index) {
        const data = routes.find((item) => item.target_id === index);
        if (!data) return undefined;
        return `distance: ${data.distance.toLocaleString()} m.<br>by car: ${Math.round(
            data.duration / 60,
        )} min.`;
    }
    const tooltipEl = document.getElementById('tooltip');
    const startPoint = points.shift();
    const marker = new mapgl.Marker(map, {
        coordinates: [startPoint.lon, startPoint.lat],
        label: {
            text: 'Point of departure',
            fontSize: 13,
        },
    });
    points.forEach((point, index) => {
        const marker = new mapgl.Marker(map, {
            coordinates: [point.lon, point.lat],
            icon: 'https://docs.2gis.com/img/dotMarker.svg',
        });
        marker.on('mouseover', (event) => {
            // Offset in pixels
            const offset = 5;
            tooltipEl.style.top = `${event.point[1] + offset}px`;
            tooltipEl.style.left = `${event.point[0] + offset}px`;
            tooltipEl.innerHTML = generateTooltipText(index + 1);
            tooltipEl.style.display = 'block';
        });
        marker.on('mouseout', (e) => {
            tooltipEl.style.display = 'none';
        });
    });
}
