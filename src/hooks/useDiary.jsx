import React from "react";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryStateContext } from "../App";

const useDiary = (id) => {
    const diaryData = useContext(DiaryStateContext);
    const [curDiaryItem, setCurDiaryItem] = useState();
    const nav = useNavigate();

    useEffect(()=>{
      const currentDiaryItem = diaryData.find(
        (item) => { return String(item.id) === String(id)}
      );

      if(!currentDiaryItem) {
        window.alert("존재하지 않는 일기입니다.");
        nav("/", { replace: true });
      }

      setCurDiaryItem(currentDiaryItem);
    },[id]);

    return curDiaryItem;

}

export default useDiary;