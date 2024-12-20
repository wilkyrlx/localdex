
function HomePage() {

    return (
        <div>
            <h1>Welcome to LocalDex!</h1>
            <p>
                LocalDex is a passion project developed by John Wilkinson to help store, map, and interact with
                your personal and professional contacts in one place. The project is still in development, but
                you can check out the source code on the project <a href="https://github.com/wilkyrlx/localdex">GitHub</a>.
            </p>

            <h2>Features and Stack</h2>
            <p>
                LocalDex is built using the MERN stack (MongoDB, Express, React, Node.js). The frontend is built using
                React and the backend is built using Node.js and Express. The database is MongoDB. This stack was chosen,
                in part, to allow for deployment to a cloud provider or on-premises server. If you prefer to keep your
                contacts private, you can deploy LocalDex to your own server without ever connecting it to the internet.

                Contacts are stored as documents. This approach is flexible and allows for the storage of a wide variety
                of contact information - in fact, while some common fields are represented explicitly in the UI, you can
                store any additional fields you like which are visible in the raw JSON representation of a contact, all of
                which is exposed to the user.
            </p>

            <h2>Getting Started</h2>
            <p>
                A sample dataset has been loaded into the application to help you get comfortable navigating LocalDex.
                Feel free to explore the contacts, map, and network pages. You can also import your own contacts using
                the import page. The import page currently supports VCard (.vcf) files. You can find a sample VCard file
                in the project's <a href="https://github.com/wilkyrlx/localdex/tree/main/datasets/mock-data">datasets</a> directory.
            </p>

            <br />

            <i>Disclaimer:
                LocalDex is provided "as is" without any warranties or guarantees of any kind, express or implied. 
                User data may not be secure, and the use of this software is at your own risk. By using LocalDex, 
                you acknowledge and accept that the developer is not liable for any loss, damage, or misuse of data. 
                Users are advised to exercise caution and avoid entering sensitive or personal information.
            </i>

        </div>
    );
}

export default HomePage;