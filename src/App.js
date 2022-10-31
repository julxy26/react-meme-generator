import './App.css';
import { saveAs } from 'file-saver';
import { useEffect, useState } from 'react';

const memeURL = [];
const memeIdsAndNames = [];
function App() {
  const [selectMemeId, setSelectMemeId] = useState('');
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [memeImage, setMemeImage] = useState('');
  const generatedURL = `https://api.memegen.link/images/${selectMemeId}/${topText}/${bottomText}`;

  const downloadMeme = () => {
    saveAs(generatedURL, selectMemeId);
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
        setMemeImage(
          selectMemeId
            ? generatedURL
            : memeURL[Math.floor(Math.random() * memeURL.length)],
        );
      })
      .catch(() => 'error');
  }, [selectMemeId, generatedURL]);

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
                onChange={(event) => {
                  setSelectMemeId(event.currentTarget.value);
                }}
              >
                {memeIdsAndNames.map((meme) => (
                  <option key={`memeName-${meme[0]}`} value={meme[0]}>
                    {meme[1]}
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
      <div>
        <img
          src={memeImage}
          alt="description"
          height="500px"
          style={{
            border: '1px solid black',
            borderRadius: '3px',
            padding: '32px',
            margin: '5px 50px',
            backgroundColor: 'white',
          }}
        />
      </div>
    </div>
  );
}

export default App;
