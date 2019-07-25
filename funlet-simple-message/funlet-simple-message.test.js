const funlet = require('./funlet-simple-message');
const Twilio = require('twilio');

const MESSAGE1="Message #1";
const MESSAGE2="https://example.com/message2";
const MESSAGE3="Message #3";
const MESSAGE4="https://example.com/message4";
const MESSAGE5="Message #5";

const DEFAULT_MESSAGE="";

const XML_DECLARATION='<?xml version="1.0" encoding="UTF-8"?>';

const ENGLISH="en";
const ALICE="alice";

test('[SIMPLE-MESSAGE-INPUT-MESSAGE-1] Read Single Message from Event',
() => {
  expect(
    funlet.input.getMessage({}, {Message:MESSAGE1})
  ).toEqual( [MESSAGE1] );
});

test('[SIMPLE-MESSAGE-INPUT-MESSAGE-2] Read List of Messages from Event',
() => {
  expect(
    funlet.input.getMessage({}, {Message:[MESSAGE1,MESSAGE2,MESSAGE3]})
  ).toEqual( [MESSAGE1,MESSAGE2,MESSAGE3] );
});

test('[SIMPLE-MESSAGE-INPUT-MESSAGE-3] Read Single Message from Environment',
() => {
  expect(
    funlet.input.getMessage({FUNLET_MESSAGE1:MESSAGE1}, {})
  ).toEqual( [MESSAGE1] );
});

test('[SIMPLE-MESSAGE-INPUT-MESSAGE-4] Read Five Messages from Environment',
() => {
  expect(
    funlet.input.getMessage(
      {
        FUNLET_MESSAGE1:MESSAGE1,
        FUNLET_MESSAGE2:MESSAGE2,
        FUNLET_MESSAGE3:MESSAGE3,
        FUNLET_MESSAGE4:MESSAGE4,
        FUNLET_MESSAGE5:MESSAGE5
      }, {}
    )
  ).toEqual( [MESSAGE1,MESSAGE2,MESSAGE3,MESSAGE4,MESSAGE5] );
});

test('[SIMPLE-MESSAGE-INPUT-MESSAGE-5] Read Default Message from Script',
() => {
  expect(
    funlet.input.getMessage({}, {})
  ).toEqual( [DEFAULT_MESSAGE] );
});

test('[SIMPLE-MESSAGE-OUTPUT-SIMPLE-MESSAGE-0] '+
     'simpleMessage() with Empty Message',
() => {
  const EMPTY_MESSAGE="";
  const EMPTY_RESPONSE=
    XML_DECLARATION+
    '<Response/>';

  let response = new Twilio.twiml.VoiceResponse();
  funlet.output.simpleMessage( response, EMPTY_MESSAGE, ENGLISH, ALICE );
  expect( response.toString() ).toEqual( EMPTY_RESPONSE );
});

test('[SIMPLE-MESSAGE-OUTPUT-SIMPLE-MESSAGE-1] '+
     'simpleMessage() with Recorded Message',
() => {
  const RECORDED_MESSAGE="https://example.com/recorded-message";
  const PLAY_RECORDED_MESSAGE =
    XML_DECLARATION+
    '<Response>'+
      '<Play>'+RECORDED_MESSAGE+'</Play>'+
    '</Response>';

  let response = new Twilio.twiml.VoiceResponse();
  funlet.output.simpleMessage(response, RECORDED_MESSAGE, ENGLISH, ALICE);
  expect( response.toString() ).toEqual( PLAY_RECORDED_MESSAGE );
});

test('[SIMPLE-MESSAGE-OUTPUT-SIMPLE-MESSAGE-2] '+
     'simpleMessage() with Text Message',
() => {
  const TEXT_MESSAGE="Text message";
  const SAY_TEXT_MESSAGE =
    XML_DECLARATION+
    '<Response>'+
      '<Say language="'+ENGLISH+'" voice="'+ALICE+'">'+TEXT_MESSAGE+'</Say>'+
    '</Response>';

  let response = new Twilio.twiml.VoiceResponse();
  funlet.output.simpleMessage(response, TEXT_MESSAGE, ENGLISH, ALICE);
  expect( response.toString() ).toEqual( SAY_TEXT_MESSAGE );
});

test('[SIMPLE-MESSAGE-OUTPUT-SIMPLE-MESSAGES-0] '+
     'simpleMessages() with Empty List',
() => {
  const NO_MESSAGES=[];
  const EMPTY_RESPONSE=
    XML_DECLARATION+
    '<Response/>';

  let response = new Twilio.twiml.VoiceResponse();
  funlet.output.simpleMessages( response, NO_MESSAGES, ENGLISH, ALICE );
  expect( response.toString() ).toEqual( EMPTY_RESPONSE );
});

test('[SIMPLE-MESSAGE-OUTPUT-SIMPLE-MESSAGES-1] '+
     'simpleMessages() with Single Recorded Message',
() => {
  const SINGLE_RECORDED_MESSAGE=["https://example.com/recorded-message"];
  const PLAY_RECORDED_MESSAGE =
    XML_DECLARATION+
    '<Response>'+
      '<Play>'+SINGLE_RECORDED_MESSAGE+'</Play>'+
    '</Response>';

  let response = new Twilio.twiml.VoiceResponse();
  funlet.output.simpleMessages(response, SINGLE_RECORDED_MESSAGE, ENGLISH, ALICE);
  expect( response.toString() ).toEqual( PLAY_RECORDED_MESSAGE );
});

test('[SIMPLE-MESSAGE-OUTPUT-SIMPLE-MESSAGES-2] '+
     'simpleMessages() with Single Text Message',
() => {
  const SINGLE_TEXT_MESSAGE=["Text message"];
  const SAY_TEXT_MESSAGE =
    XML_DECLARATION+
    '<Response>'+
      '<Say language="'+ENGLISH+'" voice="'+ALICE+'">'+
        SINGLE_TEXT_MESSAGE+
      '</Say>'+
    '</Response>';

  let response = new Twilio.twiml.VoiceResponse();
  funlet.output.simpleMessages(response, SINGLE_TEXT_MESSAGE, ENGLISH, ALICE);
  expect( response.toString() ).toEqual( SAY_TEXT_MESSAGE );
});

test('[SIMPLE-MESSAGE-OUTPUT-SIMPLE-MESSAGES-3] '+
     'simpleMessages() with Multiple Messages',
() => {
  const MULTIPLE_MESSAGES=[MESSAGE1,MESSAGE2,MESSAGE3];
  const PLAY_AND_SAY_MESSAGES =
    XML_DECLARATION+
    '<Response>'+
      '<Say language="'+ENGLISH+'" voice="'+ALICE+'">'+MESSAGE1+'</Say>'+
      '<Play>'+MESSAGE2+'</Play>'+
      '<Say language="'+ENGLISH+'" voice="'+ALICE+'">'+MESSAGE3+'</Say>'+
    '</Response>';

  let response = new Twilio.twiml.VoiceResponse();
  funlet.output.simpleMessages(response, MULTIPLE_MESSAGES, ENGLISH, ALICE);
  expect( response.toString() ).toEqual( PLAY_AND_SAY_MESSAGES );
});

test.skip('[SIMPLE-MESSAGE-1] Full Response', done => {
  // ...
  const callback = (err, result) => {
    expect(result).toBe('...');
    done();
  };
  funlet({}, {}, callback);
});
