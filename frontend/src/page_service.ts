const setNewPage = (value = 1) => {
  localStorage.setItem(PAGE, String(value));
};

const getCurrentPage = (): string => {
  const page = localStorage.getItem(PAGE);

  if (page) {
    return page;
  }

  setNewPage();

  return localStorage.getItem(PAGE) as string;
};

const validatePage = () => {
  const totalPages = Number(localStorage.getItem('total')) || 1;

  if (location.search === '') {
    location.search = 'page=1';
    return;
  }

  const currentPageNumber = Number(location.search.split('?page=').pop()) || 1;

  if (currentPageNumber <= totalPages && currentPageNumber > 0) {
    return setNewPage(Number(currentPageNumber));
  }

  alert(PAGE_DOES_NOT_EXIST);
  setNewPage();
};
