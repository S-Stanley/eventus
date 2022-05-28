import ActivitiesInterface from "../../Interfaces/Activities";
import HostActivityRelationInterface from "../../Interfaces/HostActivityRelations";
import Schema from "../schema/Schema";

const create_relation = async(host_id: string, activity_id: string): Promise<HostActivityRelationInterface> => {
    const relation_find = find_relation(host_id, activity_id)
    if (relation_find){
        return (relation_find);
    }
    const relation_created = await new Schema.HostActivityRelation({
        host_id: host_id,
        activity_id: activity_id,
    }).save();
    return (relation_created);
}

const find_relation = async (host_id: string, activity_id: string): Promise<HostActivityRelationInterface> => {
    const relation_to_find = await Schema.HostActivityRelation.findOne({
        host_id: host_id,
        activity_id: activity_id,
    });
    return (relation_to_find);
}

const get_all_activities_by_host_id = async(host_id: string): Promise<HostActivityRelationInterface> => {
    const all_activities = await Schema.HostActivityRelation.find({
        host_id: host_id,
    });
    return (all_activities);
}

const get_all_hosts_by_activity_id = async (activity_id: string): Promise<HostActivityRelationInterface> => {
    const all_hosts = await Schema.HostActivityRelation.find({
        activity_id: activity_id,
    });
    return (all_hosts);
}

export default {
    create_relation,
    find_relation,
    get_all_activities_by_host_id,
    get_all_hosts_by_activity_id,
}