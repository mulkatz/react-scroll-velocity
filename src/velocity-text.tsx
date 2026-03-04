import type { VelocityTextProps } from "./types.js";
import { useScrollVelocity } from "./use-scroll-velocity.js";

/**
 * Text that skews/squeezes based on scroll velocity.
 * Faster scrolling = more dramatic skew effect.
 */
export function VelocityText({
	children,
	maxSkew = 10,
	squeeze = false,
	maxSqueeze = 0.1,
	className,
	style,
	as: Tag = "div",
}: VelocityTextProps) {
	const { velocity } = useScrollVelocity();

	const skewY = velocity * maxSkew;
	const scaleY = squeeze ? 1 - Math.abs(velocity) * maxSqueeze : 1;

	return (
		<Tag
			className={className}
			style={{
				transform: `skewY(${skewY}deg) scaleY(${scaleY})`,
				willChange: "transform",
				...style,
			}}
		>
			{children}
		</Tag>
	);
}
