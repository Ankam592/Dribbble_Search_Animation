import React,{  useState,Suspense } from 'react';
import CustomCursor from './Components/CustomCursor/CustomCursor';
const Search = React.lazy(() => import('./Components/Search/Search'))
import './App.css'

function App() {


  return (
    <div className='main_div' data-testid="maindiv">
      <Suspense fallback={<div>Loading...</div>}>
        <Search></Search>
      </Suspense>
      <CustomCursor></CustomCursor>
    </div>
  )
}

export default App
