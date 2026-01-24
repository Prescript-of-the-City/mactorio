import { Service, OnStart } from "@flamework/core";
import ProfileStore from "@rbxts/profile-store";
import { Players } from "@rbxts/services";
import { SlotData } from "shared/data/SlotData";

@Service({})
export class SaveService implements OnStart {
	private DataTemplate = new SlotData();

	private PlayerStore = ProfileStore.New("SlotsData", this.DataTemplate);
	private SlotDatastore: Map<Player, Awaited<ReturnType<typeof this.PlayerStore.StartSessionAsync>> | undefined> =
		new Map();

	onStart() {
		Players.PlayerAdded.Connect((plr: Player) => {
			const profile = this.PlayerStore.StartSessionAsync(`${plr.UserId}`, {
				Cancel: () => {
					return plr.Parent !== Players;
				},
			});

			if (profile === undefined) {
				plr.Kick("blah blah blah rejoin data bug grr");
				return;
			}

			profile.AddUserId(plr.UserId);
			profile.Reconcile();

			profile.OnSessionEnd.Connect(() => {
				this.SlotDatastore.set(plr, undefined);
				plr.Kick("session died pleas rejoin twin");
			});

			if (plr.Parent === Players) {
				this.SlotDatastore.set(plr, profile);
			} else {
				profile.EndSession();
			}
		});

		Players.PlayerRemoving.Connect((plr: Player) => {
			const dat = this.SlotDatastore.get(plr);
			if (dat) {
				dat.EndSession();
			}
		});
	}

	getSave(plr: Player) {
		return this.SlotDatastore.get(plr);
	}
}
