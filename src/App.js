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
          setMemeImage(memeURL[Math.floor(Math.random() * memeURL.length)]);
        }
      })
      .catch(() => 'error');
  }, []);

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
              borderRadius: '3px',
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
          <label htmlFor="top" style={{ marginRight: '5px' }}>
            <input
              name="top"
              value={topText}
              onChange={(event) => {
                setTopText(event.currentTarget.value);
              }}
            />
            Top text
          </label>
        </div>

        <div>
          <label htmlFor="bottom" style={{ marginRight: '5px' }}>
            <input
              name="bottom"
              value={bottomText}
              onChange={(event) => {
                setBottomText(event.currentTarget.value);
              }}
            />
            Bottom text
          </label>
        </div>

        <div>
          <button
            onClick={() => {
              setMemeImage(generatedURL);
              setTopText('');
              setBottomText('');
            }}
          >
            Generate
          </button>

          <button value="download" onClick={downloadMeme}>
            Download
          </button>
        </div>
      </div>
      <div>
        <img
          data-test-id="meme-image"
          src={memeImage}
          alt="description"
          height="500px"
          style={{
            borderRadius: '3px',
            padding: '30px',
            margin: '0 50px',
            backgroundColor: 'white',
          }}
        />
      </div>
    </div>
  );
}

export default App;
