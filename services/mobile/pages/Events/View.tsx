import React from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';
import Events from '../../interfaces/Events';
import Helpers from '../../Helpers/Helpers';
import Hosts from '../../interfaces/Hosts';

const EventViewPage = (props) => {

    const event: Events = props.route.params.event;
    const [host, setHost] = React.useState<Hosts>();

    const get_host = async() => {
        const host = await Helpers.Hosts.get_host_by_id(event.host_id);
        if (host && typeof(host) !== 'boolean'){
            setHost(host);
        }
    }

    React.useEffect(() => {
        get_host();
    });

    return (
        <View>
            <View
                style={{
                    paddingBottom: 20,
                    paddingTop: 20,
                }}
            >
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 20,
                    }}
                >{event.name}</Text>
            </View>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: 20,
                }}
            >
                <Text>{event.date_event} - {event.time_event}</Text>
                <Text>{event.location}</Text>
            </View>
            <View style={{ paddingBottom: 20 }} >
                <Image
                    source={{ uri: event.picture }}
                    style={{ width: 400, height: 200 }}
                />
            </View>
            <View style={{ paddingBottom: 20 }} >
                <Text>Min of participants: {event.minimal_number_of_participants}</Text>
                <Text>Max of participants: {event.maximal_number_of_participants}</Text>
                <Text>Price: {event.price}€</Text>
            </View>
            <View style={{ paddingBottom: 20 }} >
                <Text>{event.description}</Text>
            </View>
            { host &&
            <View style={{ paddingBottom: 20 }} >
                <View style={{ paddingBottom: 20 }} >
                    <Text
                        style={{
                            fontSize: 17,
                            borderTopWidth: 0.5,
                            textAlign: 'center'
                        }}
                    >
                        Where is this event going to take place ?
                    </Text>
                </View>
                <View style={{ paddingBottom: 20 }} >
                    <Text>{host?.name}</Text>
                    <Text>{host.address}</Text>
                </View>
                <View style={{ paddingBottom: 20 }} >
                    <Text>{host?.email}</Text>
                    <Text>{host?.tel}</Text>
                    <Text>{host?.website}</Text>
                </View>
                <View style={{ paddingBottom: 20 }} >
                    <Text>{host?.metro}</Text>
                    <Text>{host.station}</Text>
                </View>
            </View>
        }
        </View>
    )
}

export default EventViewPage;