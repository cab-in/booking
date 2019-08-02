/* eslint-disable no-unused-vars */
import http from 'k6/http';
import { sleep } from 'k6';

const listings = [
  '00002037-ba5b-49a2-ab8b-dd889ced4042',
  '00002f1d-de6e-4cb9-990e-f08c8bd0b747',
  '00002f4c-0247-46a0-ace9-79b0682272a4',
  '00002f7d-36c2-41c8-ac50-f50ed7643564',
  '0000314a-538b-4d52-a578-0cc8f5bf0d09',
  '00004359-af1f-4677-85b6-c25b21075cc0',
  '00005d80-59bf-42f4-88dc-b4de50a6a20e',
  '00005f05-58d5-4b88-9818-1cbbe4e4f2a7',
  '000066b2-28af-4fb6-b923-da67a71cd40f',
  '00006b43-674a-45f1-9952-73470ac0e95f',
  '00006e24-4ae3-476b-862a-2aab9560add2',
  '00006f95-dcc1-40cb-bddb-fdd145fdc4ae',
  '00007253-ef8e-49db-874c-f3047bffce19',
  '00007409-8226-4c49-b960-398df7bbe254',
  '00007e68-856d-4a7b-b4a2-e438bc4ecb26',
  '00007fb2-3898-4d21-8fb6-cbedc9f9214e',
  '000086c2-f23d-43d9-b6f2-03117f710bc4',
  '0000946d-322a-4f66-a612-0abebbbe9959',
  '00009c87-2ce7-4de4-8584-01a7bb0be722',
  '0000a884-70f8-4e1a-8a9d-2f88e6e71795',
  '0000b5ad-6aa0-4915-8d0e-d60efa938d51',
  '0000b650-aaf8-4f4a-9020-a5332b100e0d',
  '0000b8e2-e878-4a30-a60f-e75a5c1f8f13',
  '0000c426-57a8-4819-aea8-8714bf000e80',
  '0000c8c3-9466-4ac8-b2d0-c0d45959a75d',
  '0000e414-5d55-45a4-a0c2-9b92e8d17fc5',
  '0000e52d-5e1b-411f-82b6-b391641cbab3',
  '0000e566-d4a2-4166-bc90-113a977e6f30',
  '0000e6f7-15f2-41ee-98fa-a722d0114389',
  '0000ec42-7ff3-4276-8aed-e88ba02d517e',
  '0000ef9e-9a3f-4ed8-8324-ebe27370c743',
  '0000f129-6818-4184-826c-81a6206d6dea',
  '0000f184-6773-4203-87dd-c800047cd34d',
  '0000f29e-bd12-4671-8d01-6a4fe4252a73',
  '0000f472-a254-4927-8869-8ea2c69f0330',
  '0000f8a1-c1cb-4e65-bdf4-ae76b005d9f1',
  '0000fa40-58ae-4a2d-990e-f21bf35a7f63',
  '000103e0-493a-4ede-85b7-b71183a8a46a',
  '00010464-2ec7-4f88-b96a-fcff604f4eef',
  '00010571-2d0d-4c6b-8e6a-54cad8ffe242',
  '00011eb2-3a65-4363-a559-b2b09c599875',
  '00012431-6923-4764-870d-e56ce4b9d312',
  '00012509-a4fa-4bf7-b237-9f491749ec81',
  '00013b0e-bdab-4804-82f5-52cd515c530a',
  '00013cab-78b7-47e0-95d5-16808918014b',
  '000141fa-7361-4c0e-aa91-14bcb129d894',
  '00014254-be29-44c0-9337-33dc0ddb9b6e',
  '00014803-3a32-4c51-a4c6-36de21de1b77',
  '000165e7-c4e9-4f2b-b7a7-d6d480849d30',
  '00017762-0a6d-4e12-9864-0c56417a69f4',
];

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0; const
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const desiredRPS = 1000; // total RPS for the test

// maximum requests executed by one VU per second, determined by experimentation.
// You can adjust this up/down depending on the performance of system you are testing.
const RPSperVU = 10;

const VUsRequired = Math.round(desiredRPS / RPSperVU);

export const options = {
  vus: VUsRequired,
  duration: '120s',
};

export default function () {
  const iterationStart = new Date().getTime();
  const uuid = uuidv4();
  const day = '2019-07-19';
  const payload = JSON.stringify({
    booking_id: uuid, listing_id: uuid, user_id: uuid, day,
  });
  const params = { headers: { 'Content-Type': 'application/json' } };

  for (const i of Array(RPSperVU).keys()) {
    const index = Math.floor(Math.random() * (50 - 0) + 0);
    http.get(`http://localhost:3001/api/bookings/${listings[index]}`);
}
//   http.post('http://localhost:3001/api/bookings/', payload, params);
  const iterationDuration = (new Date().getTime() - iterationStart) / 1000;
  const sleepTime = 1 - iterationDuration; // 1 second minus time spent on request execution

  if (sleepTime > 0) {
    sleep(sleepTime);
  }
}
