import React from 'react';
import {
    View,
    Text,
    Image,
    Button,
    ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Helpers from '../../Helpers/Helpers';

import Events from '../../interfaces/Events';
import Hosts from '../../interfaces/Hosts';

const EventViewPage = (props) => {

    const event: Events = props.route.params.event;

    const [host, setHost] = React.useState<Hosts>();
    const [invitationStatus, setInvitationStatus] = React.useState<string>('AWAITING');

    const get_host = async() => {
        const host = await Helpers.Hosts.get_host_by_id(event.host_id);
        if (host && typeof(host) !== 'boolean'){
            setHost(host);
        }
    }

    const update_invitation = async(state: string) => {
        const user_id = await AsyncStorage.getItem('user_id') ?? '';
        const updated_invite = await Helpers.Invitations.update_invitations(event._id, user_id, state);
        if (updated_invite) {
            setInvitationStatus(state);
        }
    }

    const find_invitation = async() => {
        const user_id = await AsyncStorage.getItem('user_id') ?? '';
        const invitation_found = await Helpers.Invitations.find_invitation_by_event_id_and_user_id(event._id, user_id);
        if (invitation_found && typeof(invitation_found) !== 'boolean') {
            setInvitationStatus(invitation_found.state);
        }
    }

    React.useEffect(() => {
        get_host();
        find_invitation();
    }, [false]);

    return (
        <ScrollView>
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
            <View
                style={{
                    paddingBottom: 20,
                }}
            >
                { invitationStatus === 'AWAITING' ? (
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }} >
                        <Button title='Accept invitation' onPress={() => update_invitation('ACCEPTED')} />
                        <Button title='Decline invitation' onPress={() => update_invitation('DECLINED')} />
                    </View>
                ) : (
                    <View>
                        { invitationStatus === 'ACCEPTED' &&
                            <Text
                                style={{textAlign:'center'}}
                                onPress={() => update_invitation('AWAITING')}
                            >
                                You accepted the event invitation, click here to undo.
                            </Text>
                        }
                        { invitationStatus === 'DECLINED' &&
                            <Text
                                style={{textAlign:'center'}}
                                onPress={() => update_invitation('AWAITING')}
                            >
                                You declined the event invitation, click here to undo.
                            </Text>
                        }
                    </View>
                )}
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
        </ScrollView>
    )
}

export default EventViewPage;