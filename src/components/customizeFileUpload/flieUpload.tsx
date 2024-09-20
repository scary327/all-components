import { useState } from 'react'
import styles from './fileUpload.module.css'

//Компонент для загрузки файлов с поддержкой перетаскивания (drag-and-drop), множественной загрузки, предпросмотра файлов и индикаторов загрузки
export const CustomizeFileUpload = () => {
	const [files, setFiles] = useState([])

	const handleFileChange = e => {
		const selectedFiles = Array.from(e.target.files)
		setFiles(prev => [...prev, ...selectedFiles])
	}

	const handleDrop = e => {
		e.preventDefault()
		const selectedFiles = Array.from(e.dataTransfer.files)
		setFiles(prev => [...prev, ...selectedFiles])
	}

	const handleDragOver = e => {
		e.preventDefault()
	}

	const handleDelete = e => {
		setFiles(prev => prev.filter(file => file.name !== e))
	}

	return (
		<div>
			<div onDragOver={handleDragOver} onDrop={handleDrop}>
				Перетащите файлы сюда или нажмите для выбора
			</div>
			<input type='file' multiple onChange={handleFileChange} />
			<p>Список всех файлов</p>
			<ul>
				{files.length > 0 &&
					files.map((file, index) => (
						<div key={index}>
							{file.name}{' '}
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
	)
}
