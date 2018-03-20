const Rx = require("rxjs");
const midiFileParser = require("midi-file-parser");

const { Player } = require("../module/midiplayer");
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const testMidisBasePath = "__tests__/test-midis/";
const testMidis = [
  {
    name: "disney-bippity-boppity-boo.mid",
    meta: {
      midiEventCount: 906
    }
  },
  {
    name: "disney-its-a-small-world.mid",
    meta: {
      midiEventCount: 1343
    }
  },

  {
    name: "super-mario-world.mid",
    meta: {
      midiEventCount: 3334
    }
  },
  {
    name: "chopin.mid",
    meta: {
      midiEventCount: 1211
    }
  },
  {
    name: "one-track-consecutive-chords.mid",
    meta: {
      midiEventCount: 31
    }
  },
  {
    name: "one-track-consecutive.mid",
    meta: {
      midiEventCount: 19
    }
  },
  {
    name: "zelda.mid",
    meta: {
      midiEventCount: 812
    }
  }
];

const testMidiAt = fullPath => {
  return new Promise(resolve => {
    const player = new Player();
    let counter = 0;
    player.loadFile(fullPath);
    player.setTempo(1600);
    const songTime = player.getSongTime();
    const midiEvent$ = Rx.Observable.fromEvent(player, "midiEvent");
    const endOfFileEvent$ = Rx.Observable.fromEvent(player, "endOfFile");

    midiEvent$.takeUntil(endOfFileEvent$).subscribe(
      ev => {
        counter += 1;
      },
      err => {
        throw err;
      },
      () => {
        resolve(counter);
      }
    );
    player.play();
  });
};

describe("Playing midis in node", async () => {
  if ("window" in global) {
    test("", () => {});
    return;
  }
  const runTests = [];
  for (let midi of testMidis) {
    const midiPath = midi.name;
    const fullPath = `${testMidisBasePath}${midiPath}`;
    const runTest = () => {
      return new Promise(resolve => {
        test(
          fullPath,
          async () => {
            const midiEventCount = await testMidiAt(fullPath);
            expect(midiEventCount).toEqual(midi.meta.midiEventCount);
            resolve(midiEventCount);
          },
          60000
        );
      });
    };
    runTests.push(runTest());
  }
  test("all", async () => {
    const res = await Promise.all(runTests);
  });

  // });
});
