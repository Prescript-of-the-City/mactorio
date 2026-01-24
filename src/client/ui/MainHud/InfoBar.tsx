import React, { useState } from "@rbxts/react";
import { RunService, Workspace } from "@rbxts/services";
import { Events } from "client/network";

export = () => {
	const [fps, setFps] = useState(0);
	const [tps, setTps] = useState(60);

	task.spawn(() => {
		let deb = 0;

		Events.tpsUpdate.connect((newTps) => {
			setTps(newTps);
		});

		RunService.RenderStepped.Connect((dt: number) => {
			deb += dt;

			if (deb >= 0.1) {
				deb = 0;

				setFps(math.round(Workspace.GetRealPhysicsFPS()));
			}
		});
	});

	return (
		<screengui
			IgnoreGuiInset={true}
			key={"TopbarExt"}
			ScreenInsets={Enum.ScreenInsets.None}
			ZIndexBehavior={Enum.ZIndexBehavior.Sibling}
		>
			<textlabel
				BackgroundTransparency={1}
				FontFace={new Font("rbxasset://fonts/families/JosefinSans.json")}
				key={"tpsCounter"}
				Position={UDim2.fromScale(0.130435, 0.0175439)}
				RichText={true}
				Size={UDim2.fromScale(0.0993684, 0.0877193)}
				Text={`TPS: ${tps}<br/>FPS: ${fps}`}
				TextColor3={new Color3(1, 1, 1)}
				TextScaled={true}
			/>

			<textlabel
				BackgroundTransparency={1}
				FontFace={new Font("rbxasset://fonts/families/JosefinSans.json")}
				key={"serverVersion"}
				Position={UDim2.fromScale(0.237154, 0.0175439)}
				Size={UDim2.fromScale(0.125692, 0.0877193)}
				Text={`Version: ${(() => {
					let ver: string | number = game.PlaceVersion;

					if (ver === 0) {
						ver = "<br/>Studio";
					}

					return ver;
				})()}`}
				RichText={true}
				TextColor3={Color3.fromRGB(253, 253, 253)}
				TextSize={31}
				TextWrapped={true}
			/>
		</screengui>
	);
};
