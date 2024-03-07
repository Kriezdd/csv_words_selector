import React, {useState} from 'react';
import {ConfigProvider} from "antd";
import UploadFile from "./components/UploadFile/UploadFile";
import StringList from "./components/StringList/StringList";
import SaveButton from "./components/SaveButton/SaveButton";
import ClearButton from "./components/ClearSelections/ClearButton";
import './App.css';

const App = () => {
  const [data, setData] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<Record<number, { word: string; wordId: number }[]>>({});

  const handleWordSelected = (word: string, rowIndex: number, wordId: number) => {
    setSelectedWords(prev => {
      const words = prev[rowIndex] || [];
      const index = words.findIndex(item => item.wordId == wordId);
      if (index === -1) {
        // Добавляем слово с уникальным идентификатором
        words.push({word, wordId: wordId});
      } else {
        // Удаляем слово по уникальному идентификатору
        words.splice(index, 1);
      }

      // Проверяем, остались ли в массиве слова после удаления
      if (words.length === 0) {
        // Если массив пуст, удаляем ключ из объекта
        const newSelectedWords = {...prev};
        delete newSelectedWords[rowIndex];
        return newSelectedWords;
      } else {
        // Если массив не пуст, обновляем объект
        return {...prev, [rowIndex]: words};
      }
    });
  };

  const handleClearSelections = () => {
    setSelectedWords({});
  };


  return (
    <div className="app">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#00A88E',
          }
        }}
      >
        <UploadFile onChangeData={setData}/>
        <StringList data={data} onWordSelected={handleWordSelected} selectedWords={selectedWords}/>
        {
          Object.values(selectedWords).some(words => words.length > 0) &&
            <div className="button-group">
                <SaveButton selectedWords={selectedWords}/>
                <ClearButton onClear={handleClearSelections}/>
            </div>
        }
      </ConfigProvider>
    </div>
  );
};

export default App;
