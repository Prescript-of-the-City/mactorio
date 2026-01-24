export interface Lobby {
	Owner: number;
	Name: string;
	MaxPlayers: number;
	CurrentPlayers: number[];
	LobbyCode: string;
}
