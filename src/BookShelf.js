import React from 'react';
import ShelfChanger from './ShelfChanger';
import { Link } from 'react-router-dom';
import './App.css';

class BookShelf extends React.Component {

  render() {
    const currentlyReading = this.props.books.filter(book => book.shelf === 'currentlyReading');
    const wantToRead = this.props.books.filter(book => book.shelf === 'wantToRead');
    const read = this.props.books.filter(book => book.shelf === 'read');

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <div>
                  <ol className="books-grid">
                    {currentlyReading.map((book) => (
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                            <ShelfChanger
                              books={this.props.books}
                              bookId={book.id}
                              book={book}
                              bookShelf={book.shelf}
                              changeShelf={this.props.changeShelf}
                            />
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors}</div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {wantToRead.map((book) => (
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                            <ShelfChanger
                              books={this.props.books}
                              bookId={book.id}
                              book={book}
                              bookShelf={book.shelf}
                              changeShelf={this.props.changeShelf}
                            />
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors}</div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {read.map((book) => (
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                            <ShelfChanger
                              books={this.props.books}
                              bookId={book.id}
                              book={book}
                              bookShelf={book.shelf}
                              changeShelf={this.props.changeShelf}
                            />
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors}</div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link
          className="open-search"
          to="/search">Add a book
          </Link>
      </div>
    );
  }
}

export default BookShelf;