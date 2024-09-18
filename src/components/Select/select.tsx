import {useState } from 'react'
import styles from './select.module.css'

interface SelectProps {
	title: string
	childrens: string[]
}

//можно много чего допилить
export const Select = (props: SelectProps) => {
	const title = props.title
	const childrens = props.childrens
	const [visible, setVisible] = useState<boolean>(false)

	return (
		<div className={styles.container}>
			<button className={styles.open_btn} onClick={() => setVisible(!visible)}>{title}</button>
			{visible && 
				<div className={styles.childrens}>
					{childrens.map((child, index) => (
						<div key={index} className={styles.child}>
							{child}
						</div>
					))}
				</div>
			}
		</div>
	)
}
