/**
 * Склоняет слово в зависимости от числительного
 *
 * @param {!Number} count - необходимое числительное
 * @param {!String[]} titles - массив склонений слова в порядке "для одного - для двух - для пяти"
 * @returns {*}
 */
export default function formatCount(count, titles) {
	const cases = [2, 0, 1, 1, 1, 2];
	if(!titles)
		return;

	return titles[
		count % 100 > 4 && count % 100 < 20
			? 2
			: cases[count % 10 < 5 ? count % 10 : 5]
		];
}