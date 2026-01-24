import { Vec2 } from "shared/Math";
import { Chunk } from "./Chunk";
import { Item } from "shared/types/Item";

export class PlayerData {
	userId: number = 0;
	logPosition: Vec2 = new Vec2(0, 0);
	inventory: Item[] = [];
}

export class SlotData {
	chunkData: Chunk[] = [];
	users: PlayerData[] = [];
	seed: number = 0;

	constructor() {}
}
