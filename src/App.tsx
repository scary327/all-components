import { useEffect, useState } from 'react'
import styles from './app.module.css'
import DragAndDrop from './components/dragAndDrop/dragAndDrop'
import { Modal } from './components/Modal/modal'
import { Select } from './components/Select/select'
import _ from 'lodash'

interface IUserData {
	clicks: string[],
	keys: string[],
	timeSpent: number
}

function App() {
	const [modalVisible, setModalVisible] = useState(false)

	//селект чисто информационный, либо делать ссылки для перехода
	const selectTitle = 'Список'
	const selectChildrens = ['item1', 'item2', 'item3'];

	//сбор статистики
	const [clicks, setClicks] = useState<string[]>([]);
    const [keys, setKeys] = useState<string[]>([]);
	const [currentKeyString, setCurrentKeyString] = useState<string>('');
    const [timeSpent, setTimeSpent] = useState<number>(0);
    const [startTime] = useState<number>(Date.now());

	const [ userData, setUserData ] = useState<IUserData>();

	//допилить дебаунс
    const debouncedAddKeyString = _.debounce(() => {
        if (currentKeyString) {
            setKeys((prevKeys) => [...prevKeys, currentKeyString]);
            setCurrentKeyString('');
        }
    }, 600);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            setClicks((prevClicks) => [...prevClicks, (event.target as HTMLElement).className]);
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            setCurrentKeyString((prev) => prev + event.key);
			debouncedAddKeyString();
        };

        const handleBeforeUnload = () => {
            const spentTime = Date.now() - startTime;
            setTimeSpent(spentTime);
			setUserData({clicks, keys, timeSpent})
        };

        document.addEventListener('click', handleClick);
        document.addEventListener('keydown', handleKeyDown);
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [clicks, debouncedAddKeyString, keys, startTime, timeSpent]);

	useEffect(() => {
		// console.log(userData)
		console.log('clicks: ' + clicks)
		console.log('keys: ' + keys)
	}, [clicks, keys, userData]);

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
			<h2>Select</h2>
			<Select title={selectTitle} childrens={selectChildrens} />
		</div>
	)
}

export default App