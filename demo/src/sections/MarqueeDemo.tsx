import { VelocityMarquee } from "react-scroll-velocity";

const WORDS = ["VELOCITY", "SCROLL", "MOTION", "SPEED", "REACT", "ANIMATION", "SMOOTH", "FAST"];

export function MarqueeDemo() {
	return (
		<section className="py-24">
			<h2 className="text-sm tracking-widest uppercase text-zinc-500 mb-12 text-center">
				VelocityMarquee
			</h2>

			<div className="space-y-8 -mx-6">
				<VelocityMarquee baseSpeed={40}>
					<div className="flex gap-8 px-4">
						{WORDS.map((word) => (
							<span key={word} className="text-5xl font-black text-zinc-700 whitespace-nowrap">
								{word}
							</span>
						))}
					</div>
				</VelocityMarquee>

				<VelocityMarquee baseSpeed={30} reverse>
					<div className="flex gap-6 px-4">
						{WORDS.map((word) => (
							<span
								key={word}
								className="text-3xl font-bold text-zinc-800 whitespace-nowrap tracking-wider"
							>
								{word}
							</span>
						))}
					</div>
				</VelocityMarquee>

				<VelocityMarquee baseSpeed={60} maxSpeedMultiplier={8}>
					<div className="flex gap-4 px-4">
						{WORDS.map((word) => (
							<span
								key={word}
								className="px-4 py-2 rounded-full border border-zinc-800 text-sm text-zinc-400 whitespace-nowrap"
							>
								{word}
							</span>
						))}
					</div>
				</VelocityMarquee>
			</div>

			<p className="text-center text-sm text-zinc-600 mt-12">
				Scroll faster to speed them up. The middle row moves in reverse.
			</p>
		</section>
	);
}
