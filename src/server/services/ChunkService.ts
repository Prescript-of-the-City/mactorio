import { Service, OnStart } from "@flamework/core";
import { Vec2 } from "shared/Math";

@Service({})
export class ChunkService {
	GenerateChunk(origin: Vec2, seed: number) {
		math.noise(origin.x, origin.y, seed);
	}
}
