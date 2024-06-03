import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import { SocketChannel } from '../constants/api';
import './App.css';

function Hello() {
  const handleClick = async () => {
    try {
      const result = await window.electronApi.ipcRenderer.invoke(
        SocketChannel,
        Math.random() > 0.5 ? 'xxx' : 'yyy',
      );

      // Uint8Array 转为 字符串
      const str = new TextDecoder('utf-8').decode(result);
      console.log('str', str);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1 onClick={handleClick}>electron-react-boilerplate</h1>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
