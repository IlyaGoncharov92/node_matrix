import { minReplacements } from './minReplacements';

function main(): void {
	const rnd = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

	const SIZE = 10;
	const matrix: number[][] = [];

	// Переменные для отслеживания глобального минимума всей матрицы
	let globalMin = Infinity;
	let minRowIdx = -1;

	// --- ЭТАП 1: Генерация данных ---
	for (let i = 0; i < SIZE; i++) {
		const row: number[] = [];
		for (let j = 0; j < SIZE; j++) {
			const val = rnd(-100, 100);
			row.push(val);

			// Сразу обновляем глобальный минимум, чтобы не обходить массив повторно
			if (val < globalMin) {
				globalMin = val;
				minRowIdx = i;
			}
		}
		matrix.push(row);
	}

	// --- ЭТАП 2: Вывод заголовка таблицы ---
	// Генерируем номера колонок 0..9 для удобства чтения
	console.log('    ' + Array.from({length: SIZE}, (_, i) => i.toString().padStart(5)).join('') + ' | MinPos | Fixes');
	console.log('-'.repeat(78));

	// --- ЭТАП 3: Анализ каждой строки и вывод результатов ---
	matrix.forEach((row, idx) => {
		// Находим наименьшее число > 0 (MinPos)
		// Используем фильтрацию, чтобы исключить отрицательные числа и нули
		const minPositive = row.filter(n => n > 0).sort((a, b) => a - b)[0];

		// Считаем кол-во замен для предотвращения "3 в ряд" (Fixes)
		const fixes = minReplacements(row);

		// Подготовка визуальных элементов:
		// Помечаем звездочкой строку с глобальным минимумом
		const marker = (idx === minRowIdx) ? '*' : ' ';

		// Форматируем числа в строке для выравнивания колонок (5 символов на число)
		const rowStr = row.map(n => n.toString().padStart(5)).join('');

		// Если положительных чисел нет, выводим 'None'
		const minPosStr = (minPositive || 'None').toString().padStart(6);

		// Итоговая строка: [Маркер][ID] | [Числа] | [МинПоз] | [Замены]
		console.log(`${marker}${idx.toString().padStart(2)} |${rowStr} | ${minPosStr} | ${fixes.toString().padStart(5)}`);
	});

	console.log('-'.repeat(78));
	console.log(`* — Строка содержит глобальный минимум (${globalMin})`);
}

main();
