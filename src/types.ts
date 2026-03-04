import type { CSSProperties, PropsWithChildren } from "react";

/** Scroll direction */
export type ScrollDirection = "up" | "down" | "idle";

/** Scroll velocity state returned by the hook */
export interface ScrollVelocityState {
	/** Normalized velocity (-1 to 1). Negative = scrolling up, positive = scrolling down. */
	velocity: number;
	/** Raw velocity in px/s */
	speed: number;
	/** Current scroll direction */
	direction: ScrollDirection;
	/** Whether the user is currently scrolling */
	isScrolling: boolean;
}

/** Options for useScrollVelocity hook */
export interface ScrollVelocityOptions {
	/** Smoothing factor (0-1). Lower = smoother. Default: 0.1 */
	smoothing?: number;
	/** Max speed in px/s to normalize against. Default: 2000 */
	maxSpeed?: number;
	/** Time in ms before scroll is considered stopped. Default: 150 */
	idleTimeout?: number;
	/** Whether to respect prefers-reduced-motion. Default: true */
	respectMotionPreference?: boolean;
}

/** Props for VelocityText component */
export interface VelocityTextProps extends PropsWithChildren {
	/** Max skew angle in degrees. Default: 10 */
	maxSkew?: number;
	/** Also apply scaleY based on velocity. Default: false */
	squeeze?: boolean;
	/** Max scaleY change (0-1). Default: 0.1 */
	maxSqueeze?: number;
	/** Additional CSS class */
	className?: string;
	/** Additional inline styles */
	style?: CSSProperties;
	/** HTML tag to render. Default: 'div' */
	as?: "div" | "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "section" | "article";
}

/** Props for VelocityMarquee component */
export interface VelocityMarqueeProps extends PropsWithChildren {
	/** Base speed in px/s. Default: 50 */
	baseSpeed?: number;
	/** Max speed multiplier when scrolling. Default: 5 */
	maxSpeedMultiplier?: number;
	/** Reverse direction. Default: false */
	reverse?: boolean;
	/** Additional CSS class */
	className?: string;
	/** Additional inline styles */
	style?: CSSProperties;
}

/** Props for VelocityOpacity component */
export interface VelocityOpacityProps extends PropsWithChildren {
	/** Whether to fade out (true) or fade in (false) when scrolling. Default: true */
	fadeOut?: boolean;
	/** Min opacity. Default: 0.1 */
	minOpacity?: number;
	/** Additional CSS class */
	className?: string;
	/** Additional inline styles */
	style?: CSSProperties;
	/** HTML tag to render. Default: 'div' */
	as?: "div" | "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "section" | "article";
}
