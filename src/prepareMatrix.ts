import { minReplacements } from './minReplacements';

interface RowAnalysis {
	row: number[];
	minPositive: number | null;
	replacements: number;
	isGlobalMinRow: boolean;
}

export interface MatrixData {
	rows: RowAnalysis[];
	globalMin: number;
}

export function prepareMatrix(size: number): MatrixData {
	const rnd = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

	const matrix: number[][] = [];
	let globalMin = Infinity;

	// 1. Генерируем матрицу и находим значение глобального минимума
	for (let i = 0; i < size; i++) {
		const row = Array.from({ length: size }, () => rnd(-100, 100));
		matrix.push(row);

		row.forEach(val => {
			if (val < globalMin) {
				globalMin = val;
			}
		});
	}

	// 2. Формируем данные. Проверяем каждую строку на наличие globalMin
	const rows: RowAnalysis[] = matrix.map((row) => {
		const positives = row.filter(n => n > 0);
		return {
			row,
			minPositive: positives.length > 0 ? Math.min(...positives) : null,
			replacements: minReplacements(row),
			isGlobalMinRow: row.includes(globalMin)
		};
	});

	return { rows, globalMin };
}