import { prepareMatrix } from './prepareMatrix';
import { renderTable } from './renderTable';

export function main(): void {
	const data = prepareMatrix(10);

	renderTable(data);
}

main();
