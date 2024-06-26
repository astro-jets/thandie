import { Html, Heading, Text } from "@react-email/components";

const EmailTemplate = ({ name, email, message }: { name: string; email: string; message: string }) => {
    return (
        <Html lang="en">
            <Heading as="h1">New Form Submission</Heading>
            <Text>You just submitted a form.</Text>
            {/* Add more content here */}
        </Html>
    );
};

export default EmailTemplate;
