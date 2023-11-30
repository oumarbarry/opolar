/// <reference types="lucia" />
declare namespace Lucia {
	type Auth = import("./utils/lucia").Auth
	interface DatabaseUserAttributes {
	  username: string
	}
	interface DatabaseSessionAttributes {}
}
