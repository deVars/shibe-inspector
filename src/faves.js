export {addFav, getFavs};

const favsKey = 'favs';

/**
 * adds a fav knowing the fav key and the value being a list
 * it just needs to know it is accessing a generic storage interface
 * @param storage interface
 * @param breedSlug
 * @param imgName
 * @returns storage interface
 */
function addFav(storage, fav) {
  const emptyListJSONStr = JSON.stringify([]);
  const favsRaw = !storage.getItem(favsKey) ? emptyListJSONStr : storage.getItem(favsKey);
  try {
    const favsFromRaw = JSON.parse(favsRaw);
    const favs = !Array.isArray(favsFromRaw) ? [] : favsFromRaw;
    const newFavs = [...favs, fav];
    const newFavsRaw = JSON.stringify(newFavs);
    storage.setItem(favsKey, newFavsRaw);
  } catch (notAJSONError) {
    const overrideFavs = [fav];
    const overrideFavsRaw = JSON.stringify(overrideFavs);
    storage.setItem(favsKey, overrideFavsRaw);
  }
  return storage;
}


/**
 * returns a favs list given a storage interface and the (implicit) key
 * @param storage
 * @returns array favs
 */
function getFavs(storage) {
  const emptyListJSONStr = JSON.stringify([]);
  const favsRaw = !storage.getItem(favsKey) ? emptyListJSONStr : storage.getItem(favsKey);
  try {
    const favs = JSON.parse(favsRaw);
    return !Array.isArray(favs) ? [] : favs;
  } catch (notAJSONError) {
    return [];
  }
}