import Calendar from './Calendar';
import dayjs from 'dayjs';
// 获取当前日期
const date = dayjs()

function App() {
  return (
    <div className="App">
       <Calendar value={date} onChange={(date) => {
          console.log(date.format('YYYY-MM-DD'));
      }}></Calendar>
    </div>
  );
}

export default App;
