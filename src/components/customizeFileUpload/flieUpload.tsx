import { useState } from "react";
import styles from "./fileUpload.module.css";

//Компонент для загрузки файлов с поддержкой перетаскивания (drag-and-drop), множественной загрузки, предпросмотра файлов и индикаторов загрузки
export const CustomizeFileUpload = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const selectedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDelete = (fileName: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== fileName));
  };

  return (
    <div>
      <div onDragOver={handleDragOver} onDrop={handleDrop}>
        Перетащите файлы сюда или нажмите для выбора
      </div>
      <input type="file" multiple onChange={handleFileChange} />
      <p>Список всех файлов</p>
      <ul>
        {files.length > 0 &&
          files.map((file, index) => (
            <div key={index}>
              {file.name}{" "}
              <button
                className={styles.delete_btn}
                onClick={() => handleDelete(file.name)}
              >
                -
              </button>
            </div>
          ))}
        {files.length === 0 && <div>Вы не загрузили ни одного файла</div>}
      </ul>
    </div>
  );
};
