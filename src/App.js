import logo from './logo.svg';
import './App.css';
import ToDoInput from './ToDoInput';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';

function App() {

  //localStorage.removeItem("toDoList");

  // ローカルストレージからデータを取得
  const jsonInitialToDoList = localStorage.getItem('toDoList');
  let initialToDoList = JSON.parse(jsonInitialToDoList);

  // データがない場合、配列を初期化
  if(initialToDoList === null) {
    initialToDoList = [];
  }

  // state変数を設定
  const [toDoList, setToDoList] = useState(initialToDoList);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  // ToDoリストの追加処理 
  const addTODoList = (newToDo) => {
    // ToDoリストを更新
    setToDoList(prev => ([...prev, newToDo]));
    // モーダルを閉じる
    setEditModalIsOpen(false);
  };

  // ToDoリストの削除 
  const deleteToDo = (id) => {
    // 特定のToDoリストを削除 
    const deleteToDoList = toDoList.filter(function(x){return x.id != id});
    // ToDoリストを更新
    setToDoList(deleteToDoList);
  };

  // ローカルストレージへの保存処理
  useEffect(
    () => {
      // ToDoリストをJSON形式へ変換
      const jsonToDoList = JSON.stringify(toDoList);
      // ローカルストレージへ保存
      localStorage.setItem('toDoList', jsonToDoList);
    },
    [ toDoList ]
  );

// 追加ボタン押下時処理
const createNew = () => {
  // モーダルを開く
  setEditModalIsOpen(true);
};

// 閉じるボタン押下時処理
const closeModal = () => {
  // モーダルを閉じる
  setEditModalIsOpen(false);
};

// モーダル用cssの設定
const customStyles = {
  content: {
    top: "45%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minWidth: "40%",
  },
};

  return (
      <div className="to_do_list_wrap">
        <div className="to_do_list">
          {toDoList.map((toDo) => (
            <div className="to_do">
              <p className="txt_title">{toDo.title}</p>
              <p className="txt_content">{toDo.content}</p>
              <div className="delete_btn">
                <button onClick={() => deleteToDo(toDo.id)} >削除</button>
              </div>
            </div>
          ))}
        </div>
        <div className="create_new">
          <button onClick={() => createNew()} >
            <img src='./create_new.svg' alt="logo" />
          </button>
        </div>
        <Modal isOpen={editModalIsOpen} style={customStyles}>
          <ToDoInput addTODoList={addTODoList} closeModal={closeModal} />
        </Modal>
         
      </div>
      
  );
}

export default App;
