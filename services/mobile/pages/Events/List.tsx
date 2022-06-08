import React, { useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    FlatList,
    Image
} from 'react-native';
import Helpers from '../../Helpers/Helpers';
import Events from '../../interfaces/Events';

const EventThumbdail = (props: { event: Events }) => {
    return (
        <View
            style={{ paddingBottom: 25, paddingTop: 25 }}
        >
            <View style={{ paddingBottom: 10 }}>
                <Text
                    style={{ textAlign: 'center', fontSize: 25 }}
                >
                    {props.event.name}
                </Text>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>{props.event.date_event} - {props.event.time_event}</Text>
                    <Text>{props.event?.location}</Text>
                </View>
            </View>
            <Image
                source={{ uri: props.event.picture }}
                style={{ width: 400, height: 100 }}
            />
        </View>
    )
}

const EventListPage = () => {

    const [events, setEvents] = useState<Events[]>([]);

    const get_all_events = async() => {
        const all_events = await Helpers.Events.get_all_events();
        setEvents(all_events);
    }

    const renderItem = ({ item }) => (
        <EventThumbdail event={item} />
    )

    React.useEffect(() => {
        get_all_events();
    }, []);

    return (
        <SafeAreaView>
            <View>
                <FlatList
                    data={events}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                />
            </View>
        </SafeAreaView>
    )
}

export default EventListPage;