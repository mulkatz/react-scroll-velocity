import { type ChildProcess, spawn } from "node:child_process";
import { type Page, chromium } from "playwright";

const WIDTH = 800;
const HEIGHT = 600;
const DEV_URL = "http://localhost:5173";

async function waitForServer(url: string, timeout = 15000): Promise<void> {
	const start = Date.now();
	while (Date.now() - start < timeout) {
		try {
			const res = await fetch(url);
			if (res.ok) return;
		} catch {
			// not ready yet
		}
		await new Promise((r) => setTimeout(r, 500));
	}
	throw new Error(`Server at ${url} did not start within ${timeout}ms`);
}

async function startDevServer(): Promise<ChildProcess> {
	const proc = spawn("npm", ["run", "dev"], {
		cwd: new URL("../demo", import.meta.url).pathname,
		stdio: "pipe",
	});
	await waitForServer(DEV_URL);
	return proc;
}

async function wait(ms: number): Promise<void> {
	return new Promise((r) => setTimeout(r, ms));
}

async function smoothScroll(page: Page, deltaY: number, steps = 15, stepDelay = 40) {
	const stepDelta = deltaY / steps;
	for (let i = 0; i < steps; i++) {
		await page.mouse.wheel(0, stepDelta);
		await wait(stepDelay);
	}
}

async function record() {
	console.log("Starting demo dev server...");
	const server = await startDevServer();

	try {
		console.log("Launching browser...");
		const browser = await chromium.launch();
		const context = await browser.newContext({
			viewport: { width: WIDTH, height: HEIGHT },
			recordVideo: {
				dir: "./tmp-video",
				size: { width: WIDTH, height: HEIGHT },
			},
		});

		const page = await context.newPage();
		await page.goto(DEV_URL);
		await wait(2000);

		// Scroll down slowly — shows VelocityText skew + hero
		await smoothScroll(page, 400, 20, 50);
		await wait(800);

		// Faster scroll — shows more dramatic skew on text section
		await smoothScroll(page, 500, 12, 30);
		await wait(600);

		// Scroll to marquee section — fast scroll makes marquee speed up
		await smoothScroll(page, 600, 10, 25);
		await wait(1200);

		// Scroll fast through marquee to show speed boost
		await smoothScroll(page, 400, 8, 20);
		await wait(800);

		// Scroll to opacity section
		await smoothScroll(page, 500, 12, 30);
		await wait(1000);

		// Fast scroll to show fade effect
		await smoothScroll(page, 300, 6, 15);
		await wait(1200);

		// Scroll to hook demo section
		await smoothScroll(page, 400, 10, 30);
		await wait(600);

		// Fast bursts to show velocity readout changing
		await smoothScroll(page, 200, 5, 15);
		await wait(500);
		await smoothScroll(page, -150, 5, 15);
		await wait(500);
		await smoothScroll(page, 300, 5, 15);
		await wait(1500);

		console.log("Recording complete. Saving video...");
		await context.close();
		await browser.close();

		console.log("Video saved to tmp-video/");
	} finally {
		server.kill();
	}
}

record().catch((err) => {
	console.error("Recording failed:", err);
	process.exit(1);
});
