'use strict';
const assert = require('node:assert/strict');
const workflow = require('./Aryas_Cafe_Workflow_Template.json');
const sample = require('./sample-submission.json');
const nodes = new Map(workflow.nodes.map(node => [node.name, node]));
const context = new Map();

function execute(name, input) {
  const read = nodeName => {
    assert(context.has(nodeName), 'Missing sample node output: ' + nodeName);
    return { item: { json: context.get(nodeName) } };
  };
  const code = nodes.get(name).parameters.jsCode;
  const output = new Function('$json', '$', code)(input, read).json;
  context.set(name, output);
  return output;
}

const validationCode = nodes.get('Y04 Validate and Prepare Row').parameters.jsCode;
const headers = [...validationCode.match(/const headers = \[([\s\S]+?)\];/)[1].matchAll(/'([^']+)'/g)].map(match => match[1]);
assert.equal(headers.length, 25);
const date = new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10);
const timestamp = new Date().toISOString();
const linkRow = [sample.fields.at(-1).answer, '1001', '2002', timestamp, 'taglish'];

function prepare(submissionId, hour, guests, rows) {
  const values = {'Reservation date': date, 'Arrival time': hour, 'Number of guests': guests};
  const body = {
    ...sample,
    submission_id: submissionId,
    fields: sample.fields.map(field => ({ ...field, answer: values[field.question] ?? field.answer })),
  };
  const submission = execute('Y02 Read Submission', {body});
  context.set('Get Attempt Row', {...submission, newAttempt:true, attemptRow:2});
  return execute('Y04 Validate and Prepare Row', {values:[headers, ...rows]});
}

const fresh = prepare(sample.submission_id, '6:00', '3', []);
assert.equal(fresh.write, true);
assert.equal(fresh.reservationValues[8], '18:00');
context.set('Link New Reservation to Messenger?', fresh);
const attached = execute('Attach Messenger Recipient', {values:[linkRow]});
const savedRow = attached.reservationValues;
assert.equal(savedRow[4], '2002');
const saved = execute('Y07 Confirm Row Saved', {updates:{updatedRows:1}});
const plan = execute('Plan Reservation Outcome', saved);
const pending = execute('Prepare Reservation Messenger Notice', {values:[linkRow]});
assert.equal(plan.outcome, 'pending');
assert(pending.canSend && pending.text.includes('Pending pa po'));

const update = prepare('sample-edit-02', '6:30', '4', [savedRow]);
assert.equal(update.updateRow, 2);
assert.deepEqual(update.reservationValues, ['18:30', 4]);
const updatedRow = [...savedRow];
[updatedRow[8], updatedRow[9]] = update.reservationValues;
context.set('S01 Staff Decision Settings', {
  reservation_id:fresh.reference, decision:'approved', availability_checked:true,
  calendar_id:'primary', staff_name:'Sample Operator',
});
const approved = execute('S03 Validate Staff Decision', {values:[headers,updatedRow]});
assert.equal(approved.values[10], 'approved');
assert(approved.can_notify && approved.reply.includes('6:30 PM'));

const duplicate = prepare('sample-repeat-03', '6:30', '4', [approved.values]);
assert(duplicate.duplicateBooking && !duplicate.write);
const replay = prepare(sample.submission_id, '6:00', '3', [approved.values]);
assert(replay.duplicate && !replay.write);

const invalid = prepare('sample-invalid-04', '11:00', '3', []);
assert.equal(invalid.status, 422);
assert.equal(invalid.write, false);
execute('Plan Reservation Outcome', invalid);
const notice = execute('Prepare Reservation Messenger Notice', {values:[linkRow]});
assert(notice.canSend && notice.text.includes('Hindi po na-save'));
console.log('PASS: pending receipt, pending edit, approval text, approved duplicate, same-ID replay, invalid-slot notice.');
console.log('Local simulation: Sheets writes and Messenger delivery are represented by fixtures.');
