interface EventInterface {
    host_id: string,
    activity_id: string,
    date_event: string,
    time_event: string,
    description: string,
    minimal_number_of_participants: string,
    maximal_number_of_participants: string,
    created_by: string,
    created_at: string,
}

export default EventInterface;