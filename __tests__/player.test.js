const axios = require("axios");

const { Player } = require("../module/midiplayer");

const zeldaDataURI =
  "data:audio/midi;base64,TVRoZAAAAAYAAQACAIBNVHJrAAADoQDAAQCQRn+CAIBGfwCQRn9AgEZ/AJBBf0CAQX8AkEF/QIBBfwCQRn9AgEZ/AJBEfyCARH8AkEJ/IIBCfwCQRH+DAIBEf0CQRn+CAIBGfwCQRn9AgEZ/AJBBf0CAQX8AkEF/QIBBfwCQRn9AgEZ/AJBFfyCARX8AkEN/IIBDfwCQRX+BQIBFf4IAkEUBhACARQGEAJBGf4EAgEZ/AJBBf4FAgEF/AJBGf0CARn8AkEZ/IIBGfwCQSH8ggEh/AJBKfyCASn8AkEt/IIBLfwCQTX+CAIBNf0CQTX9AgE1/AJBNf0CATX8AkE5/IIBOfwCQUH8ggFB/AJBSf4IAgFJ/QJBSf0CAUn8AkFJ/QIBSfwCQUH8ggFB/AJBOfyCATn8AkFB/YIBQfwCQTn8ggE5/AJBNf4IAgE1/AJBNf4EAgE1/AJBLf2CAS38AkE1/IIBNfwCQTn+CAIBOfwCQTX9AgE1/AJBLf0CAS38AkEl/YIBJfwCQS38ggEt/AJBNf4IAgE1/AJBLf0CAS38AkEl/QIBJfwCQSH9ggEh/AJBKfyCASn8AkEx/ggCATH8AkE9/gQCAT38AkE1/QIBNfwCQQX8ggEF/AJBBfyCAQX8AkEF/QIBBfwCQQX8ggEF/AJBBfyCAQX8AkEF/QIBBfwCQQX8ggEF/AJBBfyCAQX8AkEF/QIBBfwCQQX9AgEF/AJBGf4EAgEZ/AJBBf4FAgEF/AJBGf0CARn8AkEZ/IIBGfwCQSH8ggEh/AJBKfyCASn8AkEt/IIBLfwCQTX+CAIBNf0CQTX9AgE1/AJBNf0CATX8AkE5/IIBOfwCQUH8ggFB/AJBSf4MAgFJ/AJBVf4EAgFV/AJBUf4EAgFR/AJBRf4IAgFF/AJBNf4EAgE1/AJBOf4MAgE5/AJBSf4EAgFJ/AJBRf4EAgFF/AJBNf4IAgE1/AJBNf4EAgE1/AJBOf4MAgE5/AJBSf4EAgFJ/AJBRf4EAgFF/AJBNf4IAgE1/AJBKf4EAgEp/AJBLf4MAgEt/AJBOf4EAgE5/AJBNf4EAgE1/AJBJf4IAgEl/AJBGf4EAgEZ/AJBIf2CASH8AkEp/IIBKfwCQTH+CAIBMfwCQT3+BAIBPfwCQTX9AgE1/AJBBfyCAQX8AkEF/IIBBfwCQQX9AgEF/AJBBfyCAQX8AkEF/IIBBfwCQQX9AgEF/AJBBfyCAQX8AkEF/IIBBfwCQQX9AgEF/AJBBf0CAQX8A/y8ATVRyawAACUMAwAEAkCpAgQCAKkAAkDVAgQCANUAAkDpAggCAOkAAkClAgQCAKUAAkDNAgQCAM0AAkDhAggCAOEAAkCdAgQCAJ0AAkDFAgQCAMUAAkDpAggCAOkAAkCpAgQCAKkAAkDVAgQCANUAAkDpAggCAOkAAkC5AQIAuQACQLkAggC5AAJApQCCAKUAAkC5AQIAuQACQLkAggC5AAJApQCCAKUAAkC5AQIAuQACQLkAggC5AAJApQCCAKUAAkC5AIIAuQACQKUAggClAAJAuQCCALkAAkClAIIApQACQLkBAgC5AAJAuQCCALkAAkClAIIApQACQLkBAgC5AAJAuQCCALkAAkClAIIApQACQLkBAgC5AAJAuQCCALkAAkClAIIApQACQLkAggC5AAJApQCCAKUAAkC5AIIAuQACQKUAggClAAJAuQECALkAAkC5AIIAuQACQKUAggClAAJAuQECALkAAkC5AIIAuQACQKUAggClAAJAuQECALkAAkC5AIIAuQACQKUAggClAAJAuQCCALkAAkClAIIApQACQLkAggC5AAJApQCCAKUAAkCxAQIAsQACQLEAggCxAAJAnQCCAJ0AAkCxAQIAsQACQLEAggCxAAJAnQCCAJ0AAkCxAQIAsQACQLEAggCxAAJAnQCCAJ0AAkCxAIIAsQACQJ0AggCdAAJAsQCCALEAAkCdAIIAnQACQKkBAgCpAAJAqQCCAKkAAkCVAIIAlQACQKkBAgCpAAJAqQCCAKkAAkCVAIIAlQACQKkBAgCpAAJAqQCCAKkAAkCVAIIAlQACQKkAggCpAAJAlQCCAJUAAkCpAIIAqQACQJUAggCVAAJAxQECAMUAAkDFAIIAxQACQLEAggCxAAJAxQECAMUAAkDFAIIAxQACQLEAggCxAAJAxQECAMUAAkDFAIIAxQACQLEAggCxAAJAxQCCAMUAAkCxAIIAsQACQMUAggDFAAJAsQCCALEAAkC9AQIAvQACQL0AggC9AAJAqQCCAKkAAkC9AQIAvQACQL0AggC9AAJAqQCCAKkAAkC9AQIAvQACQL0AggC9AAJAqQCCAKkAAkC9AIIAvQACQKkAggCpAAJAvQCCAL0AAkCpAIIAqQACQLkBAgC5AAJAuQCCALkAAkClAIIApQACQLkBAgC5AAJAuQCCALkAAkClAIIApQACQLkBAgC5AAJAuQCCALkAAkClAIIApQACQLkAggC5AAJApQCCAKUAAkC5AIIAuQACQKUAggClAAJAwQECAMEAAkDBAIIAwQACQK0AggCtAAJAwQECAMEAAkDBAIIAwQACQK0AggCtAAJAwQECAMEAAkDBAIIAwQACQK0AggCtAAJAwQCCAMEAAkCtAIIArQACQMEAggDBAAJArQCCAK0AAkClAQIApQACQOUAggDlAAJA5QCCAOUAAkDhAQIA4QACQOEAggDhAAJA4QCCAOEAAkDdAQIA3QACQN0AggDdAAJA3QCCAN0AAkDZAQIA2QACQKUBAgClAAJAuQECALkAAkC5AIIAuQACQKUAggClAAJAuQECALkAAkC5AIIAuQACQKUAggClAAJAuQECALkAAkC5AIIAuQACQKUAggClAAJAuQCCALkAAkClAIIApQACQLkAggC5AAJApQCCAKUAAkCxAQIAsQACQLEAggCxAAJAnQCCAJ0AAkCxAQIAsQACQLEAggCxAAJAnQCCAJ0AAkCxAQIAsQACQLEAggCxAAJAnQCCAJ0AAkCxAIIAsQACQJ0AggCdAAJAsQCCALEAAkCdAIIAnQACQKkBAgCpAAJAqQCCAKkAAkCpAIIAqQACQKkBAgCpAAJAqQCCAKkAAkCpAIIAqQACQKkBAgCpAAJAqQCCAKkAAkCpAIIAqQACQKkAggCpAAJAqQCCAKkAAkCpAIIAqQACQKkAggCpAAJApQECAKUAAkClAIIApQACQKUAggClAAJApQECAKUAAkClAIIApQACQKUAggClAAJApQECAKUAAkClAIIApQACQKUAggClAAJApQCCAKUAAkClAIIApQACQKUAggClAAJApQCCAKUAAkChAQIAoQACQKEAggChAAJAoQCCAKEAAkChAQIAoQACQKEAggChAAJAoQCCAKEAAkChAQIAoQACQKEAggChAAJAoQCCAKEAAkChAIIAoQACQKEAggChAAJAoQCCAKEAAkChAIIAoQACQKUBAgClAAJApQCCAKUAAkClAIIApQACQKUBAgClAAJApQCCAKUAAkClAIIApQACQKUBAgClAAJApQCCAKUAAkClAIIApQACQKUAggClAAJApQCCAKUAAkClAIIApQACQKUAggClAAJAoQECAKEAAkChAIIAoQACQKEAggChAAJAoQECAKEAAkChAIIAoQACQKEAggChAAJAoQECAKEAAkChAIIAoQACQKEAggChAAJAoQCCAKEAAkChAIIAoQACQKEAggChAAJAoQCCAKEAAkClAQIApQACQKUAggClAAJApQCCAKUAAkClAQIApQACQKUAggClAAJApQCCAKUAAkClAQIApQACQKUAggClAAJApQCCAKUAAkClAIIApQACQKUAggClAAJApQCCAKUAAkClAIIApQACQL0BAgC9AAJAvQCCAL0AAkC9AIIAvQACQL0BAgC9AAJAvQCCAL0AAkC9AIIAvQACQL0BAgC9AAJAvQCCAL0AAkC9AIIAvQACQL0AggC9AAJAvQCCAL0AAkC9AIIAvQACQL0AggC9AAJAuQECALkAAkC5AIIAuQACQLkAggC5AAJAuQECALkAAkC5AIIAuQACQLkAggC5AAJAuQECALkAAkC5AIIAuQACQLkAggC5AAJAuQCCALkAAkC5AIIAuQACQLkAggC5AAJAuQCCALkAAkDBAQIAwQACQMEAggDBAAJAwQCCAMEAAkDBAQIAwQACQMEAggDBAAJAwQCCAMEAAkDBAQIAwQACQMEAggDBAAJAwQCCAMEAAkDBAIIAwQACQMEAggDBAAJAwQCCAMEAAkDBAIIAwQACQKUBAgClAAJA5QCCAOUAAkDlAIIA5QACQOEBAgDhAAJA4QCCAOEAAkDhAIIA4QACQN0BAgDdAAJA3QCCAN0AAkDdAIIA3QACQNkBAgDZAAJApQECAKUAA/y8A";

