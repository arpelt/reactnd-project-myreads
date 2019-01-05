import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';

class ShelfChanger extends Component {

  newShelf = this.newShelf.bind(this);

  // The user's selected shelf for the book in the MyReads or Search page. 
  newShelf(event) {
    let currentShelf = event.target.value;
    this.removeBook(currentShelf);
    this.updateShelf(currentShelf);
    this.props.changeShelf(this.props.books);
    this.updateBook(this.props.book, currentShelf);
  }

  // Removes the book from the books array and from the shelf 
  // when the user has slected the "None" shelf.
  removeBook(currentShelf) {
    if (currentShelf === 'none') {
      this.props.books.forEach((book, index) => {
        if (book.id === this.props.bookId) {
          this.props.books.splice(index, 1);
        }
      }
      );
    }
  }

  // Adds the user's selected book to the books array. This book's shelf 
  // was originally marked as "none".
  // Removes the book which shelf has changed and adds it back with the new shelf value.
  updateShelf(currentShelf) {
    if (this.props.bookShelf === 'none') {
      this.props.books.push(this.props.book);
      this.props.book.shelf = currentShelf;
    }
    else {
      this.props.books.forEach((book, index) => {
        if (book.id === this.props.bookId) {
          this.props.books.splice(index, 1);
          this.props.books.push(this.props.book);
        }
      }
      );
      this.props.book.shelf = currentShelf;
    }
  }

  // Updates the book information to the server.
  updateBook(book, shelf) {
    BooksAPI.update(book, shelf)
      .then(resp => {
        console.log("Response for the book's update method ", resp);
      });
  }

  render() {
    return (
      <div className="book-shelf-changer">
        <select value={this.props.value} defaultValue={this.props.bookShelf} onChange={this.newShelf}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default ShelfChanger;