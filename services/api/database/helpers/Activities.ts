import ActivitiesInterface from "../../Interfaces/Activities";
import Schema from "../schema/Schema";

const findActivityByName = async (name: string): Promise<ActivitiesInterface | boolean> => {
    const activity_to_find = await Schema.Activities.findOne({
        name: name,
    });
    if (!activity_to_find){
        return (false);
    }
    return (activity_to_find);
}

const createActivity = async (name: string): Promise<ActivitiesInterface> => {
    if (await findActivityByName(name)){
        throw new Error("This activity already exist");
    }
    const activity_created = await new Schema.Activities({
        name: name,
    }).save();
    if (!activity_created){
        throw new Error("Cannot create activity");
    }
    return (activity_created);
}

const findAllActivities = async (page: number, per_page: number): Promise<ActivitiesInterface[]> => {
    const activites = await Schema.Activities.find().skip(per_page * (page - 1)).limit(per_page);
    return (activites);
}

export default {
    findActivityByName,
    createActivity,
    findAllActivities,
}