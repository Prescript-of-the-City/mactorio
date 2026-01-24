import { Vec2 } from "shared/Math";
import { TileEntity } from "./TileEntity";

export class Chunk {
	origin: Vec2 = { x: 0, y: 0 };
	tileEntities: TileEntity[] = [];

	constructor() {}
}
