import Space from './Space';
import './App.css';
import { ConfigProvider } from './Space/ConfigProvider';

function App() {
  return <div>
    <ConfigProvider space={{size:100}}>
      <Space direction="horizontal">
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
      </Space>
      <Space direction="vertical">
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
      </Space>
    </ConfigProvider>
  </div>
}

export default App;
