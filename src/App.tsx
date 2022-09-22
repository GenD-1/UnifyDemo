import { Route, Routes, Navigate } from 'react-router-dom'
import EditorWraped from './pages/EditorWraped';
import { useEffect, useState } from 'react'

function App() {

  // const [token, setToken] = useState('')
  // const [url, setUrl] = useState('/')

  // useEffect(() => {
  //   handleToken()
  // }, [])

  // const handleToken = () => {
  //   console.log(window.location.href + 'result.token' + '/' + 'result.roomId')
  //   if (token === '') {
  //     fetch("http://192.168.2.113:4001/managementToken")
  //       .then(res => res.json())
  //       .then(
  //         (result) => {
  //           console.log(result);
  //           setToken(result.token)
  //           let newUrl = '/' + result.token + '/' + result.roomId
  //           setUrl(newUrl)
  //         },
  //         (error) => {
  //           console.log(error)
  //         }
  //       )
  //   } else {
  //     console.log('helllo')
  //   }
  // }


  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<EditorWraped />} />
        <Route path="*" element={<Navigate to='/' />} />
      </Routes>
    </div>
  );
}

export default App;
