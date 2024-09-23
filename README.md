# GitHub User Activity CLI

GitHub User Activity CLI is a command-line application to get a user's recent activity from GitHub and display it in the terminal.

## Requirements
- The application must be run from the command-line
- Provide GitHub username as argument when running CLI
- Get recent user activity using the GitHub API.
- Shows the activity recovered in the terminal.

## Features
- **User Activity Query**: The app allows you to view a user's most recent activity on GitHub using the GitHub API.
- **Formato de Eventos:**: Format and log different types of GitHub events, including:
    - PushEvent: Shows the number of commits pushed to a repository.
    - IssuesEvent: Shows the action performed on an issue in a repository.
    - WatchEvent: Shows when a user stars a repository.
    - CreateEvent: Shows when a branch or tag is created in a repository.
    - Default: Logs the event type if it's not one of the above.
- **Command Line Interface (CLI)**: Allows the user to enter the GitHub username as an argument on the command line to query their activity.

## Usage

To use the app, the user must run the script from the command line with the GitHub username as an argument:

```bash
node index.js username
```
## Notes

- This project uses Node.js. You can download and install Node.js from the official site: [nodejs.org](https://nodejs.org/en/download/package-manager).

## Project Link

You can find more information about this project at the following link: [Roadmaps GitHub User Activity Project](https://roadmap.sh/projects/github-user-activity).