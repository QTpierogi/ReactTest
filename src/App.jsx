import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const exampleList = [
    {title: 'Trash', isHidden: true, id: 1},
    {title: 'Useful Item', isHidden: false, id: 2},
    {title: 'Just Item', isHidden: false, id: 3},
    {title: 'Useless Item', isHidden: true, id: 4},
    {title: 'Basic Item', isHidden: false, id: 5}
  ];

function listMapped() {
  const listItems = exampleList.map((item) => 
    <li key={item.id}>
      {item.title}
    </li>);

  return(
    <ul>{listItems}</ul>)
}

function listCycled() {
  const listItems = []
  for(const item of exampleList) {
    if(!item.isHidden)
      listItems.push(<li key={item.key}>{item.title}</li>)
  }

  return(<ul>{listItems}</ul>)
}

//export default listMapped
export default listCycled
