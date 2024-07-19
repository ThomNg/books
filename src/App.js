import { useState } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";


function App() {
  const[books,setBooks] = useState([]);

  const deleteBookById = (id) => {
    const updated = books.filter((book) => {
      return book.id !== id;
    });
    setBooks(updated);
  };

  const updateBookById = (id, title) => {
    const updated = books.map ((book) =>{
      if(book.id === id){
        return {...book, title};
      }
      return book;
    });
    setBooks(updated);
  }

  const createBook = (title) => {
    setBooks([...books, {id:Math.floor(Math.random()*9999), title}])
  };
  
  return (
  <div className="app">
    <h1>Reading List</h1>
    <BookList books={books} onDelete = {deleteBookById} onUpdate={updateBookById}/>
    <BookCreate onCreate={createBook}/>
  
  </div>

  );
}

export default App;