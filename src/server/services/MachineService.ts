import { Service, OnStart, OnTick } from "@flamework/core";
import { Events } from "server/network";

@Service({})
export class MachineService implements OnStart, OnTick {
	private tickCounter = 0;
	private timeCounter = 0;

	private goalTPS = 12;

	onStart() {}

	onTick(dt: number): void {
		this.timeCounter += dt;

		// full second has elapsed
		if (this.timeCounter <= 1) {
			Events.tpsUpdate.broadcast(this.goalTPS);
		}

		if (this.timeCounter === 1 / this.goalTPS) {
			this.tickCounter += 1;
		}
	}
}
