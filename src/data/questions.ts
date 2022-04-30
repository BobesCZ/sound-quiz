import { Question, QuizId, QuestionId } from "../types/types";

interface QuestionRaw extends Omit<Question, "video"> {
  video: Partial<Question["video"]>;
}

type QuestionsSourceRaw = Record<QuizId, Record<QuestionId, QuestionRaw>>;

export const questionsSource: QuestionsSourceRaw = {
  "rock-history-kcca86d2": {
    q1: {
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
    q2: {
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
    q3: {
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
    q4: {
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
    q5: {
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
    q6: {
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
    q7: {
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
    q8: {
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
    q9: {
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
    q10: {
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
  },
  "classical-music-c4082e41": {
    q1: {
      questionText:
        "Choose the correct part of Requiem in D minor (W. A. Mozart):",
      video: {
        id: "lmi42FCnYuM",
        startSeconds: 14,
      },
      answerInfo: {
        imgUrl:
          "https://www.latvijaskoncerti.lv/media/events/square_3cf6b6c539577421895a7c61146c7bce.jpg",
        songName: "W. A. Mozart (1791)",
        albumName: "cover: youtuber M. Gentile (2016)",
      },
      answers: {
        a1: "Lacrimosa",
        a2: "Dies irae",
        a3: "Kyrie",
        a4: "Rex tremendae",
      },
      correctAnswerId: "a1",
    },
    q2: {
      questionText: "Choose the correct combination of song name and author:",
      video: {
        id: "7TJdqKlMTEo",
        startSeconds: 15,
      },
      answerInfo: {
        imgUrl:
          "https://www.dvorakovapraha.cz/fileadmin/user_upload/antonin_dvorak-left.jpg",
        songName: "A. Dvořák (1875)",
        albumName: "cover: Therion (2009)",
      },
      answers: {
        a1: "Symphony No 9 (A. Dvořák)",
        a2: "Symphony No 6 (A. Dvořák)",
        a3: "Symphony No 6 (B. Smetana)",
        a4: "Symphony No 9 (B. Smetana)",
      },
      correctAnswerId: "a1",
    },
    q3: {
      questionText: "Choose the correct combination of song name and author:",
      video: {
        id: "YzOF9w8kG-c",
        startSeconds: 183,
      },
      answerInfo: {
        imgUrl:
          "https://cdns-images.dzcdn.net/images/artist/f16a31a3fe85c5a14debb1f811be1325/264x264.jpg",
        songName: "L. V. Beethoven (1807)",
        albumName: "cover: Pergamum (2009)",
      },
      answers: {
        a1: "Symphony No. 5 (L. V. Beethoven)",
        a2: "Symphony No. 7 (L. V. Beethoven)",
        a3: "Symphony No. 5 (W. A. Mozart)",
        a4: "Symphony No. 7 (W. A. Mozart)",
      },
      correctAnswerId: "a1",
    },
    q4: {
      questionText: "Choose the correct combination of song name and author:",
      video: {
        id: "omqJTXzHBVY",
        startSeconds: 40,
      },
      answerInfo: {
        imgUrl:
          "https://cdns-images.dzcdn.net/images/artist/f16a31a3fe85c5a14debb1f811be1325/264x264.jpg",
        songName: "Moonlight Sonata (1801)",
        albumName: "cover: youtuber M. Jakubek (2018)",
      },
      answers: {
        a1: "Piano Sonata No. 14 (L. V. Beethoven)",
        a2: "Piano Sonata No. 2 (R. Schumann)",
        a3: "Piano Sonata No. 3 in B minor (F. Chopin)",
        a4: "Piano Sonata in B minor (F. Liszt)",
      },
      correctAnswerId: "a1",
    },
    q5: {
      questionText:
        "Choose the correct concerto from The Four Seasons (A. Vivaldi):",
      video: {
        id: "pnyfESsYbYc",
        startSeconds: 10,
      },
      answerInfo: {
        imgUrl:
          "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTE4MDAzNDEwNzE0MzMwNjM4/antonio-lucio-vivaldi-9519560-1-402.jpg",
        songName: "A. Vivaldi (1725)",
        albumName: "cover: youtuber V. Zelentsov (2015)",
      },
      answers: { a1: "Summer", a2: "Autumn", a3: "Spring", a4: "Winter" },
      correctAnswerId: "a1",
    },
    q6: {
      questionText: "Choose the correct combination of song name and author:",
      video: {
        id: "JK9LZQycBBM",
        startSeconds: 71,
      },
      answerInfo: {
        imgUrl:
          "https://sites.google.com/site/underappreciatedrockguitarists/_/rsrc/1453895411979/home/the-pantheon/highly-appreciated-items/pyotr-ilyich-tchaikovsky/pyotr-tchaikovsky-3.jpg",
        songName: "P. I. Tchaikovsky (1876)",
        albumName: "cover: Wolf Hoffmann (2016)",
      },
      answers: {
        a1: "Swan Lake (P. I. Tchaikovsky)",
        a2: "Songs and Dances of Death (M. P. Mussorgsky)",
        a3: "The Tsar's Bride (N. Rimsky-Korsakov)",
        a4: "Isle of the Dead (S. Rachmaninoff)",
      },
      correctAnswerId: "a1",
    },
    q7: {
      questionText: "Choose the correct symphony (W. A. Mozart):",
      video: {
        id: "RjW6sZuNuDs",
        startSeconds: 55,
      },
      answerInfo: {
        imgUrl:
          "https://www.latvijaskoncerti.lv/media/events/square_3cf6b6c539577421895a7c61146c7bce.jpg",
        songName: "W. A. Mozart (1788)",
        albumName: "cover: Wolf Hoffmann (2016)",
      },
      answers: {
        a1: "Symphony No. 40",
        a2: "Symphony No. 35",
        a3: "Symphony No. 30",
        a4: "Symphony No. 25",
      },
      correctAnswerId: "a1",
    },
    q8: {
      questionText: "Choose the correct combination of song name and author:",
      video: {
        id: "Oeyf2vlwPrk",
        startSeconds: 40,
      },
      answerInfo: {
        imgUrl:
          "https://cdns-images.dzcdn.net/images/artist/f16a31a3fe85c5a14debb1f811be1325/264x264.jpg",
        songName: "L. V. Beethoven (1810)",
        albumName: "cover: Wolf Hoffmann (1997)",
      },
      answers: {
        a1: "Bagatelle No. 25 (L. V. Beethoven)",
        a2: "Allegretto for piano trio (W. A. Mozart)",
        a3: "The Piano Concerto No. 2 (W. A. Mozart)",
        a4: "Piano Sonata No. 8 (L. V. Beethoven)",
      },
      correctAnswerId: "a1",
    },
    q9: {
      questionText: "Choose the correct combination of song name and author:",
      video: {
        id: "-9577xg0BjU",
        startSeconds: 21,
      },
      answerInfo: {
        imgUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Bedrich_Smetana.jpg/220px-Bedrich_Smetana.jpg",
        songName: "The Moldau (1879)",
        albumName: "cover: Wolf Hoffmann (1997)",
      },
      answers: {
        a1: "My Country (B. Smetana)",
        a2: "Libuše (A. Dvořák)",
        a3: "The Brandenburgers in Bohemia (B. Smetana)",
        a4: "The Bartered Bride (A. Dvořák)",
      },
      correctAnswerId: "a1",
    },
    q10: {
      questionText: "Choose the correct combination of song name and author:",
      video: {
        id: "yacHmBiLNZk",
        startSeconds: 61,
      },
      answerInfo: {
        imgUrl: "https://www.fext.cz/hudba/img/e-hgrieg.jpg",
        songName: "E. Grieg (1875)",
        albumName: "cover: Wolf Hoffmann (1997)",
      },
      answers: {
        a1: "In The Hall Of The Mountain King (E. Grieg)",
        a2: "Two Elegiac Melodies (J. Haydn)",
        a3: "Deep in the Forest (I. Stravinsky)",
        a4: "The Bridal Procession (C. Debussy)",
      },
      correctAnswerId: "a1",
    },
  },
  "metal-subgenres-8b5b078": {
    q1: {
      questionText: "Choose the most suitable genre:",
      video: {
        id: "e7kJRGPgvRQ",
        startSeconds: 11,
      },
      answerInfo: {
        imgUrl:
          "https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Karkelo_%28Korpiklaani_album_-_cover_art%29.jpg/220px-Karkelo_%28Korpiklaani_album_-_cover_art%29.jpg",
        songName: "Korpiklaani - Vodka",
        albumName: "Karkelo (2009)",
      },
      answers: {
        a1: "Folk metal",
        a2: "Gothic",
        a3: "Neoclassical metal",
        a4: "Speed metal",
        a5: "Symphonic metal",
      },
      correctAnswerId: "a1",
    },
    q2: {
      questionText: "Choose the most suitable genre:",
      video: {
        id: "reGlno9aUpw",
        startSeconds: 195,
      },
      answerInfo: {
        imgUrl:
          "https://www.bontonland.cz/image.php?image=/fotky/66/p-21712-full.jpg&width=96&height=96",
        songName: "Within Temptation - Mother Earth",
        albumName: "Mother Earth (2000)",
      },
      answers: {
        a1: "Symphonic metal",
        a2: "Glam metal",
        a3: "Pagan metal",
        a4: "Power metal",
        a5: "Stoner metal",
      },
      correctAnswerId: "a1",
    },
    q3: {
      questionText: "Choose the most suitable genre:",
      video: {
        id: "ZVMIk3xYaYo",
        startSeconds: 889,
      },
      answerInfo: {
        imgUrl:
          "https://www.bontonland.cz/image.php?image=/fotky/56/p-18524-full.jpg&width=96&height=96",
        songName: "Dream Theater - Octavarium",
        albumName: "Octavarium (2005)",
      },
      answers: {
        a1: "Progressive metal",
        a2: "Industrial metal",
        a3: "Metalcore",
        a4: "Symphonic metal",
        a5: "Thrash metal",
      },
      correctAnswerId: "a1",
    },
    q4: {
      questionText: "Choose the most suitable genre:",
      video: {
        id: "0jgrCKhxE1s",
        startSeconds: 100,
      },
      answerInfo: {
        imgUrl:
          "https://images-na.ssl-images-amazon.com/images/I/81JKCNvcd0L._SY355_.jpg",
        songName: "DragonForce - Through the Fire and Flames",
        albumName: "Inhuman Rampage (2005)",
      },
      answers: {
        a1: "Power metal",
        a2: "Death metal",
        a3: "Groove metal",
        a4: "Hardcore",
        a5: "Industrial metal",
      },
      correctAnswerId: "a1",
    },
    q5: {
      questionText: "Choose the most suitable genre:",
      video: {
        id: "woe_4gkS4XU",
        startSeconds: 196,
      },
      answerInfo: {
        imgUrl: "https://i.ebayimg.com/images/g/PwgAAOSwJQdXC5xO/s-l300.jpg",
        songName: "Candlemass - Solitude",
        albumName: "Inhuman Rampage (1986)",
      },
      answers: {
        a1: "Doom metal",
        a2: "Black metal",
        a3: "Death metal",
        a4: "Hardcore",
        a5: "Heavy metal",
      },
      correctAnswerId: "a1",
    },
    q6: {
      questionText: "Choose the most suitable genre:",
      video: {
        id: "VTT6picaCoQ",
        startSeconds: 60,
      },
      answerInfo: {
        imgUrl:
          "https://img.discogs.com/iyIldDANfnV1W37v-CAyU75NoW0=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-3587269-1336380921.jpeg.jpg",
        songName: "Lacuna Coil - Trip The Darkness",
        albumName: "Underworld: Awakening (2012)",
      },
      answers: {
        a1: "Gothic metal",
        a2: "Celtic metal",
        a3: "Djent",
        a4: "Sludge metal",
        a5: "Progressive metal",
      },
      correctAnswerId: "a1",
    },
    q7: {
      questionText: "Choose the most suitable genre:",
      video: {
        id: "bePCRKGUwAY",
        startSeconds: 206,
      },
      answerInfo: {
        imgUrl:
          "https://www.bontonland.cz/image.php?image=/fotky/382/p-151325-full.jpg&width=96&height=96",
        songName: "Iron Maiden - Fear of the Dark",
        albumName: "Fear of the Dark (1992)",
      },
      answers: {
        a1: "Heavy metal",
        a2: "Crossover",
        a3: "Deathcore",
        a4: "Glam metal",
        a5: "Sludge metal",
      },
      correctAnswerId: "a1",
    },
    q8: {
      questionText: "Choose the most suitable genre:",
      video: {
        id: "b1RKaRgVFKk",
        startSeconds: 11,
      },
      answerInfo: {
        imgUrl:
          "https://www.bontonland.cz/image.php?image=/fotky/301/p-121741-full.jpg&width=96&height=96",
        songName: "Asking Alexandria - The Black",
        albumName: "The Black (2016)",
      },
      answers: {
        a1: "Metalcore",
        a2: "Black metal",
        a3: "Power metal",
        a4: "Speed metal",
        a5: "Thrash metal",
      },
      correctAnswerId: "a1",
    },
    q9: {
      questionText: "Choose the most suitable genre:",
      video: {
        id: "dkNfNR1WYMY",
        startSeconds: 433,
      },
      answerInfo: {
        imgUrl:
          "https://www.bontonland.cz/image.php?image=/fotky/101/p-33396-full.jpg&width=96&height=96",
        songName: "Metallica - The Day That Never Comes",
        albumName: "Death Magnetic (2008)",
      },
      answers: {
        a1: "Thrash metal",
        a2: "Doom metal",
        a3: "Grindcore",
        a4: "Nu metal",
        a5: "Stoner metal",
      },
      correctAnswerId: "a1",
    },
    q10: {
      questionText: "Choose the most suitable genre:",
      video: {
        id: "pr3x7tS__dE",
        startSeconds: 60,
      },
      answerInfo: {
        imgUrl:
          "https://www.bontonland.cz/image.php?image=/fotky/69/p-22835-full.jpg&width=96&height=96",
        songName: "Korn - Here to Stay",
        albumName: "Untouchables (2002)",
      },
      answers: {
        a1: "Nu metal",
        a2: "Deathcore",
        a3: "Groove metal",
        a4: "Heavy metal",
        a5: "Progressive metal",
      },
      correctAnswerId: "a1",
    },
  },
};
