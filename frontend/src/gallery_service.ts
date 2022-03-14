const gallery = document.querySelector('#gallery') as HTMLElement;
const previousButton = document.querySelector('#previous') as HTMLButtonElement;
const nextButton = document.querySelector('#next') as HTMLButtonElement;

const updateQueryParams = (pageNumber: string) => {
  if (location.search !== `?page=${pageNumber}`) {
    location.search = `?page=${pageNumber}`;
  }
};

const nextButtonEvent = async () => {
  const currentPage = getCurrentPage();
  const newPage = Number(currentPage) + 1;
  setNewPage(newPage);
  await showGallery(getCurrentPage(), getToken());
};

const previousButtonEvent = async () => {
  const currentPage = getCurrentPage();
  const newPage = Number(currentPage) - 1;
  setNewPage(newPage);
  await showGallery(getCurrentPage(), getToken());
};

const showGallery = async (page: string, token: string) => {
  updateQueryParams(page);

  const data = await httpGet<Gallery>(`${API_URL}/gallery?page=${page}`, token);

  gallery.innerHTML = '';

  data.objects.forEach((imgLink) => (gallery.innerHTML += `<img src='${imgLink}' width='200' height='200' alt='img'>`));
};

const redirectToIndex = () => {
  removeToken();
  nextButton.removeEventListener(EVENT_TYPES.click, nextButtonEvent);
  previousButton.removeEventListener(EVENT_TYPES.click, previousButtonEvent);
  return document.location.replace('./index.html');
};

removeTokenWithTimeout();

validatePage();

showGallery(getCurrentPage(), getToken());

nextButton.addEventListener(EVENT_TYPES.click, nextButtonEvent);
previousButton.addEventListener(EVENT_TYPES.click, previousButtonEvent);
