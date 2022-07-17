import HostInterface from "./Hosts";

interface EventInterface {
    _id: string,
    name: string,
    picture: string,
    host_id: string,
    activity_id: string,
    date_event: string,
    time_event: string,
    description: string,
    minimal_number_of_participants: string,
    maximal_number_of_participants: string,
    created_by: string,
    created_at: string,
    reservation_link: string,
    host?: HostInterface,
}

export default EventInterface;