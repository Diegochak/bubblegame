import { usestate } from 'react';
import 'src/App.css';
export default App;

function App(){
  const [list, setlist] = usestate([]);
  const [undid, setundid] = usestate([]);

  const handleClick = (event) => {
      const newDot = {
        clientX: event.clientX,
        clientY: event.clientY,
      }
  
      console.log(newDot);
      setlist((prev) => [...prev, newDot]);
      setundid([]);   
  }
  const handleUndo = (event) => {
    event.stopPropagation();
    console.log('undo');
  }  
    if (list.length === 0) {
      return;
    }

    const lastItem = list[list.length -1];
    setundid((prev) => [...prev, lastItem]);

    setlist((prev) =>{
      const newArr = [...prev].slice(0, -1);
      return newArr;
    });


    const handleRedo = (event) => {
      event.stopPropagation();

    if (undid.lenght === 0) {
      return;
    }

    const recoveredDot = undid[undid.lenght -1];
    setundid((prev) =>{
      const newArr = [...prev].slice(0, -1);
      return newArr;
    });
    setlist((prev) => [...prev, recoveredDot]);
  

return (
    <div id='page' onClick={handleClick}>
      <button onClick={handleUndo}>Desfazer</button>
      <button onClick={handleRedo}>Refazer</button>
      {list.map((item, index) => (
        <span
          key={index}
          className='dot'
          style={{ left: item.clientX, top: item.clientY }}
        />
      ))}
    </div>
  )};
}  