import { useState, useEffect } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";
import axios from "axios";



function App() {
  const[books,setBooks] = useState([]);

  const fetchBooks = async () => {
    const response = await axios.get('http://localhost:3001/books');
    setBooks(response.data);
  }

  useEffect(()=>{
    fetchBooks();
  },[]);

  const deleteBookById = async (id) => {
    const response = await axios.delete(`http://localhost:3001/books/${id}`);
    
    const updated = books.filter((book) => {
      return book.id !== id;
    });
    setBooks(updated);
  };

  const updateBookById = async (id, title) => {

    const response = await axios.put(`http://localhost:3001/books/${id}`,{
      title
    })
    const updated = books.map ((book) =>{
      if(book.id === id){
        return {...book, ...response.data};
      }
      return book;
    });
    setBooks(updated);
  }

  const createBook = async (title) => { 
    const response = await axios.post('http://localhost:3001/books',{
      title,
    });
    setBooks([...books, response.data]);
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