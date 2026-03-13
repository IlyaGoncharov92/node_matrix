import { minReplacements } from './minReplacements';

describe('minReplacements function', () => {

	test('should return 0 when no triplets exist (alternating signs)', () => {
		const input = [1, -1, 1, -2, 1, -3, 1, -4, 1, -5];
		expect(minReplacements(input)).toBe(0);
	});

	test('should return 0 when sequence is broken by zeros', () => {
		const input = [10, 10, 0, 10, 10, 0, -5, -5, 0, -5];
		expect(minReplacements(input)).toBe(0);
	});

	test('should handle exactly one triplet at the beginning', () => {
		const input = [10, 10, 10, -5, 4, -2, 1, 8, -3, 6];
		expect(minReplacements(input)).toBe(1);
	});

	test('should handle exactly one triplet at the end', () => {
		const input = [1, 2, -1, -2, 1, 2, -1, 5, 5, 5];
		expect(minReplacements(input)).toBe(1);
	});

	test('should return 3 for a full sequence of 10 positive numbers', () => {
		// Индексы замен: 2, 5, 8
		const input = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
		expect(minReplacements(input)).toBe(3);
	});

	test('should return 3 for a full sequence of 10 negative numbers', () => {
		const input = [-10, -20, -30, -40, -50, -60, -70, -80, -90, -100];
		expect(minReplacements(input)).toBe(3);
	});

	test('should handle overlapping sequences correctly (greedy check)', () => {
		// [1, 1, 1, 1, -1, -1, -1, -1, 5, 5]
		// 1. Индекс 2 (1,1,1) -> замена. Массив: [1,1,0,1,-1,-1,-1,-1,5,5]
		// 2. Индекс 6 (-1,-1,-1) -> замена. Массив: [1,1,0,1,-1,-1,0,-1,5,5]
		const input = [1, 1, 1, 1, -1, -1, -1, -1, 5, 5];
		expect(minReplacements(input)).toBe(2);
	});

	test('should treat 0 as a neutral element', () => {
		const input = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		expect(minReplacements(input)).toBe(0);
	});

	test('should work with boundary values (-100 and 100)', () => {
		const input = [100, 100, 100, -100, -100, -100, 100, 100, 100, 0];
		expect(minReplacements(input)).toBe(3);
	});

	describe('Validation', () => {
		test('should throw error if array length is less than 10', () => {
			const input = [1, 1, 1];
			expect(() => minReplacements(input)).toThrow("Массив должен содержать ровно 10 элементов");
		});

		test('should throw error if array length is more than 10', () => {
			const input = new Array(11).fill(1);
			expect(() => minReplacements(input)).toThrow("Массив должен содержать ровно 10 элементов");
		});
	});
});