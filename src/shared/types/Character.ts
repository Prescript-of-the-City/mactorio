export type Character = Model & {
	["Left Leg"]: Part;
	Humanoid: Humanoid & {
		Animator: Animator;
	};
	["Right Leg"]: Part;
	Head: Part;
	Torso: Part;
	HumanoidRootPart: Part;
	["Right Arm"]: Part;
	["Left Arm"]: Part;
	["Body Colors"]: BodyColors;
};
