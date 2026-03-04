import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import type { ScrollDirection, ScrollVelocityOptions, ScrollVelocityState } from "./types.js";

const DEFAULT_STATE: ScrollVelocityState = {
	velocity: 0,
	speed: 0,
	direction: "idle",
	isScrolling: false,
};

function prefersReducedMotion(): boolean {
	if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * React hook that tracks scroll velocity using requestAnimationFrame.
 * Returns normalized velocity, raw speed, direction, and scrolling state.
 */
export function useScrollVelocity(options?: ScrollVelocityOptions): ScrollVelocityState {
	const {
		smoothing = 0.1,
		maxSpeed = 2000,
		idleTimeout = 150,
		respectMotionPreference = true,
	} = options ?? {};

	const stateRef = useRef<ScrollVelocityState>(DEFAULT_STATE);
	const listenersRef = useRef(new Set<() => void>());

	const subscribe = useCallback((listener: () => void) => {
		listenersRef.current.add(listener);
		return () => {
			listenersRef.current.delete(listener);
		};
	}, []);

	const getSnapshot = useCallback(() => stateRef.current, []);
	const getServerSnapshot = useCallback(() => DEFAULT_STATE, []);

	useEffect(() => {
		if (typeof window === "undefined") return;
		if (respectMotionPreference && prefersReducedMotion()) return;

		let lastScrollY = window.scrollY;
		let lastTime = performance.now();
		let smoothedVelocity = 0;
		let rafId: number;
		let idleTimerId: ReturnType<typeof setTimeout> | null = null;

		const notify = () => {
			for (const listener of listenersRef.current) {
				listener();
			}
		};

		const setIdle = () => {
			smoothedVelocity = 0;
			const newState: ScrollVelocityState = {
				velocity: 0,
				speed: 0,
				direction: "idle",
				isScrolling: false,
			};
			stateRef.current = newState;
			notify();
		};

		const tick = () => {
			const now = performance.now();
			const dt = now - lastTime;
			const currentScrollY = window.scrollY;
			const delta = currentScrollY - lastScrollY;

			if (dt > 0) {
				const rawVelocity = (delta / dt) * 1000; // px/s
				smoothedVelocity += (rawVelocity - smoothedVelocity) * smoothing;

				const absSpeed = Math.abs(smoothedVelocity);
				const normalizedVelocity = Math.max(-1, Math.min(1, smoothedVelocity / (maxSpeed || 1)));

				let direction: ScrollDirection = "idle";
				if (absSpeed > 5) {
					direction = smoothedVelocity > 0 ? "down" : "up";
				}

				const isScrolling = absSpeed > 5;

				const prev = stateRef.current;
				if (
					prev.direction !== direction ||
					prev.isScrolling !== isScrolling ||
					Math.abs(prev.velocity - normalizedVelocity) > 0.005
				) {
					stateRef.current = {
						velocity: normalizedVelocity,
						speed: absSpeed,
						direction,
						isScrolling,
					};
					notify();
				}

				if (isScrolling) {
					if (idleTimerId) clearTimeout(idleTimerId);
					idleTimerId = setTimeout(setIdle, idleTimeout);
				}
			}

			lastScrollY = currentScrollY;
			lastTime = now;
			rafId = requestAnimationFrame(tick);
		};

		rafId = requestAnimationFrame(tick);

		return () => {
			cancelAnimationFrame(rafId);
			if (idleTimerId) clearTimeout(idleTimerId);
		};
	}, [smoothing, maxSpeed, idleTimeout, respectMotionPreference]);

	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
