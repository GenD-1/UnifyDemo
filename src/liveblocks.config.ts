import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
import { Presence, Storage, UserMeta } from "./types";

const client = createClient({
    publicApiKey: "pk_test_x5AafaL8AuEl3WlEZKRuHfPR",
});

export const {

    suspense: { RoomProvider, useOthers, },
    //   RoomProvider,
    //   useRoom,
    //   useHistory,
    //   useSelf,
    //   useCanUndo,
    //   useCanRedo,
} = createRoomContext<Presence, any>(client);






// export const {
//   suspense: { RoomProvider },
// } = createRoomContext(client);