import React, { Component } from 'react';
import Book from './Book';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      search: []
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  // Cheks that the query string is defined and clears the previous query. 
  handleSearch = (query) => {
    if (query) {
      this.searchBooks(query);
      this.setState({ query: query });
    }
    else {
      this.setState({ query: '' });
      this.setState({ search: [] });
    }
  }

  // Sends the query to the server and set the state for the searced books.
  searchBooks(query) {
    BooksAPI.search(query).then((response) => {
      if (response.error === 'empty query') {
        this.setState({ search: [] });
      }
      else {
        this.validateResponse(response);
        this.setState({ search: response });
      }
    })
  }

  // Adds "none" shelf to all searched books.
  // And adds imageLinks key for the book if it is missing.
  validateResponse(search) {
    for (let id in search) {
      if (!('shelf' in search[id])) {
        search[id].shelf = 'none';
      }
      if (!('imageLinks' in search[id])) {
        search[id].imageLinks = { smallThumbnail: 'Not Available' };
      }
    }
  }

  changeSearchShelf = (newShelfs) => {
    this.setState({ search: newShelfs });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.handleSearch(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <Book
            search={this.state.search}
            books={this.props.books}
            changeShelf={this.props.changeShelf}
            changeSearchShelf={this.changeSearchShelf}
          />
        </div>
      </div>
    );
  }
}

export default Search;