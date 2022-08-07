const axios = require('axios');

const use_prod_env = false;

async function create_event(data){
    try {
        const req = await axios.post(
            use_prod_env ? 'https://api.sakafet.fr/events/' : 'http://localhost:3042/events/',
            data
        );
        console.log(req.status);
        console.log(req.data);
    } catch (e) {
        console.error(e?.response?.data ?? 'error');
    }
}

create_event({
    'name': '',
    'picture': '',
    'host_id': '',
    'activity_id': '',
    'date_event': '',
    'time_event': '',
    'description': '',
    'minimal_number_of_participants': '',
    'maximal_number_of_participantsid': '',
    'price': '',
    'created_by': '',
    'reservation_link': ''
});