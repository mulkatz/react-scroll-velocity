import { VelocityOpacity } from "react-scroll-velocity";

export function OpacityDemo() {
	return (
		<section className="py-24">
			<h2 className="text-sm tracking-widest uppercase text-zinc-500 mb-12 text-center">
				VelocityOpacity
			</h2>

			<div className="max-w-2xl mx-auto space-y-8">
				<VelocityOpacity>
					<div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-8">
						<p className="text-2xl font-semibold text-zinc-100 mb-2">Fade out on scroll</p>
						<p className="text-zinc-400">
							This content fades away when you scroll fast. Stop scrolling and it comes back.
						</p>
					</div>
				</VelocityOpacity>

				<VelocityOpacity fadeOut={false} minOpacity={0.15}>
					<div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-8">
						<p className="text-2xl font-semibold text-zinc-100 mb-2">Fade in on scroll</p>
						<p className="text-zinc-400">
							This content appears when you scroll. It stays hidden when idle.
						</p>
					</div>
				</VelocityOpacity>
			</div>
		</section>
	);
}
