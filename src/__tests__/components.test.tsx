import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { VelocityMarquee } from "../velocity-marquee.js";
import { VelocityOpacity } from "../velocity-opacity.js";
import { VelocityText } from "../velocity-text.js";

afterEach(cleanup);

describe("VelocityText", () => {
	it("renders children", () => {
		render(<VelocityText>Hello</VelocityText>);
		expect(screen.getByText("Hello")).toBeDefined();
	});

	it("applies skew transform", () => {
		const { container } = render(<VelocityText>Text</VelocityText>);
		const el = container.firstElementChild as HTMLElement;
		expect(el.style.transform).toContain("skewY");
	});

	it("renders with custom tag", () => {
		render(<VelocityText as="h1">Heading</VelocityText>);
		const el = screen.getByText("Heading");
		expect(el.tagName).toBe("H1");
	});

	it("applies custom className and style", () => {
		const { container } = render(
			<VelocityText className="custom" style={{ color: "red" }}>
				Styled
			</VelocityText>,
		);
		const el = container.firstElementChild as HTMLElement;
		expect(el.className).toBe("custom");
		expect(el.style.color).toBe("red");
	});

	it("applies squeeze transform when enabled", () => {
		const { container } = render(<VelocityText squeeze>Text</VelocityText>);
		const el = container.firstElementChild as HTMLElement;
		expect(el.style.transform).toContain("scaleY");
	});
});

describe("VelocityMarquee", () => {
	it("renders children duplicated for seamless loop", () => {
		render(
			<VelocityMarquee>
				<span>Content</span>
			</VelocityMarquee>,
		);
		const elements = screen.getAllByText("Content");
		expect(elements.length).toBe(2);
	});

	it("applies overflow hidden", () => {
		const { container } = render(<VelocityMarquee>Marquee</VelocityMarquee>);
		const el = container.firstElementChild as HTMLElement;
		expect(el.style.overflow).toBe("hidden");
	});
});

describe("VelocityOpacity", () => {
	it("renders children", () => {
		render(<VelocityOpacity>Fading</VelocityOpacity>);
		expect(screen.getByText("Fading")).toBeDefined();
	});

	it("applies opacity style", () => {
		const { container } = render(<VelocityOpacity>Content</VelocityOpacity>);
		const el = container.firstElementChild as HTMLElement;
		expect(el.style.opacity).toBeDefined();
	});

	it("renders with custom tag", () => {
		render(<VelocityOpacity as="span">Text</VelocityOpacity>);
		const el = screen.getByText("Text");
		expect(el.tagName).toBe("SPAN");
	});
});
