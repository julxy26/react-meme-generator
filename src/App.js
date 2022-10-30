import './App.css';
import { saveAs } from 'file-saver';
import { useEffect, useState } from 'react';

const memeURL = [];
const memeNames = [];
let i;

function App() {
  const [memeImage, setMemeImage] = useState('');
  const [selectMemeName, setSelectMemeName] = useState('');
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const generatedURL = `https://api.memegen.link/images/${selectMemeName}/${topText}/${bottomText}`;

  const downloadMeme = () => {
    saveAs(generatedURL, selectMemeName);
    console.log('Hurray! It worked!');
  };

  useEffect(() => {
    fetch('https://api.memegen.link/templates')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for (i = 0; i < data.length; i++) {
          memeURL.push(data[i].blank);
          memeNames.push([data[i].id, data[i].name]);
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
              <label htmlFor="memeName">Choose a meme</label>
              <select
                name="memeName"
                value={selectMemeName}
                onChange={(event) => {
                  setSelectMemeName(event.currentTarget.value);
                }}
              >
                {memeNames.map((name) => (
                  <option key={name} value={name[0]}>
                    {name[1]}
                  </option>
                ))}
              </select>
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
