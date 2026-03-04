import type { VelocityOpacityProps } from "./types.js";
import { useScrollVelocity } from "./use-scroll-velocity.js";

/**
 * Element that fades based on scroll velocity.
 * By default fades out when scrolling fast, fades in when slow/stopped.
 */
export function VelocityOpacity({
	children,
	fadeOut = true,
	minOpacity = 0.1,
	className,
	style,
	as: Tag = "div",
}: VelocityOpacityProps) {
	const { velocity } = useScrollVelocity();

	const absVelocity = Math.abs(velocity);
	const opacity = fadeOut
		? 1 - absVelocity * (1 - minOpacity)
		: minOpacity + absVelocity * (1 - minOpacity);

	return (
		<Tag
			className={className}
			style={{
				opacity: Math.max(minOpacity, Math.min(1, opacity)),
				willChange: "opacity",
				transition: "opacity 0.1s ease-out",
				...style,
			}}
		>
			{children}
		</Tag>
	);
}
