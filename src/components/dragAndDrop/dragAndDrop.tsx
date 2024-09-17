import { DragEvent, useState } from 'react';
import styles from './dragAndDrop.module.css'

interface ICard {
    id: number,
    title: string
}

interface IBoard {
    id: number,
    name: string,
    items: ICard[]
}

const DragAndDrop = () => {

    const [ boards, setBoards] = useState<IBoard[]>([
        {id: 1, name: 'В планах', items: [{id: 1, title: 'Kurit'}, {id: 2, title: 'Igrat v dotu'}]},
        {id: 2, name: 'В разработке', items: [{id: 3, title: 'shodit v store'}, {id: 4, title: 'kupit bread'}]},
        {id: 3, name: 'Сделанно', items: [{id: 5, title: 'Pokushat'}, {id: 6, title: 'A kogo ebet chto ya delayu?'}, {id: 7, title: 'jopa jopa'}]}
    ])
    const [ currentBoard, setCurrentBoard ] = useState<IBoard | null>(null)
    const [ currentCard, setCurrentCard ] = useState<ICard | null>(null)

    //тень не работает, допилить
    function dragOverHandler(e: DragEvent<HTMLDivElement>): void {
        e.preventDefault();
        const target = e.target as HTMLElement;
        if (target.classList.contains('card__title')) {
            target.style.boxShadow = '0 4px 3px gray' 
        }
    }

    function dragLeaveHandler(e: DragEvent<HTMLDivElement>): void {
        const target = e.target as HTMLElement;
        target.style.boxShadow = 'none'
    }

    function dragStartHandler(e: DragEvent<HTMLDivElement>, board: IBoard, card: ICard): void {
        setCurrentBoard(board);
        setCurrentCard(card)
    }

    function dragEndHandler(e: DragEvent<HTMLDivElement>): void {
        const target = e.target as HTMLElement;
        target.style.boxShadow = 'none'
    }

    function dropHandler(e: DragEvent<HTMLDivElement>, board: IBoard, card: ICard): void {
        e.preventDefault();
        const currentIndex = currentBoard?.items.indexOf(currentCard as ICard)
        currentBoard?.items.splice(currentIndex as number, 1);
        const dropIndex = board.items.indexOf(card)
        board?.items.splice(dropIndex + 1, 0, currentCard as ICard);

        setBoards(prev => {
            const newBoards = prev.map((b) => {
                if (b.id === board.id) {
                    return board
                }
                if (currentBoard !== null && b.id === currentBoard.id) {
                    return currentBoard
                }
                return b
            })
            return newBoards
        })
    }

    return ( 
        <div className={styles.container}>
            {boards.map((board) => (
                <div key={board.id} className={styles.board}>
                    <div className={styles.board__title}>{board.name}</div>
                    {board.items.map(card => 
                        <div 
                            key={card.id} 
                            className={styles.card__title}
                            draggable={true}
                            onDragOver={(e) => dragOverHandler(e)}
                            onDragLeave={(e) => dragLeaveHandler(e)}
                            onDragStart={(e) => dragStartHandler(e, board, card)}
                            onDragEnd={(e) => dragEndHandler(e)}
                            onDrop={(e) => dropHandler(e, board, card)}
                        >
                            {card.title}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
 
export default DragAndDrop;