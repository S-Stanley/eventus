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

const get_host_by_id = async(host_id: string): Promise<HostInterface> => {
    const host = await Schema.Hosts.findOne({
        '_id': host_id,
    });
    return (host);
}

const update_host = async (host_id: string, new_host: HostInterface) => {
    const host_updated = await Schema.Hosts.findOneAndUpdate({
        _id: host_id
    }, {
        name: new_host.name,
        website: new_host.website,
        address: new_host.address,
        location: new_host.location,
        tel: new_host.tel,
        email: new_host.email,
        metro: new_host.metro,
        station: new_host.station,
    }, {
        new: true,
    });
    return (host_updated);
};

export default {
    create_host,
    get_all_host,
    get_host_by_id,
    update_host,
}