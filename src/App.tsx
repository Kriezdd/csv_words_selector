import React, {useState} from 'react';
import UploadButton from "./components/UploadButton/UploadButton";
import StringList from "./components/StringList/StringList";

export type Data = {
    uid: string;
    strings: string[];
}

const App = () => {
    const [data, setData] = useState<Data[]>([]);

    // Function to handle adding new data from the child component
    const handleAddData = (newData: Data) => {
        setData(prevState => [...prevState, newData]);
    };

    // Function to handle removing data based on a file name
    const handleRemoveData = (fileName: string) => {
        setData(prevData => prevData.filter(data => data.uid !== fileName));
    };

    return (
        <div>
            <UploadButton onAddData={handleAddData} onRemoveData={handleRemoveData} />
            <StringList data={data} />
        </div>
    );
};

export default App;
