// 子コンポーネント
import { useState } from 'react';
import './ToDoInput.css';

const ToDoInput = (props)=>{   

  // state変数を設定
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  // タイトル入力時処理
  const inputTitle = e => {
    // タイトルを更新
    setTitle(e.target.value);
  };

   // 本文入力時処理
  const inputContent = e => {
    // 本文を更新
    setContent(e.target.value);
  };

  // 登録データの作成
  const register = () => {
    // IDを生成
    const now = new Date();
    const id = now.getTime();

    // ToDoリストの追加用にオブジェクトを生成
    const addToDo = { id: id, title: title, content: content };
    
    // ToDoリストへ追加
    props.addTODoList(addToDo);

    // テキストボックスを初期化
    setTitle("");
    setContent("");
  };

  // モーダルを閉じる
  const close = () => {
    props.closeModal();
  };

  return(
      <div className="modal_inner">
        <button onClick={() => close()} className="close_btn">
          <img src='./close.svg'/>
        </button>
        <input type="text" value={title} onChange={inputTitle} className="input_title" placeholder="タイトル" />
        <textarea type="text" value={content} onChange={inputContent} className="input_content" placeholder="メモ" />
        <div className="register_btn">
          <button onClick={() => register()} >登録</button>
        </div>
      </div>
  )
}
export default ToDoInput