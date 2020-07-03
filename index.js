import { getRandomBreedData, getBreedData } from './src/list.js';
import { breedSlugToPath } from './src/routing.js';
import { breedDataToHTMLFrag, imgDataToHTMLFrag, favsToHTMLFrag } from './src/templating.js';
import { addFav, getFavs} from './src/faves.js';

window.onhashchange = scanHashAndRoute;

document.onreadystatechange = scanHashAndRoute;

/**
 * Plash Speed router
 * https://www.youtube.com/watch?v=Q591qHMJgSI
 */
function scanHashAndRoute() {
  const locationHash = window.location.hash;
  const hashes = locationHash.split('#/').pop().split('/');
  const [action, breedSlug, imgName] = hashes;
  const contentEl = document.querySelector('.content');
  const availableActions = ['home', 'filter', 'detail', 'favs', 'fav-add'];

  while(contentEl.firstChild) {
    contentEl.removeChild(contentEl.firstChild);
  }

  if (hashes.length === 0 || !availableActions.includes(action)) {
    routeHome();
    return;
  }

  const routeMap = {
    'home': routeHome,
    'filter': routeFilter,
    'detail': routeDetail,
    'favs': routeFavs,
    'fav-add': routeFaveAdd,
  };

  routeMap[action]();

  function routeHome() {
    const path = '/home';
    window.history.pushState(null, path, `#${path}`);
    getRandomBreedData().then(res => {
      contentEl.appendChild(breedDataToHTMLFrag(res, 'filter'));
    });
  }

  function routeFilter() {
    const breedPath = breedSlugToPath(breedSlug);
    getBreedData(breedPath).then(res => {
      contentEl.appendChild(breedDataToHTMLFrag(res, 'detail'));
    });
  }

  function routeDetail() {
    const faved = false;
    contentEl.appendChild(imgDataToHTMLFrag(breedSlug, imgName, faved));
  }

  function routeFavs() {
    contentEl.appendChild(favsToHTMLFrag(getFavs(window.localStorage)));
  }

  function routeFaveAdd() {
    const path = `/detail/${breedSlug}/${imgName}`;
    addFav(window.localStorage, {breedSlug, imgName});
    window.history.replaceState(null, path, `#${path}`);
    const faved = true;
    contentEl.appendChild(imgDataToHTMLFrag(breedSlug, imgName, faved));
  }
}

