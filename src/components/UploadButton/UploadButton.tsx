import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';
import Papa from 'papaparse';
import {Data} from "../../App";

const props: UploadProps = {
    accept: '.csv',
    name: 'file',
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {
        authorization: 'authorization-text',
    },
};

type UploadButtonProps = {
    onAddData: (data: Data) => void;
    onRemoveData: (uid: string) => void;
}

const UploadButton = ({ onAddData, onRemoveData } : UploadButtonProps) => {
    const [fileList, setFileList] = useState<any[]>([]);

    const handleChange = (info: any) => {
        let { status, name, uid } = info.file;
        if (status === 'done') {
            message.success(`${name} файл успешно загружен.`);
            parseCSV(info.file.originFileObj, uid);
        } else if (status === 'error') {
            message.error(`${name} ошибка в загрузке файла.`);
        }
        // Update the fileList state with the new fileList from the info object
        setFileList(info.fileList);

        // If the file is being removed, call onRemoveData with the file name
        if (status === 'removed') {
            onRemoveData(uid);
        }
    };

    const parseCSV = (file: File, uid: string) => {
        Papa.parse(file, {
            complete: (results) => {
                // Add the file name to each row of data
                const newData: Data = {
                    uid,
                    strings: results.data as string[],
                }
                onAddData(newData);
            },
            delimiter: ';',
            skipEmptyLines: true,
        });
    };

    return (
        <Upload {...props} onChange={handleChange} >
            <Button icon={<UploadOutlined />}>Загрузить .csv файл</Button>
        </Upload>
    );
};

export default UploadButton;