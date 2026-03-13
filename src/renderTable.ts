import { MatrixData } from './prepareMatrix';

export function renderTable(data: MatrixData): void {
	const { rows, globalMin } = data;
	const size = rows[0]?.row.length || 0;

	const headerCols = Array.from({ length: size }, (_, i) => i.toString().padStart(5)).join('');
	console.log(`    ${headerCols} | MinPos | Fixes`);
	console.log('-'.repeat(15 + size * 5 + 15));

	rows.forEach((rowData, idx) => {
		// Если в строке есть глобальный минимум, ставим звездочку
		const marker = rowData.isGlobalMinRow ? '*' : ' ';
		const rowStr = rowData.row.map(n => n.toString().padStart(5)).join('');
		const minPosStr = (rowData.minPositive?.toString() ?? 'None').padStart(6);
		const fixesStr = rowData.replacements.toString().padStart(5);

		console.log(`${marker}${idx.toString().padStart(2)} |${rowStr} | ${minPosStr} | ${fixesStr}`);
	});

	console.log('-'.repeat(15 + size * 5 + 15));
	console.log(`* — Row contains a global minimum: (${globalMin})`);
}