const zeldaURL = `https://raw.githubusercontent.com/grimmdude/MidiPlayerJS/master/demo/midi/zelda.mid`;

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

describe("#Player", function() {
  it("#constructor should export instantiable player", () => {
    const player = new Player();
    expect(Object.keys(player)).toMatchSnapshot();
  });

  it("#loadFile should load file from filesystem", () => {
    const player = new Player();
    player.loadFile("demo/midi/zelda.mid");
    expect(player.buffer.length).toEqual(3330);
    expect(player.tracks.length).toEqual(2);
  });

  it("#loadDataUri()", () => {
    const player = new Player();
    player.loadDataUri(zeldaDataURI);
    expect(player.buffer.length).toEqual(3330);
    expect(player.tracks.length).toEqual(2);
  });

  it("#loadArrayBuffer()", async () => {
    const player = new Player();
    const { data: midiArrayBuffer } = await axios.get(zeldaURL, {
      responseType: "arraybuffer"
    });
    player.loadArrayBuffer(midiArrayBuffer);
    expect(player.buffer.length).toEqual(3330);
    expect(player.tracks.length).toEqual(2);
    expect(player.getFilesize()).toEqual(3330);
  });

  it("#loadDataUri will throw when invalid midi file loaded", () => {
    const player = new Player();
    expect(() => {
      player.loadDataUri("");
    }).toThrow();
  });

  it("#loadArrayBuffer()  will throw when invalid midi file loaded", async () => {
    const midiArrayBuffer = "";

    const player = new Player();
    try {
      player.loadArrayBuffer(midiArrayBuffer);
      throw new Error("SHOULD THROW BEFORE HERE ! ");
    } catch (err) {
      expect(err).toMatchSnapshot();
    }
  });

  it(
    "#on()",
    async () => {
      const player = new Player();
      const onMidiEvent = jest.fn();
      const onPlayingEvent = jest.fn();
      const onFileEndEvent = jest.fn();
      player.loadDataUri(zeldaDataURI);
      player.on("midiEvent", onMidiEvent);
      player.on("playing", onPlayingEvent);
      player.on("endOfFile", onFileEndEvent);
      player.play();
      await delay(1000);
      player.pause();
      player.skipToPercent(100);
      player.play();
      await delay(100);
      const remainingPercent = player.getSongPercentRemaining();
      expect(remainingPercent).toBeLessThan(100);
      const onMidiEventCallCount = onMidiEvent.mock.calls.length;
      const onPlayingEventCallCount = onPlayingEvent.mock.calls.length;
      const onFileEndEventCallCount = onFileEndEvent.mock.calls.length;
      expect(onFileEndEventCallCount).toEqual(1);
      expect(onMidiEventCallCount).toBeGreaterThan(0);
      expect(onPlayingEventCallCount).toBeGreaterThan(0);
      expect(onPlayingEventCallCount).toBeGreaterThanOrEqual(
        onMidiEventCallCount
      );
    },
    6000
  );

  it("can pass event handler in constructor", async () => {
    const onMidiEvent = jest.fn();
    const player = new Player(onMidiEvent);
    player.loadDataUri(zeldaDataURI);
    player.play();
    await delay(1000);
    player.stop();
    const onMidiEventCallCount = onMidiEvent.mock.calls.length;
    expect(onMidiEventCallCount).toBeGreaterThan(0);
  });

  it("can enable and disable tracks. #enableTrack() #disableTrack", async () => {
    const player = new Player();
    player.loadDataUri(zeldaDataURI);
    player.enableTrack(1);
    expect(player.tracks[0].enabled).toEqual(true);
    player.disableTrack(1);
    expect(player.tracks[0].enabled).toEqual(false);
  });

  it("#setStartTime", () => {
    const player = new Player();
    player.loadDataUri(zeldaDataURI);
    player.setStartTime(1);
    expect(player.startTime).toEqual(1);
  });

  it("#play throws if called while track is playing", () => {
    const player = new Player();
    player.loadDataUri(zeldaDataURI);
    player.play();
    expect(() => {
      try {
        player.play();
      } catch (err) {
        expect(err).toMatchSnapshot();
        throw err;
      }
    }).toThrow();
  });

  it("#skipToPercent throws when invalid percent", () => {
    const player = new Player();
    player.loadDataUri(zeldaDataURI);
    expect(() => {
      try {
        player.skipToPercent(200);
      } catch (err) {
        expect(err).toMatchSnapshot();
        throw err;
      }
    }).toThrow();
  });

  it("#skipToSeconds throws when argument bigger than song length", () => {
    const player = new Player();
    player.loadDataUri(zeldaDataURI);
    expect(() => {
      try {
        player.skipToSeconds(Number.MAX_SAFE_INTEGER);
      } catch (err) {
        expect(err).toMatchSnapshot();
        throw err;
      }
    }).toThrow();
  });

  it("#skipToSeconds skips to corresponding percent", () => {
    const player = new Player();
    player.loadDataUri(zeldaDataURI);
    const previousStartTick = player.startTick;

    player.skipToSeconds(1);
    const startTick = player.startTick;
    expect(startTick).toBeGreaterThan(previousStartTick);
  });
});
