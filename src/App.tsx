import { useState } from 'react'
import styles from './app.module.css'
import DragAndDrop from './components/dragAndDrop/dragAndDrop'
import { Modal } from './components/Modal/modal'

function App() {
	const [modalVisible, setModalVisible] = useState(false)

	return (
		<div className={styles.container}>
			<h1>Все нужные компоненты здесь</h1>
			<button onClick={() => setModalVisible(true)}>открыть модалку</button>
			<Modal visible={modalVisible} onClose={() => setModalVisible(false)}>
				<div>Это готовая модалка</div>
				<button onClick={() => setModalVisible(false)}>x</button>
			</Modal>
			<h2>Drag and Drop</h2>
			<DragAndDrop />
		</div>
	)
}

export default App
