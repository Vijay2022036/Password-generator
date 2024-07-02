import './App.css';
import React,{useCallback,useState,useEffect, useRef} from 'react';
function App() {
  const [length ,setLength] = useState(8);
  const [isNum , setNum] = useState(false);
  const [isChar , setChar] = useState(false);
  const [password , setPassword] = useState("");

  const passwordGenerator = useCallback(()=>{
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let pass = "";
    if(isChar)str += "#$&%@!" ;
    if(isNum)str += "1234567890" ;
    for(let i = 0 ; i < length ; i++){
        var ran = parseInt(Math.random()*str.length)
        pass += str[ran];
    }
    setPassword(pass);
  } ,[isNum , isChar , length ,setPassword])

  const passwordRef = useRef(null);

  const copyTOClip = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(()=>{
    passwordGenerator()
  },[isChar , isChar , length , passwordGenerator]);

  const changeBg = ()=>{
    document.querySelector('button').style.backgroundColor = 'purple'
    setTimeout(() => {
      document.querySelector('button').style.backgroundColor = 'rgb(29 78 216 / var(--tw-bg-opacity))'
  }, 200);
  }
  return (
      <div className=' shadow-md rounded-lg px-4 py-3 my-8 bg-gray-700 text-orange-500 w-full max-w-md  mx-auto'>
        <h1 className='text-white text-center my-3'>Password generator</h1>
        <div className='flex shadow rounded-lg mb-4 overflow-hidden'>
          <input type='text' 
          ref={passwordRef}
          className='w-full py-1 px-3 outline-none' 
          value={password} 
          placeholder='password'readOnly/>
          <button onFocus={changeBg} className='bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyTOClip}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type='range' min={6} max={100} onChange={(e)=>{
              setLength(e.target.value);
            }} value={length} className='cursor-pointer'/>
            <label>Length: {length}  </label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type='checkbox'
            id='isNum' 
            onChange={(e)=>{
              setNum((prev)=>!prev);
            }} 
            className='cursor-pointer'/>
            <label htmlFor='isNum'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type='checkbox'
            id='isChar' 
            onChange={(e)=>{
              setChar(!isChar);
            }} 
            className='cursor-pointer'/>
            <label htmlFor='isChar'>Specialchars</label>
          </div>
        </div>
      </div>
  );
}

export default App;
