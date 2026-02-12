import { useState, useEffect } from 'react';
import './App.css';

const initialMovies = [
  { title: 'Inception', genre: 'Fantascienza' },
  { title: 'Il Padrino', genre: 'Thriller' },
  { title: 'Titanic', genre: 'Romantico' },
  { title: 'Batman', genre: 'Azione' },
  { title: 'Interstellar', genre: 'Fantascienza' },
  { title: 'Pulp Fiction', genre: 'Thriller' },
];

function App() {
  const [movies, setMovies] = useState(initialMovies);
  const [selectedGenre, setSelectedGenre] = useState('Tutti');
  const [searchTitle, setSearchTitle] = useState('');
  const [filteredMovies, setFilteredMovies] = useState(movies);

  const [newTitle, setNewTitle] = useState('');
  const [newGenre, setNewGenre] = useState('Fantascienza');


  useEffect(() => {
    let filtered = movies;

    if (selectedGenre !== 'Tutti') {
      filtered = filtered.filter(movie => movie.genre === selectedGenre);
    }

    if (searchTitle.trim() !== '') {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
    }

    setFilteredMovies(filtered);
  }, [selectedGenre, searchTitle, movies]);

  const handleAddMovie = (e) => {
    e.preventDefault();
    if (newTitle.trim() === '') return;

    const newMovie = { title: newTitle.trim(), genre: newGenre };
    setMovies(prev => [...prev, newMovie]);

    setNewTitle('');
    setNewGenre('Fantascienza');
  };



  return (
    <div>
      <div className="text-center py-4" style={{ backgroundColor: 'gray' }}>
        <h1>React Movie Filter</h1>
      </div>
      <div className="container-fluid text-center py-4" style={{ backgroundColor: 'black', minHeight: '100vh' }}>
        <div className="d-flex justify-content-center gap-2 flex-wrap mb-3">
          <select
            className="form-select"
            style={{ width: '150px', height: '38px' }}
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}>
            <option value="Tutti">Tutti</option>
            <option value="Fantascienza">Fantascienza</option>
            <option value="Thriller">Thriller</option>
            <option value="Romantico">Romantico</option>
            <option value="Azione">Azione</option>
          </select>
          <input
            type="text"
            className="form-control"
            placeholder="Cerca titolo..."
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            style={{ width: '200px', height: '38px' }} />
        </div>
        <form onSubmit={handleAddMovie} className="d-flex justify-content-center gap-2 flex-wrap mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Nuovo titolo"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={{ width: '180px', height: '38px' }} />
          <select
            className="form-select"
            value={newGenre}
            onChange={(e) => setNewGenre(e.target.value)}
            style={{ width: '150px', height: '38px' }}>
            <option value="Fantascienza">Fantascienza</option>
            <option value="Thriller">Thriller</option>
            <option value="Romantico">Romantico</option>
            <option value="Azione">Azione</option>
          </select>
          <button type="submit" className="btn btn-success" style={{ height: '38px' }}>Aggiungi</button>
        </form>
        <div className="row mt-4 justify-content-center">
          {filteredMovies.map((movie, index) => (
            <div className="col-12 col-sm-6 col-md-4 mb-3" key={index}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <h6 className="card-subtitle text-muted">{movie.genre}</h6>
                </div>
              </div>
            </div>
          ))}
          {filteredMovies.length === 0 && (
            <p className="text-white">Nessun film trovato.</p>
          )}
        </div>

      </div>
    </div>
  )
}
export default App;
