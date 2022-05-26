import Schema from "../schema/Schema";

const create_host = async (
    name: string,
    website: string,
    location: string,
    tel: string,
    email: string,
    address: string,
    metro: string,
    station: string,
) => {
    const host = await new Schema.Hosts({
        name: name,
        website: website,
        location: location,
        tel: tel,
        email: email,
        address: address,
        metro: metro,
        station: station,
        created_at: new Date(),
    }).save();
    return (host);
}

export default {
    create_host,
}