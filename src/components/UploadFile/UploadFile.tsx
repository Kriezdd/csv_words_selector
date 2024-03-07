import React, {useState} from 'react';
import {UploadOutlined} from '@ant-design/icons';
import type {UploadProps} from 'antd';
import {Button, message, Upload} from 'antd';
import Papa from 'papaparse';

const props: UploadProps = {
    accept: '.csv',
    name: 'file',
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {
        authorization: 'authorization-text',
    },
    maxCount: 1,
};

type UploadButtonProps = {
    onChangeData: (data: string[]) => void;
}

const UploadFile = ({onChangeData}: UploadButtonProps) => {
    const [fileList, setFileList] = useState();

    const handleChange = (info: any) => {
        let {status, name} = info.file;
        if (status === 'done') {
            message.success(`${name} файл успешно загружен.`);
            parseCSV(info.file.originFileObj);
        } else if (status === 'error') {
            message.error(`${name} ошибка в загрузке файла.`);
        }
        // Update the fileList state with the new fileList from the info object
        setFileList(info.fileList);

        // If the file is being removed, call onRemoveData with the file uid
        if (status === 'removed') {
            onChangeData([]);
        }
    };

    const parseCSV = (file: File) => {
        Papa.parse(file, {
            complete: (results) => {
                onChangeData(results.data.flat() as string[]);
            },
            delimiter: ';',
            skipEmptyLines: true,
        });
    };

    return (
        <Upload {...props} onChange={handleChange}>
            <Button icon={<UploadOutlined/>}>Загрузить .csv файл</Button>
        </Upload>
    );
};

export default UploadFile;
