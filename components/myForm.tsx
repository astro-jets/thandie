// components/Form.js
export default function Form() {
    return (
        <form>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
            <label htmlFor="message">Message</label>
            <textarea name="message" id="message" cols={30} rows={10}></textarea>
            <button type="submit">Send</button>
        </form>
    );
}
