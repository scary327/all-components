import { useState } from 'react'
import styles from './select.module.css'

interface SelectProps {
	title: string
	childrens: string[]
}

export const Select = (props: SelectProps) => {
	const title = props.title
	const childrens = props.childrens
	const [visible, setVisible] = useState<boolean>(false)

	return (
		<div className={styles.container}>
			<button className={styles.open_btn}>{title}</button>
			<div className={styles.childrens}>
				{childrens.map((child, index) => (
					<div key={index} className={styles.child}>
						{child}
					</div>
				))}
			</div>
		</div>
	)
}
