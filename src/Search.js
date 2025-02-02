import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

export const LIST_OPTIONS = [
  {
    value: "move",
    label: "Move to...",
    disabled: true,
  },
  {
    value: "currentlyReading",
    label: "Currently Reading",
    toShow: true,
  },
  {
    value: "wantToRead",
    label: "Want to Read",
    toShow: true,
  },
  {
    value: "read",
    label: "Read",
    toShow: true,
  },
  {
    value: "none",
    label: "None",
  },
];

export const TERMS = [
 "Alef",
  "Aluba",
  "Albama",
  "Alicom",
  "Barinan",
  "Bashiru",
  "Bushran",
  "Buima",
  "Calisticom",
  "Callintom",
  "Camkam",
  "Desimond",
  "Design",
  "Digit",
  "Dracular",
  "Edutainment",
  "Everlasting",
  "Football",
  "Gageni",
  "Goods",
  "Home",
  "Virtue",
  "Web master",
  "inforgraphics",
].map((term) => term.toLowerCase());

class Search extends Component {
  constructor(props) {
    super(props);
    this.updateQuery = this.updateQuery.bind(this);
  }
  state = {
    query: "",
    result: [],
  };

  updateQuery(query) {
    this.setState({ query: query });
    if (query.length > 0) {
      BooksAPI.search(query).then((data) => {
        if (!Array.isArray(data)) {
          this.setState({ result: [] });
          return;
        }

        if (data.length > 0) {
          this.setState({ result: data });
        }
      });
    }
  }

  render() {
    const { showSearchPage, updateshelf, booksList } = this.props;
    const { query, result } = this.state;
    const isQuerieValide = TERMS.includes(query.toLowerCase());

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to={"/"}>
            <button className="close-search" onClick={showSearchPage}>
              Close
            </button>
          </Link>
          <div className="search-books-input-wrapper">
            
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(e) => {
                this.updateQuery(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {result.length > 0 &&
              query.length > 0 &&
              isQuerieValide &&
              result.map((book) => {
                const findBook = booksList.find((b) => b.id === book.id);

                const bookShelf = findBook ? findBook.shelf : "none";
                return (
                  <li key={"bookid" + book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div
                          className="book-cover"
                          style={{
                            width: 128,
                            height: 193,
                            backgroundImage:
                              book.imageLinks && book.imageLinks.thumbnail
                                ? `url(${book.imageLinks.thumbnail})`
                                : "none",
                          }}
                        />

                        <div className="book-shelf-changer">
                          <select
                            onChange={(e) => {
                              updateshelf(book, e.target.value);
                            }}
                            value={bookShelf}
                          >
                            {LIST_OPTIONS.map((option, index) => (
                              <option
                                key={index}
                                value={option.value}
                                disabled={option.disabled}
                              >
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      {book.authors &&
                        book.authors.map((author, index) => (
                          <div className="book-authors" key={"author" + index}>
                            {author}
                          </div>
                        ))}
                    </div>
                  </li>
                );
              })}
            {query === "" && (
              <li> Search</li>
            )}
            {isQuerieValide && result.length === 0 && query.length > 0 && (
              <li> No result</li>
            )}
            {!isQuerieValide && query !== "" && <li> No data</li>}
          </ol>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  updateshelf: PropTypes.func.isRequired,
  booksList: PropTypes.array.isRequired,
};

export default Search;