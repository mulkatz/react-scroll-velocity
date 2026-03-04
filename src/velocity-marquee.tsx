import { useEffect, useRef } from "react";
import type { VelocityMarqueeProps } from "./types.js";
import { useScrollVelocity } from "./use-scroll-velocity.js";

/**
 * Marquee that speeds up when scrolling.
 * Content scrolls continuously, accelerating with scroll velocity.
 */
export function VelocityMarquee({
	children,
	baseSpeed = 50,
	maxSpeedMultiplier = 5,
	reverse = false,
	className,
	style,
}: VelocityMarqueeProps) {
	const { speed } = useScrollVelocity();
	const containerRef = useRef<HTMLDivElement>(null);
	const positionRef = useRef(0);
	const rafRef = useRef<number>(0);
	const lastTimeRef = useRef(0);

	useEffect(() => {
		if (typeof window === "undefined") return;

		const container = containerRef.current;
		if (!container) return;

		const inner = container.firstElementChild as HTMLElement | null;
		if (!inner) return;

		const tick = (time: number) => {
			if (lastTimeRef.current === 0) {
				lastTimeRef.current = time;
			}
			const dt = (time - lastTimeRef.current) / 1000;
			lastTimeRef.current = time;

			const scrollMultiplier = 1 + (speed / 500) * (maxSpeedMultiplier - 1);
			const currentSpeed = baseSpeed * Math.min(scrollMultiplier, maxSpeedMultiplier);
			const direction = reverse ? 1 : -1;

			positionRef.current += currentSpeed * dt * direction;

			const contentWidth = inner.scrollWidth / 2;
			if (contentWidth > 0) {
				if (reverse) {
					if (positionRef.current >= contentWidth) {
						positionRef.current -= contentWidth;
					}
				} else {
					if (positionRef.current <= -contentWidth) {
						positionRef.current += contentWidth;
					}
				}
			}

			inner.style.transform = `translateX(${positionRef.current}px)`;
			rafRef.current = requestAnimationFrame(tick);
		};

		rafRef.current = requestAnimationFrame(tick);

		return () => {
			cancelAnimationFrame(rafRef.current);
			lastTimeRef.current = 0;
		};
	}, [baseSpeed, maxSpeedMultiplier, reverse, speed]);

	return (
		<div
			ref={containerRef}
			className={className}
			style={{
				overflow: "hidden",
				whiteSpace: "nowrap",
				...style,
			}}
		>
			<div style={{ display: "inline-flex", willChange: "transform" }}>
				{children}
				{children}
			</div>
		</div>
	);
}
