import React, { Component } from 'react';
import ShelfChanger from './ShelfChanger';

class Book extends Component {

  //Shows searched books in the correct shelf on the search page.
  handleShelf(books, search) {
    for (let id in books) {
      for (let ids in search) {
        if (books[id].id === search[ids].id) {
          search[ids].shelf = books[id].shelf;
        }
      }
    }
  }

  render() {
    this.handleShelf(this.props.books, this.props.search)
    return (
      <ol className="books-grid">
        {this.props.search.map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                <ShelfChanger
                  books={this.props.books}
                  book={book}
                  bookId={book.id}
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
    );
  }
}

export default Book;