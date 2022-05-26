import Schema from "../schema/Schema";
import HostInterface from '../../Interfaces/Hosts';

const create_host = async (
    name: string,
    website: string,
    location: string,
    tel: string,
    email: string,
    address: string,
    metro: string,
    station: string,
): Promise<HostInterface> => {
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

const get_all_host = async(page: number, per_page: number): Promise<HostInterface> => {
    const all_hosts = await Schema.Hosts
        .find()
        .limit(per_page)
        .skip((page - 1) * per_page);
    return (all_hosts);
}

export default {
    create_host,
    get_all_host,
}