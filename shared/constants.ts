export const CONSTANTS = {
  MAX_ITEMS_IN_DATABASE: 100,
  MAX_ITEMS_BATCH_UPLOAD: 10,
  STATIC_CONTENT: {
    GAME_PLAY: {
      GAME_TITLE: { from: "en", text: "Trivia time!" },
      GAME_NAV_PREFIX: { from: "en", text: "Play in" },
      GAME_ITERATION_OF: { from: "en", text: "of" },
      GAME_ITERATION_SUBMIT_ANSWER: { from: "en", text: "Submit answer" },
    },
    EXPLANATORY_TEXT: {
      NAV_BAR: {
        from: "en",
        text: "Select the language _before_ you start the game. Each section of text is translated as it is needed to show off Next.js capabilities. It is _not_ meant to demonstrate best practices.",
      },
      TRIVIA_QUESTION: {
        from: "en",
        text: "The game questions are randomly pulled from a set of questions, 1 at a time. You may see the same question twice. ",
      },
      RESTART_GAME: {
        from: "en",
        text: "The game has a set number of questions. When you've answer those questions, you can start another game.",
      },
    },
  },
};
