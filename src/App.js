import './App.css';
import { saveAs } from 'file-saver';
import { useEffect, useState } from 'react';

const memeURL = [];
const memeIdsAndNames = [];

function App() {
  const [selectMemeName, setSelectMemeName] = useState('');
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const generatedURL = `https://api.memegen.link/images/${selectMemeName}/${topText}/${bottomText}`;
  const [memeImage, setMemeImage] = useState('');

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
        for (let i = 0; i < data.length; i++) {
          memeURL.push(data[i].blank);
          memeIdsAndNames.push([data[i].id, data[i].name]);
        }

        selectMemeName
          ? setMemeImage(`https://api.memegen.link/images/${selectMemeName}`)
          : setMemeImage(memeURL[Math.floor(Math.random() * memeURL.length)]);
      })
      .catch(() => 'error');
  }, [selectMemeName]);

  return (
    <div
      className="App"
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: '100px',
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
              alignItems: 'flex-start',
              gap: '8px',
              marginTop: '7px',
            }}
          >
            <div style={{ marginTop: '0px' }}>
              <label htmlFor="memeName">Choose a meme</label>
              <select
                style={{
                  marginLeft: '7px',
                  width: '160px',
                  height: '34px',
                }}
                name="memeName"
                value={selectMemeName}
                onChange={(event) => {
                  setSelectMemeName(event.currentTarget.value);
                }}
              >
                {memeIdsAndNames.map((name) => (
                  <option key={`memeName-${name[0]}`} value={name[0]}>
                    {name[1]}
                  </option>
                ))}
              </select>
            </div>

            <div>
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
            </div>

            <div>
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
            </div>

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
