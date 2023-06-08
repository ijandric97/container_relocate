import type { PageLoad } from './$types';
import { goto } from '$app/navigation';

export const load = (({ params }) => {
	const { id } = params;

	if (!id || isNaN(Number(id))) {
		goto('/problems');
	}

	return {
		id
	};
}) satisfies PageLoad;
