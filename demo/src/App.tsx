import { Hero } from "./sections/Hero";
import { HookDemo } from "./sections/HookDemo";
import { MarqueeDemo } from "./sections/MarqueeDemo";
import { OpacityDemo } from "./sections/OpacityDemo";
import { SkewDemo } from "./sections/SkewDemo";

export function App() {
	return (
		<div className="min-h-screen">
			<div className="max-w-5xl mx-auto px-6">
				<Hero />

				<hr className="border-zinc-800" />
				<SkewDemo />

				<hr className="border-zinc-800" />
				<MarqueeDemo />

				<hr className="border-zinc-800" />
				<OpacityDemo />

				<hr className="border-zinc-800" />
				<HookDemo />

				<hr className="border-zinc-800" />

				{/* Spacer to allow scrolling through last section */}
				<div className="h-64" />

				<footer className="py-16 text-center">
					<p className="text-sm text-zinc-500 mb-4">Install</p>
					<code className="inline-block px-6 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm">
						npm install react-scroll-velocity
					</code>
					<div className="mt-8 flex justify-center gap-6 text-sm text-zinc-500">
						<a
							href="https://github.com/mulkatz/react-scroll-velocity"
							className="hover:text-zinc-300 transition-colors"
						>
							GitHub
						</a>
						<a
							href="https://npmjs.com/package/react-scroll-velocity"
							className="hover:text-zinc-300 transition-colors"
						>
							npm
						</a>
						<span className="text-zinc-700">~1.5KB gzipped</span>
					</div>
					<p className="mt-8 text-xs text-zinc-600">MIT License</p>
				</footer>
			</div>
		</div>
	);
}
