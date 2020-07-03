export { breedSlugToPath };

/**
 * sometimes the breedSlug is not enough and the server needs the breedPath
 * to request filtered breeds
 * @param breedSlug
 */
function breedSlugToPath(breedSlug) {
  return breedSlug.split('-').join('/');
}

