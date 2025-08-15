import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [password, setPassword] = useState("")
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    const numberStr = "0123456789"
    const characterStr = "!@#$%^&*-_+=[]{}~`"
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let pass = ""
    if (numberAllowed) {
      str += numberStr
    }
    if (characterAllowed) {
      str += characterStr
    }

    for(let i=1; i<=length; i++){
      let chat = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(chat)
    }
    setPassword(pass)
    console.log(pass)
  }, [length, numberAllowed, characterAllowed, setPassword])

  const copyPassword = useCallback(() =>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  },[password]) 
    
  

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, characterAllowed, passwordGenerator])

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <div className="flex overflow-hidden shadow rounded-lg">
        <input type="text"
          value={password}
          readOnly
          className="w-full px-3 py-2 border-8 border-indigo-600"
          ref={passwordRef}
        />
        <button className="bg-blue-500" onClick={copyPassword}>Copy</button>
      </div>
      <div className="flex gap-x-2">
        <div className="flex gap-x-1">
          <label>Length : {length}</label>
          <input
            type="range"
            min={6}
            max={100}
            onChange={(e) => {setLength(e.target.value)}}
          />
        </div>
        <div className="flex gap-x-1">
          <label>Numbers:</label>
          <input 
            type="checkbox" 
            defaultChecked={numberAllowed}
            onChange={() =>{
              setNumberAllowed((prev) => !prev)
            }}
          />
        </div>
        <div className="flex gap-x-2">
          <label>Characters:</label>
          <input 
            defaultChecked={characterAllowed}
            type="checkbox"
            onChange={() =>{
              setCharacterAllowed((prev) => !prev)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default App
