import React from 'react';
import { Form, Button } from 'react-bootstrap';
import helpers from '../../helpers/helpers';

const ContactPage: React.FC = () => {

    const [email, setEmail] = React.useState<string>('');
    const [message, setMessage] = React.useState<string>('');

    const submit = async() => {
        const req = await helpers.email.send_to_adm(email, message);
        if (req){
            setEmail('');
            setMessage('');
            alert("Your message has successfuly been sent");
        }
    }

    return (
        <div style={{
            paddingLeft: 10,
            paddingRight: 10,
        }}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Your message</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </Form.Group>
            <Button variant="dark" onClick={submit}>Valider</Button>
        </div>
    );
}

export default ContactPage;