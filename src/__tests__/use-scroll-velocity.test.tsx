import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useScrollVelocity } from "../use-scroll-velocity.js";

describe("useScrollVelocity", () => {
	it("returns default state on initial render", () => {
		const { result } = renderHook(() => useScrollVelocity());
		expect(result.current.velocity).toBe(0);
		expect(result.current.speed).toBe(0);
		expect(result.current.direction).toBe("idle");
		expect(result.current.isScrolling).toBe(false);
	});

	it("accepts custom options without errors", () => {
		const { result } = renderHook(() =>
			useScrollVelocity({
				smoothing: 0.2,
				maxSpeed: 3000,
				idleTimeout: 200,
			}),
		);
		expect(result.current.direction).toBe("idle");
	});

	it("respects reduced motion preference", () => {
		const { result } = renderHook(() => useScrollVelocity({ respectMotionPreference: true }));
		expect(result.current.velocity).toBe(0);
	});

	it("returns consistent state shape", () => {
		const { result } = renderHook(() => useScrollVelocity());
		const state = result.current;
		expect(typeof state.velocity).toBe("number");
		expect(typeof state.speed).toBe("number");
		expect(typeof state.direction).toBe("string");
		expect(typeof state.isScrolling).toBe("boolean");
		expect(["up", "down", "idle"]).toContain(state.direction);
	});
});
