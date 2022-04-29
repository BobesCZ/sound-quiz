import { Question, QuizId } from "../types/types";

interface QuestionSource extends Omit<Question, "video"> {
  video: Partial<Question["video"]>;
}

export const questionsSource: Record<QuizId, QuestionSource[]> = {
  "rock-history-kcca86d2": [
    {
      questionText: "Choose the correct release year of the song:",
      video: {
        id: "wMsazR6Tnf8",
        startSeconds: 70,
      },
      answerInfo: {
        imgUrl:
          "https://upload.wikimedia.org/wikipedia/en/d/da/I_love_rock_n%27_roll_-_joan_jett_%28album_cover%29.JPG",
        songName: "Joan Jett - I Love Rock 'n Roll",
        albumName: "I Love Rock 'n Roll (1981)",
      },
      answers: { a1: "'60s", a2: "'70s", a3: "'80s", a4: "'90s" },
      correctAnswerId: "a3",
    },
    {
      questionText: "Choose the correct release year of the song:",
      video: {
        id: "xwtdhWltSIg",
        startSeconds: 97,
      },
      answerInfo: {
        imgUrl:
          "https://www.bontonland.cz/image.php?image=/fotky/354/p-140986-full.jpg&width=96&height=96",
        songName: "R.E.M. - Losing My Religion",
        albumName: "Out of Time (1991)",
      },
      answers: { a1: "'60s", a2: "'70s", a3: "'80s", a4: "'90s" },
      correctAnswerId: "a4",
    },
    {
      questionText: "Choose the correct release year of the song:",
      video: {
        id: "1lyu1KKwC74",
        startSeconds: 81,
      },
      answerInfo: {
        imgUrl:
          "https://www.bontonland.cz/image.php?image=/fotky/398/p-157572-full.jpg&width=96&height=96",
        songName: "The Verve - Bitter Sweet Symphony",
        albumName: "Urban Hymns (1997)",
      },
      answers: { a1: "'60s", a2: "'70s", a3: "'80s", a4: "'90s" },
      correctAnswerId: "a4",
    },
    {
      questionText: "Choose the correct release year of the song:",
      video: {
        id: "l482T0yNkeo",
        startSeconds: 17,
      },
      answerInfo: {
        imgUrl:
          "https://www.bontonland.cz/image.php?image=/fotky/177/p-68486-full.jpg&width=96&height=96",
        songName: "AC/DC - Highway to Hell",
        albumName: "Highway to Hell (1979)",
      },
      answers: { a1: "'60s", a2: "'70s", a3: "'80s", a4: "'90s" },
      correctAnswerId: "a2",
    },
    {
      questionText: "Choose the correct release year of the song:",
      video: {
        id: "1w7OgIMMRc4",
        startSeconds: 61,
      },
      answerInfo: {
        imgUrl:
          "https://www.bontonland.cz/image.php?image=/fotky/449/p-175341-full.jpg&width=96&height=96",
        songName: "Guns N' Roses - Sweet Child O' Mine",
        albumName: "Appetite for Destruction (1987)",
      },
      answers: { a1: "'60s", a2: "'70s", a3: "'80s", a4: "'90s" },
      correctAnswerId: "a3",
    },
    {
      questionText: "Choose the correct release year of the song:",
      video: {
        id: "5IpYOF4Hi6Q",
        startSeconds: 27,
      },
      answerInfo: {
        imgUrl:
          "https://d25-a.sdn.cz/d_25/c_img_H_Fu/xi56Wh.jpeg?fl=res%2C350%2C350%2C1%7Cwebp%2C80",
        songName: "Pink Floyd - Another Brick in the Wall Part 2“",
        albumName: "The Wall (1979)",
      },
      answers: { a1: "'60s", a2: "'70s", a3: "'80s", a4: "'90s" },
      correctAnswerId: "a2",
    },
    {
      questionText: "Choose the correct release year of the song:",
      video: {
        id: "ujNeHIo7oTE",
        startSeconds: 177,
      },
      answerInfo: {
        imgUrl:
          "https://www.bontonland.cz/image.php?image=/fotky/384/p-152292-full.jpg&width=96&height=96",
        songName: "U2 - With or Without You",
        albumName: "The Joshua Tree (1987)",
      },
      answers: { a1: "'60s", a2: "'70s", a3: "'80s", a4: "'90s" },
      correctAnswerId: "a3",
    },
    {
      questionText: "Choose the correct release year of the song:",
      video: {
        id: "qoX6AKuYWL8",
        startSeconds: 17,
      },
      answerInfo: {
        imgUrl:
          "https://upload.wikimedia.org/wikipedia/en/9/98/TheDoorsTheDoorsalbumcover.jpg",
        songName: "The Doors - Light My Fire",
        albumName: "The Doors (1967)",
      },
      answers: { a1: "'60s", a2: "'70s", a3: "'80s", a4: "'90s" },
      correctAnswerId: "a1",
    },
    {
      questionText: "Choose the correct release year of the song:",
      video: {
        id: "Br3KkvgMAZY",
        startSeconds: 105,
      },
      answerInfo: {
        imgUrl:
          "https://www.bontonland.cz/image.php?image=/fotky/413/p-162674-full.jpg&width=96&height=96",
        songName: "Eagles - Hotel California",
        albumName: "Hotel California (1976)",
      },
      answers: { a1: "'60s", a2: "'70s", a3: "'80s", a4: "'90s" },
      correctAnswerId: "a2",
    },
    {
      questionText: "Choose the correct release year of the song:",
      video: {
        id: "qN5zw04WxCc",
        startSeconds: 4,
      },
      answerInfo: {
        imgUrl:
          "https://www.bontonland.cz/image.php?image=/fotky/240/p-98327-full.jpg&width=96&height=96",
        songName: "The Who - My Generation",
        albumName: "My Generation (1965)",
      },
      answers: { a1: "'60s", a2: "'70s", a3: "'80s", a4: "'90s" },
      correctAnswerId: "a1",
    },
  ],
};
