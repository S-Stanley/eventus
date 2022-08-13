import React from 'react';
import Markdown from 'markdown-to-jsx';
import copyright_document from '../../docs/copyright.md';

const CopyrightPage: React.FC = () => {

    const [document, setDocument] = React.useState<string>('');

    React.useEffect((): void => {
        fetch(copyright_document)
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

export default CopyrightPage;