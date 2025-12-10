import React from 'react';
import { useState, useContext } from 'react';
import { DiaryStateContext } from '../App';

import Header from '../components/Header';
import Button from '../components/Button';
import DiaryList from '../components/DiaryList';
import usePageTitle from '../hooks/usePageTitle';

const getMonthlyData = (pivotDate, diaryData) => {
    const beginTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth(), 1, 0, 0, 0).getTime();
    const endTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth()+1, 0, 23, 59, 59).getTime();

    return diaryData.filter(
        (item) => 
             beginTime <= item.createdDate  && item.createdDate <= endTime
    );
};

const Home = () => {

    
    usePageTitle("감정 일기장");

    const diaryData = useContext(DiaryStateContext);
    const [pivotDate, setPivotDate] = useState(new Date());
    const onIncreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth()+1));
    }
    const onDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth()-1));
    }

    const monthlyData = getMonthlyData(pivotDate, diaryData);
    return (
    <div>
        <Header 
          title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth()+1}월`} 
          leftChild={<Button onClick={onDecreaseMonth} text={"<"} />}
          rightChild={<Button onClick={onIncreaseMonth} text={">"} />}
        />
        <DiaryList data={monthlyData}/>
    </div>
);}

export default Home;