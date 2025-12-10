import React from "react";
import './Viewer.css'
import { getEmotionImage } from '../util/get-emotion-image'
import { emotionList } from "../util/constants";

const Viewer = ({emotionId, content}) => {
  
    const emotionItem = emotionList.find(
        (item) => { return String(item.emotionId) === String(emotionId) }
    );
    return (
      <div className="Viewer">
        <section className="img_section">
            <h4>오늘의 감정</h4>
            <div className={`emotion_img_wrapper emotion_img_wrapper_${emotionId}`}>
                <img src={getEmotionImage(emotionId)}/>
                <div>
                    {emotionItem.emotionName}
                </div>
            </div>
        </section>
        <section className="content_section">
            <h4>오늘의 일기</h4>
            <div className="contents_wrapper">
                <p>{content}</p>
            </div>
        </section>
      </div>
    );
}

export default Viewer;