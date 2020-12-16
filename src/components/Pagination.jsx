import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

const range = (from, to, step = 1) => {
  let i = from;
  const array = [];

  while (i <= to) {
    array.push(i);
    i += step;
  }

  return array;
};

function Pagination(props) {
  const fetchPageNumbers = useCallback(() => {
    const { pageNeighbours, totalPages, page } = props;

    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, page - pageNeighbours);
      const endPage = Math.min(totalPages - 1, page + pageNeighbours);

      let pages = range(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }
      return [1, ...pages, totalPages];
    }
    return range(1, totalPages);
  }, [props]);

  useEffect(() => {
    fetchPageNumbers();
  }, [fetchPageNumbers]);

  const goToPage = (page) => {
    const { onPageChanged } = props;
    onPageChanged(page);
  };

  const handleClick = (page) => (e) => {
    e.preventDefault();
    goToPage(page);
  };

  const handleMoveLeft = (e) => {
    const { pageNeighbours, page } = props;
    e.preventDefault();
    goToPage(page - pageNeighbours * 2 - 1);
  };

  const handleMoveRight = (e) => {
    const { pageNeighbours, page } = props;
    e.preventDefault();
    goToPage(page + pageNeighbours * 2 + 1);
  };

  const renderPageButton = (pageItem) => {
    const { page } = props;
    switch (pageItem) {
      case LEFT_PAGE:
        return (
          <li key={pageItem} className="tk-page-item">
            <button
              type="button"
              className="tk-page-link"
              onClick={handleMoveLeft}
            >
              <span>&laquo;</span>
            </button>
          </li>
        );
      case RIGHT_PAGE:
        return (
          <li key={pageItem} className="tk-page-item">
            <button
              type="button"
              className="tk-page-link"
              onClick={handleMoveRight}
            >
              <span>&raquo;</span>
            </button>
          </li>
        );
      default:
        return (
          <li
            key={pageItem}
            className={`tk-page-item${page === pageItem ? " active" : ""}`}
          >
            <button
              type="button"
              className="tk-page-link"
              disabled={page === pageItem}
              onClick={handleClick(pageItem)}
            >
              {pageItem}
            </button>
          </li>
        );
    }
  };

  const { total, totalPages } = props;
  if (!total || totalPages === 1) return null;

  const pages = fetchPageNumbers();

  return (
    <nav aria-label="Pagination">
      <ul className="tk-pagination">
        {pages.map((pageItem) => renderPageButton(pageItem))}
      </ul>
    </nav>
  );
}

Pagination.defaultProps = {
  page: 1,
  pageNeighbours: 1,
  total: 1,
};

Pagination.propTypes = {
  total: PropTypes.number,
  totalPages: PropTypes.number.isRequired,
  page: PropTypes.number,
  pageNeighbours: PropTypes.number,
  onPageChanged: PropTypes.func.isRequired,
};

export default Pagination;
