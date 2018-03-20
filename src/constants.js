export const getConstants = () => {
  /**
 * Constants used in player.
 */
  const constants = {
    VERSION: "2.0.3",
    NOTES: [],
    CIRCLE_OF_FOURTHS: [
      "C",
      "F",
      "Bb",
      "Eb",
      "Ab",
      "Db",
      "Gb",
      "Cb",
      "Fb",
      "Bbb",
      "Ebb",
      "Abb"
    ],
    CIRCLE_OF_FIFTHS: [
      "C",
      "G",
      "D",
      "A",
      "E",
      "B",
      "F#",
      "C#",
      "G#",
      "D#",
      "A#",
      "E#"
    ]
  };

  // Builds notes object for reference against binary values.
  var allNotes = [
    ["C"],
    ["C#", "Db"],
    ["D"],
    ["D#", "Eb"],
    ["E"],
    ["F"],
    ["F#", "Gb"],
    ["G"],
    ["G#", "Ab"],
    ["A"],
    ["A#", "Bb"],
    ["B"]
  ];
  var counter = 0;

  // All available octaves.
  for (let i = -1; i <= 9; i++) {
    allNotes.forEach(noteGroup => {
      noteGroup.forEach(note => (constants.NOTES[counter] = note + i));
      counter++;
    });
  }
  return constants;
};

export const Constants = getConstants();
