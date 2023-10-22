import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import './App.css';
import { useEffect, useState, useRef } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState("")

  let photoRef = useRef(null);
  let videoRef = useRef(null);
  let getPhoto;

	const HEIGHT = 500;
	const WIDTH = 500;

	// const startVideo = () => {
	// 	setPlaying(true);
	// 	navigator.getUserMedia(
	// 		{
	// 			video: true,
	// 		},
	// 		(stream) => {
	// 			let video = document.getElementsByClassName('app__videoFeed')[0];
	// 			if (video) {
	// 				video.srcObject = stream;
	// 			}
	// 		},
	// 		(err) => console.error(err)
	// 	);
	// };

	// const stopVideo = () => {
	// 	setPlaying(false);
	// 	let video = document.getElementsByClassName('app__videoFeed')[0];
	// 	video.srcObject.getTracks()[0].stop();
	// };

	const getUserCamera = () => {
		navigator.mediaDevices.getUserMedia({
			video: true
		})
			.then((stream) => {
				let video = videoRef.current

				video.srcObject = stream
				video.play()
			})
			.catch((error) => {
				console.error(error)
			})
	}

	useEffect(() => {
		getUserCamera()
	}, [videoRef])

	const takePicture = () => {
		let width = 500
		let height = width / (16 / 9)

		let photo = photoRef.current
		let video = videoRef.current
		let getPhoto = photo

		photo.width = width
		photo.height = height

		let ctx = photo.getContext('2d')

		ctx.drawImage(video, 0, 0, photo.width, photo.height)
		const canvas = document.getElementById('photo')
		const img = canvas.toDataURL('image/png')

	
	}

  useEffect(() => {
    // Fetch the user email and token from local storage
    const user = JSON.parse(localStorage.getItem("user"))

    // If the token/email does not exist, mark the user as logged out
    if (!user || !user.token) {
      setLoggedIn(false)
      return
    }

    // If the token exists, verify it with the auth server to see if it is valid
    fetch("http://localhost:3080/verify", {
            method: "POST",
            headers: {
                'jwt-token': user.token
              }
        })
        .then(r => r.json())
        .then(r => {
            setLoggedIn('success' === r.message)
            setEmail(user.email || "")
        })
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
        </Routes>
      </BrowserRouter>
	  <div className="app__container">
				<video
					height={HEIGHT}
					width={WIDTH}
					muted
					autoPlay
					className="app__videoFeed"
					ref={videoRef}
				></video>
			</div>
			<div className="app__input">
				<button className="photoButton" onClick={takePicture}>Take Picture</button>
				<canvas id="photo" ref={photoRef}></canvas>
			</div>
    </div>
  );
}

export default App;