# Sound Quiz

This simple app contains multiple quizzes on different topics. Your task in each quiz is to listen to a short snippet of a song and choose the most suitable answer. To succeed in the quizzes, you have to demonstrate your musical overview and/or knowledge of music history.

You need to use your headphones (or audio speakers) to complete the quizzes!

You can use it online at [SoundQuiz](https://sound-quiz-a2b00.web.app/) (hosted by Firebase).

## Built With

- [React](https://reactjs.org/) + [Typescript](https://www.typescriptlang.org/)
- [Material-UI](https://material-ui.com/)

## Features

- Uses YouTube Player API under the hood
- Saves your answers continuously in localStorage

## Installing

This project is not open-source (see [License](#License)). However, you can clone this repository and run it on your local machine for review and testing purposes.

Install packages

```
npm install
```

Run local server (localhost:3000 will open up in your default browser)

```
npm run start
```

## License

Standard copyright, NOT OPEN-SOURCE. The author of this repository retains all rights to source code and no one may reproduce, distribute, or create derivative works.

## Known issues

### YouTube Player crash rendering

When you go through completed quiz and click too fast on 'Next question' button, YouTube Player (probably) interrupt the rendering process and the page crashes.

## Acknowledgments

- [Create React App](https://create-react-app.dev/)
