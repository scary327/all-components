import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./app.module.css";
import { CustomizeFileUpload } from "./components/customizeFileUpload/flieUpload";
import { useWhen } from "./hooks/useWhen";
import { Modal } from "./components/Modal/modal";
import { Select } from "./components/Select/select";

interface IUserData {
  clicks: string[];
  keys: string;
  timeSpent: number;
}

function App() {
  const [modalVisible, setModalVisible] = useState(false);

  //селект чисто информационный, либо делать ссылки для перехода
  const selectTitle = "Список";
  const selectChildrens = ["item1", "item2", "item3"];

  //сбор статистики
  const [clicks, setClicks] = useState<string[]>([]);
  const [currentKeyString, setCurrentKeyString] = useState<string>("");
  const [startTime] = useState<number>(Date.now());

  const [userData, setUserData] = useState<IUserData>();

  // Нативная реализация debounce с useRef
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedLog = useCallback((keyString: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      console.log("User input:", keyString);
    }, 600);
  }, []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      setClicks((prevClicks) => [
        ...prevClicks,
        (event.target as HTMLElement).className,
      ]);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      setCurrentKeyString((prev) => {
        const newKeyString = prev + event.key;
        debouncedLog(newKeyString);
        return newKeyString;
      });
    };

    const handleBeforeUnload = () => {
      const spentTime = Date.now() - startTime;
      setUserData({
        clicks: clicks,
        keys: currentKeyString,
        timeSpent: spentTime,
      });
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [clicks, currentKeyString, debouncedLog, startTime]);

  useEffect(() => {
    console.log(userData);
  }, [clicks, userData]);

  const condition = "Условие 1";
  const parameter = "Условие 1";
  if (condition === parameter) {
    console.log(parameter);
  }

  //пример хука useWhen
  const value = 3;
  const result = useWhen(
    value,
    [
      [1, "Value is one"],
      [2, "Value is two"],
      [3, "Value is three"],
    ],
    () => "Default value"
  );

  console.log(result);

  return (
    <div className={styles.container}>
      <h1>Все нужные компоненты здесь</h1>
      <button onClick={() => setModalVisible(true)}>открыть модалку</button>
      <Modal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <div>Это готовая модалка</div>
        <button onClick={() => setModalVisible(false)}>x</button>
      </Modal>
      <h2>Select</h2>
      <Select title={selectTitle} childrens={selectChildrens} />
      <h2>File upload custom</h2>
      <CustomizeFileUpload />
    </div>
  );
}

export default App;
