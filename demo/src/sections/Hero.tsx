import { VelocityText } from "react-scroll-velocity";

export function Hero() {
	return (
		<section className="py-32 text-center">
			<p className="text-sm tracking-widest uppercase text-zinc-500 mb-8">
				Scroll to see it in action
			</p>
			<VelocityText maxSkew={12} squeeze maxSqueeze={0.08}>
				<h1 className="text-6xl sm:text-7xl font-bold tracking-tight text-zinc-50">
					react-scroll-velocity
				</h1>
			</VelocityText>
			<p className="text-xl text-zinc-400 max-w-2xl mx-auto mt-8">
				Hook &amp; components for scroll-speed-based animations. Zero dependencies, ~1.5KB gzipped.
			</p>
			<div className="mt-12 flex justify-center gap-3">
				<a
					href="https://github.com/mulkatz/react-scroll-velocity"
					className="px-5 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm hover:bg-zinc-700 transition-colors"
				>
					GitHub
				</a>
				<a
					href="https://npmjs.com/package/react-scroll-velocity"
					className="px-5 py-2.5 rounded-lg bg-zinc-100 text-zinc-900 text-sm hover:bg-white transition-colors"
				>
					npm install
				</a>
			</div>
		</section>
	);
}
