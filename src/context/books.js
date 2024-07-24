import axios from "axios";
import { createContext, useState, useCallback } from "react";

const BooksContext = createContext();

function Provider ({children}){
  const[books,setBooks] = useState([]);

  const fetchBooks = useCallback(async () => {
    const response = await axios.get('http://localhost:3001/books');
    setBooks(response.data);
  },[]);

  const deleteBookById = async (id) => {
    await axios.delete(`http://localhost:3001/books/${id}`);
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
  
  const valueToShare = {
    books,
    deleteBookById,
    updateBookById,
    createBook,
    fetchBooks
  }
  return (
    <BooksContext.Provider value={valueToShare}>
      {children}
    </BooksContext.Provider>
  );
}

export {Provider};
export default BooksContext;