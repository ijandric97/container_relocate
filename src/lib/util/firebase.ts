import '../../firebase.config';
import { getDatabase, increment, onValue, ref, set } from 'firebase/database';
import type { ProblemsStore } from '../stores/problemsStore';

export type TStatistic = {
	problem_count: number;
	solved_count: number;
};

export const fBase = {
	getStatistic: async (callback: (value: TStatistic) => void) => {
		const db = getDatabase();
		const statisticRef = ref(db, '/statistic');

		onValue(
			statisticRef,
			(snapshot) => {
				try {
					const data = snapshot.val();
					callback({ problem_count: data.problem_count, solved_count: data.solved_count });
				} catch {
					console.error('Could not load statistics from Firestore!');
				}
			},
			{ onlyOnce: true }
		);
	},
	getProblems: async (callback: (value: ProblemsStore) => void) => {
		const db = getDatabase();
		const problemsRef = ref(db, '/problems');

		onValue(
			problemsRef,
			(snapshot) => {
				try {
					const data = snapshot.val();

					// We need to add some data not returned by Firebase
					data.forEach((element: any) => {
						element.finished = false;
						element.current = 1;
						element.original = JSON.parse(JSON.stringify(element.data));
						element.solution = {
							isActive: false,
							current: 1,
							moves: element.solution
						};
					});
					callback(data);
				} catch {
					console.error('Could not load problems from the Firebase!');
				}
			},
			{ onlyOnce: true }
		);
	},
	incrementSolvedCount: async () => {
		try {
			const dbRef = ref(getDatabase());
			set(dbRef, {
				['/statistic/solved_count']: increment(1)
			});
		} catch (error) {
			console.error('Could not update solved_count.');
		}
	}
};

export default fBase;
