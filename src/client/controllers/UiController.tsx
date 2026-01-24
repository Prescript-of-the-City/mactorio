/* eslint-disable roblox-ts/no-any */
import { Controller, OnStart } from "@flamework/core";
import React from "@rbxts/react";
import { createPortal, createRoot } from "@rbxts/react-roblox";
import { Players, Workspace } from "@rbxts/services";
import MainHud from "client/ui/MainHud";

@Controller({})
export class UiController implements OnStart {
	onStart() {
		const plr = Players.LocalPlayer;
		let chr = plr.Character;
		if (!chr) chr = plr.CharacterAdded.Wait()[0];

		const plrGui = plr.WaitForChild("PlayerGui");

		const test = new Instance("Folder");
		test.Parent = Workspace;

		const gui = createRoot(new Instance("Folder"));
		gui.render(createPortal(<MainHud />, plrGui));
	}
}
