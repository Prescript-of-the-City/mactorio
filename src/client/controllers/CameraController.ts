import { Controller, OnStart, OnTick } from "@flamework/core";
import { Players, Workspace } from "@rbxts/services";
import { Character } from "shared/types/Character";

@Controller({})
export class CameraController implements OnStart, OnTick {
	plr: Player = undefined as unknown as Player;
	character: Character = undefined as unknown as Character;
	camera: Camera | undefined;

	onStart() {
		this.plr = Players.LocalPlayer;
		this.camera = Workspace.CurrentCamera;
		if (!this.camera) return;

		let chr = this.plr.Character;
		if (!chr) chr = this.plr.CharacterAdded.Wait()[0];
		if (!chr.PrimaryPart) {
			chr.WaitForChild("HumanoidRootPart");
		}

		this.character = chr as Character;
		this.camera.CameraType = Enum.CameraType.Scriptable;
	}

	onTick(): void {
		if (!this.camera) return;
		if (!this.character) return;
		if (!this.character.PrimaryPart) return;

		this.camera.CFrame = new CFrame(
			this.character.PrimaryPart.Position.X,
			25,
			this.character.PrimaryPart.Position.Z + 1.5,
		);

		this.camera.CFrame = CFrame.lookAt(
			this.camera.CFrame.Position,
			(this.character.FindFirstChild("Head") as BasePart).CFrame.Position,
		);
	}
}
