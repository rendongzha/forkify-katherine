import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const curPage = this._data.page;
    const totalPages = `
    
      <span class="pagination__total--pages total-pages">${curPage} / ${numPages}</span>

    `;
    const next = `
    <button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
    `;
    const prev = `
    <button data-goto="${curPage - 1}"class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>
    `;

    // page 1 and there are other pages
    if (curPage === 1 && numPages > 1) return totalPages + next;
    // page 1 and no other pages
    if (curPage === 1 && numPages === 1) return totalPages;
    // last page
    if (curPage === numPages && numPages > 1) return prev + totalPages;
    // other page
    if (curPage < numPages) return prev + totalPages + next;
  }
}

export default new PaginationView();
