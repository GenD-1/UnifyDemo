import { v1 as uuidv1 } from 'uuid'

const endPoint = process.env.REACT_APP_TOKEN_ENDPOINT;


const Id = uuidv1()

export default async function getToken(role: any, room_id: any) {
    console.log(endPoint);

    const response = await fetch(`${endPoint}api/token`, {
        method: 'POST',
        body: JSON.stringify({
            user_id: Id, // User ID assigned by you (different from 100ms' assigned id)
            role: role, // listener , speaker , moderator
            room_id,
        }),
    });

    const { token } = await response.json();

    return token;
}