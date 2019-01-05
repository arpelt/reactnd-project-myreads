import React from 'react';
import * as BooksAPI from './BooksAPI';
import Search from './Search';
import BookShelf from './BookShelf';
import { Route } from 'react-router-dom';
import './App.css';

class BooksApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  onChangeShelf = (newShelfs) => {
    this.setState({ books: newShelfs });
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.validateBooks(books);
      console.log("Fetched books from the server ", books);
      this.setState({ books: books });
    })
  }

  // Adds imageLinks key for the book if it is missing.
  validateBooks(books) {
    for (let id in books) {
      if (!('imageLinks' in books[id])) {
        books[id].imageLinks = { smallThumbnail: 'Not Available' };
      }
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <Search
            books={this.state.books}
            changeShelf={this.onChangeShelf}
          />
        )}
        />
        <Route exact path="/" render={() => (
          <BookShelf
            books={this.state.books}
            changeShelf={this.onChangeShelf}
          />
        )}
        />
      </div>
    );
  }
}

export default BooksApp;
