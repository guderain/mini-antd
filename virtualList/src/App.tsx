import VirtualList from './VirtualList';
import './App.css'

function App() {
  const list = Array.from({ length: 1000 }, (_, index) => index);
  return (
    <div className='container'>
      <VirtualList data={list} itemHeight={50} viewportHeight={500} renderItem={(item)=><div>{item}</div>}></VirtualList>
    </div>
  )
}

export default App
