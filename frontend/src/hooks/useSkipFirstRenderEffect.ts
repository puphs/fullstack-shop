import { EffectCallback, useEffect, useRef } from 'react';

export const useSkipFirstRenderEffect = (
	effect: EffectCallback,
	deps?: React.DependencyList | undefined
) => {
	const skippedFirstRenderRef = useRef(false);

	useEffect(() => {
		if (skippedFirstRenderRef.current) {
			effect();
		} else {
			skippedFirstRenderRef.current = true;
		}
	}, deps);
};
