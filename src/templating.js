export { breedDataToHTMLFrag, imgDataToHTMLFrag, favsToHTMLFrag };

/**
 * returns a document frag to list view
 * @param breedData
 * @param action
 * @returns {DocumentFragment}
 */
function breedDataToHTMLFrag(breedData, action) {
  const docFrag = document.createDocumentFragment();
  breedData.forEach(breedDatum => {
    const div = document.createElement('div');
    div.className = 'breed-data';
    const img = document.createElement('img');
    img.width = 200;
    img.loading = 'lazy';
    img.src = breedDatum.url;
    const section = document.createElement('section');
    const anchor = document.createElement('a');
    if (action === 'filter') {
      anchor.href = `#/${action}/${breedDatum.breedSlug}`;
      anchor.textContent = breedDatum.breedSlug;
    }
    if (action === 'detail') {
      anchor.href = `#/${action}/${breedDatum.breedSlug}/${breedDatum.imgName}`;
      anchor.textContent = breedDatum.imgName;
    }
    section.appendChild(anchor);
    div.appendChild(img);
    div.appendChild(section);
    docFrag.appendChild(div);
  });
  return docFrag;
}

/**
 * returns a document frag to a detail view
 * @param breedSlug
 * @param imgName
 * @param isFaved
 * @returns {DocumentFragment}
 */
function imgDataToHTMLFrag(breedSlug, imgName, isFaved) {
  const docFrag = document.createDocumentFragment();
  const div = document.createElement('div');
  div.className = 'detail-breed';
  const img = document.createElement('img');
  img.loading = 'lazy';
  img.src = `https://images.dog.ceo/breeds/${breedSlug}/${imgName}`;
  div.appendChild(img);

  if (isFaved) {
    const divFavedMessage = document.createElement('div');
    divFavedMessage.className = 'faved-msg';
    divFavedMessage.textContent = 'Added to Favorites!';
    div.appendChild(divFavedMessage);
  }

  const divActions = document.createElement('div');
  divActions.className = 'detail-breed-actions';

  const iconBack = document.createElement('i');
  iconBack.className = 'fa fa-arrow-left';
  const aIconBack = document.createElement('a');
  aIconBack.href = `#/filter/${breedSlug}`;
  aIconBack.appendChild(iconBack);
  const divIconBack = document.createElement('div');
  divIconBack.className = 'icon details-back';
  divIconBack.appendChild(aIconBack);

  const iconFave = document.createElement('i');
  iconFave.className = 'fa fa-star-o icon';
  const aIconFave = document.createElement('a');
  aIconFave.href = `#/fav-add/${breedSlug}/${imgName}`;
  aIconFave.appendChild(iconFave);
  const divIconFave = document.createElement('div');
  divIconFave.className = 'icon details-fave';
  divIconFave.appendChild(aIconFave);

  divActions.appendChild(divIconBack);
  divActions.appendChild(divIconFave);
  div.appendChild(divActions);
  docFrag.appendChild(div);
  return docFrag;
}

function favsToHTMLFrag(favs) {
  const docFrag = document.createDocumentFragment();
  favs.forEach(({breedSlug, imgName}) => {
    const div = document.createElement('div');
    div.className = 'breed-data';
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.width = 200;
    img.src = `https://images.dog.ceo/breeds/${breedSlug}/${imgName}`;
    const anchor = document.createElement('a');
    anchor.href = `#/detail/${breedSlug}/${imgName}`;
    anchor.appendChild(img);
    div.appendChild(anchor);
    docFrag.appendChild(div);
  });
  return docFrag;
}