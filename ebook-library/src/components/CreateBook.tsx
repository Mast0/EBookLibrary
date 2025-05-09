import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBook, getRole } from "../services/api";
import "../styles/FormPage.css";
import ThemeToggle from "./ThemeToggle";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [publication_year, setYear] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try{
      e.preventDefault();
      
      if (!title || !author || !genre || !description || !publication_year) {
        alert("Please fill in all fields.");
        return;
      }

      if (!file) {
        alert("Please upload a file.");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("genre", genre);
      formData.append("description", description);
      formData.append("publication_year", Number(publication_year).toString());
      formData.append("file", file);

      await createBook(formData);
      navigate("/");
    } catch (error) {
      console.error("Create book error", error);
      alert("Failed to create book");
    }
  };

  return (
    <>
     <ThemeToggle />
      <div className="form-container">
        <h2>Create New Book</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Publication Year"
            value={publication_year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            required
          />
          <button type="submit">Create Book</button>
        </form>
      </div>
    </>
  );
};

export default CreateBook;