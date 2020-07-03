export { getRandomBreedData, getBreedData };

const urlRoot = 'https://dog.ceo/api/';
const randomBreedsUrl = 'breeds/image/random/';

const mockData = [
  'https://i.am/url1/breeds/mock/foo.jpg',
  'https://i.am/url2/breeds/mock/foo.jpg',
  'https://i.am/url3/breeds/mock/foo.jpg',
];


/**
 * gets a bunch of random breed urls
 * @param isMock
 * @returns {Promise<array<string>>}
 */
async function getRandomBreedData(isMock=false) {
  // 20 is a decent number to populate the window
  const defaultCount = 20;
  const urls = await getAPIMessage(`${urlRoot}${randomBreedsUrl}${defaultCount}`, isMock);
  return urls.map(toBreedData);
}

/**
 * gets a filtered random bunch of urls
 * @param breedSlug
 * @param isMock
 * @returns {Promise<array<string>>}
 */
async function getBreedData(breedSlug, isMock=false) {
  // 20 is a decent number to populate the window
  const defaultCount = 20;
  const urls = await getAPIMessage(`${urlRoot}breed/${breedSlug}/images/random/${defaultCount}`, isMock);
  return urls.map(toBreedData);
}

/**
 * dog api has a certain pattern to its URLs that we can pattern extract
 * @param imageUrl
 * @returns {{url: string, breedSlug: string, imgName: string}}
 */
function toBreedData(imageUrl) {
  return {
    url: imageUrl,
    breedSlug: imageUrl.split('breeds/').pop().split('/').shift(),
    imgName: imageUrl.split('/').pop(),
  };
}

async function getAPIMessage(urlToRequest, isMock) {
  if (isMock) {
    return mockData;
  }

  const resp = await fetch(urlToRequest);
  if (!resp.ok) {
    return [];
  }

  const respJSON = await resp.json();
  if (respJSON.status !== 'success') {
    return [];
  }

  return Array.isArray(respJSON.message)
    ? respJSON.message
    : [respJSON.message];
}
