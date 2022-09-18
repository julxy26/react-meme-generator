import './App.css';
import { saveAs } from 'file-saver';
import { useEffect, useState } from 'react';

const memeURL = [];
let i;

function App() {
  const [memeImage, setMemeImage] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const urlTemp = 'https://api.memegen.link/images/';
  const generatedURL = `${urlTemp}${searchInput}/${topText}/${bottomText}`;

  const downloadMeme = () => {
    saveAs(generatedURL, 'Meme.jpg');
    console.log('Hurray! It worked!');
  };

  useEffect(() => {
    fetch('https://api.memegen.link/templates')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for (i = 0; i < data.length; i++) {
          memeURL.push(data.blank);
          setMemeImage(memeURL[Math.floor(Math.random() * memeURL.length)]);
        }
      })
      .catch(() => 'error');
  }, []);


  return (
    <div
      className="App"
      style={{
        display: 'grid',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#9c90f5',
      }}
    >
      <h1
        style={{
          fontFamily: 'new times roman',
          marginTop: '37px',
        }}
      >
        Meme Generator
      </h1>
      <div>
        <img
          src={memeImage}
          alt="description"
          height="500px"
          style={{
            border: '1px solid black',
            borderRadius: '3px',
            padding: '32px',
            margin: '8px 50px',
            backgroundColor: 'white',
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyItems: 'center',
              alignItems: 'center',
              gap: '8px',
            }}
          >

            <span>
              <input
                name="searchbar"
                id="searchbar"
                placeholder="search for a meme"
                value={searchInput}
                onChange={(event) => {
                  setSearchInput(event.currentTarget.value);
                }}
              />
            </span>

            <span>
              <span style={{ marginRight: '5px' }}>
                <label htmlFor="top">Top text</label>
              </span>
              <input
                name="top"
                value={topText}
                onChange={(event) => {
                  setTopText(event.currentTarget.value);
                }}
              />
            </span>

            <span>
              <span style={{ marginRight: '5px' }}>
                <label htmlFor="bottom">Bottom text</label>
              </span>
              <input
                name="bottom"
                value={bottomText}
                onChange={(event) => {
                  setBottomText(event.currentTarget.value);
                }}
              />
            </span>

            <div>
              <span>
                <button
                  onClick={() => {
                    setMemeImage(generatedURL);
                  }}
                >
                  Generate
                </button>
              </span>
              <span>
                <button value="download" onClick={downloadMeme}>
                  Download
                </button>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
