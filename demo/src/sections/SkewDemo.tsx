import { VelocityText } from "react-scroll-velocity";

export function SkewDemo() {
	return (
		<section className="py-24">
			<h2 className="text-sm tracking-widest uppercase text-zinc-500 mb-12 text-center">VelocityText</h2>

			<div className="space-y-6 max-w-3xl mx-auto">
				<VelocityText maxSkew={8}>
					<p className="text-4xl font-semibold text-zinc-100 text-center">
						Text that skews with scroll speed
					</p>
				</VelocityText>

				<VelocityText maxSkew={15}>
					<p className="text-2xl text-zinc-400 text-center">Higher skew = more dramatic effect</p>
				</VelocityText>

				<VelocityText maxSkew={10} squeeze maxSqueeze={0.15}>
					<p className="text-3xl font-bold text-zinc-200 text-center">
						Squeeze compresses vertically
					</p>
				</VelocityText>
			</div>

			<div className="mt-16 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
				{[5, 10, 20].map((skew) => (
					<VelocityText key={skew} maxSkew={skew}>
						<div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 text-center">
							<p className="text-3xl font-bold text-zinc-100 tabular-nums">{skew}&deg;</p>
							<p className="text-xs text-zinc-500 mt-2">maxSkew</p>
						</div>
					</VelocityText>
				))}
			</div>
		</section>
	);
}
