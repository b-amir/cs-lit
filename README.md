# CSLIT - Computer Science Like I'm Ten

CSLIT is a free and open-source community where individuals can create accounts, suggest categories, and contribute analogies for various computer science topics. The goal is to simplify complex concepts through easy-to-understand analogies and metaphors.

</br>

<div align="center" >
  <img src="https://raw.githubusercontent.com/b-amir/cs-lit/main/public/link-preview.png">
  </br></br>
 🟢  |  <strong><a href="https://cslit.cc">Try it Live!</a> </strong>
</div>

</br></br>

## Live on Product Hunt

Check out CSLIT on [Product Hunt](https://www.producthunt.com/posts/cs-lit) and vote for it to show your support and help spread the word!

## Demo

CSLIT is an online community. To use it, simply visit [cslit.cc](https://cslit.cc) in your web browser.

## Usage

1. **Create an Account:** Users can create accounts to start contributing analogies.
2. **Suggest Categories:** Feel free to suggest new categories to expand the range of topics.
3. **Create Topics:** Initiate discussions by creating topics within relevant categories.
4. **Write Analogies:** Contribute by providing analogies to make complex computer science subjects more accessible.

## Contributing

CSLIT is an open-source project, and contributions are welcome! Feel free to fork the repository, make improvements, and submit pull requests to help make CSLIT a better place for learners.

### How to Clone and Run Locally

To get a local copy up and running follow these simple steps.

#### Prerequisites

Make sure you have Node.js and npm installed on your machine.

#### Clone the Repository

1. Open your terminal.
2. Navigate to the directory where you want to clone the repository.
3. Run the following command:

```bash
git clone https://github.com/b-amir/cs-lit.git
```

4. After cloning, navigate into the newly created directory:

```bash
cd cs-lit
```

#### Install Dependencies

Install all required dependencies by running:

```bash
npm install
```

#### Start the Development Server

Start the development server with:

```bash
npm run dev
```

## License

This project is licensed under the [MIT License](LICENSE) - a permissive open-source license.

## Details for Nerds

If you're curious about the technical aspects of CSLIT, here are some details for you:

### Tech Stack

- **Frontend & Backend:** TypeScript, React.js & Next.js
- **Styling:** Tailwind CSS, react-spring (animations)
- **State Management:** Redux (RTK)
- **API Communication:** tRPC
- **Boilerplate:** create-t3-app

### Data Storage

- **Database:** postgresql (Prisma ORM)
- **User Authentication:** next-auth (Authjs)

### Additional Libraries and Tools

- **React Query:** CSLIT integrates React Query for efficient and optimized data fetching, providing a seamless user experience.
- **Zod:** The project utilizes Zod for robust runtime type checking, enhancing data validation and ensuring the integrity of information across the application.
- **Resend:** Resend is incorporated to streamline and manage email communications within CSLIT, ensuring a reliable system for account verification and notifications.

### Testing

- **unit tests:** Vitest
- **e2e tests:** Cypress

### Deployment

- **Hosting:** CSLIT is hosted online, and the live version is accessible at [cslit.cc](https://cslit.cc).
- **Continuous Integration:** The project utilizes continuous integration tools to automate testing and deployment processes, ensuring a stable and reliable environment for users.
- **Docker:** A Dockerfile is included, making it easy to containerize the application for consistent deployment across various environments.

Feel free to explore the codebase on [GitHub](https://github.com/b-amir/cs-lit) to dive deeper into the technical implementation of CSLIT!
