import React from 'react';
import Markdown from 'markdown-to-jsx';
import contact_document from '../../docs/contact.md';

const ContactPage: React.FC = () => {

    const [document, setDocument] = React.useState<string>('');

    React.useEffect((): void => {
        fetch(contact_document)
            .then(async (res: {text: any}): Promise<void> => {
                setDocument(await res.text());
            })
    });

    return (
        <div style={{
            paddingLeft: 10,
            paddingRight: 10,
        }}>
            <Markdown>{document}</Markdown>
        </div>
    );
}

export default ContactPage;