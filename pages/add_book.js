import { useState } from 'react';

export default function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [year, setYear] = useState('');
  const [pages, setPages] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('publisher', publisher);
    formData.append('year', year);
    formData.append('pages', pages);
    formData.append('image', image);

    const res = await fetch('/api/books', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      // handle success
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input type="text" placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} />
      <input type="text" placeholder="Publisher" value={publisher} onChange={e => setPublisher(e.target.value)} />
      <input type="text" placeholder="Year" value={year} onChange={e => setYear(e.target.value)} />
      <input type="text" placeholder="Pages" value={pages} onChange={e => setPages(e.target.value)} />
      <input type="file" onChange={e => setImage(e.target.files[0])} />
      <button type="submit">Add Book</button>
    </form>
  );
}
