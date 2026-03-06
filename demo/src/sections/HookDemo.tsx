import { useScrollVelocity } from "react-scroll-velocity";

export function HookDemo() {
	const { velocity, speed, direction, isScrolling } = useScrollVelocity();

	return (
		<section className="py-24">
			<h2 className="text-sm tracking-widest uppercase text-zinc-500 mb-12 text-center">
				useScrollVelocity
			</h2>

			<div className="max-w-md mx-auto rounded-lg border border-zinc-800 bg-zinc-900/50 p-8 font-mono text-sm">
				<div className="space-y-3">
					<Row label="velocity" value={velocity.toFixed(3)} />
					<Row label="speed" value={`${speed.toFixed(0)} px/s`} />
					<Row label="direction" value={direction} />
					<Row label="isScrolling" value={String(isScrolling)} />
				</div>
			</div>

			<div className="mt-8 max-w-md mx-auto">
				<div className="h-2 rounded-full bg-zinc-800 overflow-hidden relative">
					<div
						className="absolute top-0 h-full bg-zinc-400 rounded-full transition-all duration-100"
						style={{
							width: `${Math.abs(velocity) * 50}%`,
							left: velocity >= 0 ? "50%" : `${50 - Math.abs(velocity) * 50}%`,
						}}
					/>
				</div>
				<div className="flex justify-between text-xs text-zinc-600 mt-2">
					<span>-1 (up)</span>
					<span>0</span>
					<span>+1 (down)</span>
				</div>
			</div>
		</section>
	);
}

function Row({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex justify-between">
			<span className="text-zinc-500">{label}</span>
			<span className="text-zinc-200">{value}</span>
		</div>
	);
}
