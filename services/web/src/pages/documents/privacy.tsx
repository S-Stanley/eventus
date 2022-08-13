import React from 'react';
import Markdown from 'markdown-to-jsx';
import privacy_document from '../../docs/privacy.md';

const PrivacyPage: React.FC = () => {

    const [document, setDocument] = React.useState<string>('');

    React.useEffect((): void => {
        fetch(privacy_document)
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

export default PrivacyPage;