const gallery = document.querySelector('#gallery') as HTMLElement;
const previousButton = document.querySelector('#previous') as HTMLButtonElement;
const nextButton = document.querySelector('#next') as HTMLButtonElement;
const sendingForm = document.querySelector('#sending-form') as HTMLFormElement;
const sendingFormSubmitInput = document.querySelector('#sending-form-submit') as HTMLInputElement;

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

const sendingFormEvent = async (event: Event) => {
  event.preventDefault();
  const picture = document.querySelector('#picture') as HTMLInputElement;
  if (!picture.files || !picture.files[0]) {
    return alert('Please choose file to upload');
  }

  const formData = new FormData();
  formData.append('picture', picture.files[0]);

  sendingFormSubmitInput.disabled = true;
  try {
    await httpPost<Response>(`${API_URL}/gallery`, formData, {
      authorization: getToken(),
    });
  } catch (error) {
    console.log(error);
  }
  sendingFormSubmitInput.disabled = false;

  await showGallery(getCurrentPage(), getToken());
};

const showGallery = async (page: string, token: string) => {
  updateQueryParams(page);

  const data = await httpGet<Gallery>(`${API_URL}/gallery?page=${page}`, token);

  localStorage.setItem('total', `${data.total}`);

  gallery.innerHTML = '';

  data.objects.forEach((imgLink) => (gallery.innerHTML += `<img src='${imgLink}' width='200' height='200' alt='img'>`));
};

const redirectToIndex = () => {
  removeToken();
  nextButton.removeEventListener(EVENT_TYPES.click, nextButtonEvent);
  previousButton.removeEventListener(EVENT_TYPES.click, previousButtonEvent);
  sendingForm.removeEventListener(EVENT_TYPES.submit, sendingFormEvent);
  return document.location.replace('./index.html');
};

removeTokenWithTimeout();

validatePage();

showGallery(getCurrentPage(), getToken());

nextButton.addEventListener(EVENT_TYPES.click, nextButtonEvent);
previousButton.addEventListener(EVENT_TYPES.click, previousButtonEvent);
sendingForm.addEventListener(EVENT_TYPES.submit, sendingFormEvent);
