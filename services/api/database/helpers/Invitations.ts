import Schema from "../schema/Schema";
import InvitationInterface from "../../Interfaces/Invitations";

const find_invitation = async(event_id: string, user_id: string): Promise<InvitationInterface> => {
    const invitation_found = await Schema.Invitations.findOne({
        event_id: event_id,
        user_id: user_id,
    });
    return (invitation_found);
}

const update_invitations = async(event_id: string, user_id: string, state: string): Promise<InvitationInterface> => {
    if (await find_invitation(event_id, user_id)){
        const invitation_updated = await Schema.Invitations.findOneAndUpdate({
            event_id: event_id,
            user_id: user_id,
        }, {
            state: state,
        }, {
            new: true,
        });
        return (invitation_updated);
    } else {
        const invitation_created = await new Schema.Invitations({
            event_id: event_id,
            user_id: user_id,
            state: state,
        }).save();
        return (invitation_created);
    }
}

export default {
    find_invitation,
    update_invitations,
}