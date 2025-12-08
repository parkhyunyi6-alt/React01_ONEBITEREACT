/* eslint-disable react-refresh/only-export-components */
import './App.css';
import React, { createContext } from 'react';
import { Routes, Route } from "react-router-dom";
import { useReducer, useRef } from 'react';

import Home from './pages/Home';
import New from './pages/New';
import Diary from './pages/Diary';
import Edit from './pages/Edit';
import Notfound from './pages/Notfound';

const mockData = [
  {
    id: 1,
    createdDate: new Date("2025-12-03").getTime(),
    emotionId: 5,
    content: "이번 달 나쁜 일기"
  }, 
  {
    id: 2,
    createdDate: new Date("2025-12-06").getTime(),
    emotionId: 2,
    content: "이번 달 좋은 일기"
  },   
  {
    id: 3,
    createdDate: new Date("2025-11-05").getTime(),
    emotionId: 3,
    content: "지난달 적당한 일기"
  },   
  {
    id: 4,
    createdDate: new Date("2026-01-05").getTime(),
    emotionId: 4,
    content: "다음달 일기"
  },   
  {
    id: 5,
    createdDate: new Date("2026-01-06").getTime(),
    emotionId: 1,
    content: "다음달 좋은 일기"
  },   
]
function reducer(state, action){
  switch(action.type) {
    case "CREATE" :
      return [action.data, ...state];
    case "UPDATE" :
      return state.map((item)=>String(item.id) === String(action.data.id)? action.data : item );
    case "DELETE" :
      return state.filter((item)=>String(item.id) !== String(action.id));
  }
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [diaryData, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(6);
  // 새로운 일기 추가

  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type:"CREATE",
      data: {
        id : idRef.current++,
        createdDate,
        emotionId,
        content
      }
    });
  }

  // 기존 일기 수정

  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        emotionId,
        content
      }
    })
  }

  // 기존 일기 삭제
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    })
  }

  return (
    <>
      <DiaryStateContext.Provider value={diaryData}>
        <DiaryDispatchContext.Provider 
          value={{
            onCreate, 
            onUpdate, 
            onDelete
          }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<Notfound />}/>
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App
