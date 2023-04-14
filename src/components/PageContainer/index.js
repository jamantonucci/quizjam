import { motion } from 'framer-motion';

export default function PageContainer({ title, children, className }) {
	return (
		<main className='page'>
			<motion.main
				className={'container ' + (className || '')}
				initial={{ x: -20, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
			>
				{children}
			</motion.main>
		</main>
	);
}
