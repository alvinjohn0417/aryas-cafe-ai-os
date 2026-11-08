# Five-minute demo and first two weeks

| Time | Show |
|---|---|
| 0:00–0:35 | Explain the café support problem and how staff approve seating. |
| 0:35–1:20 | Ask for hours or address in Messenger, then request the menu. |
| 1:20–2:25 | Request a table, open the linked form, choose a valid AM/PM slot and submit with test contact details. Show the pending receipt and row. |
| 2:25–3:30 | Check seating, approve through the private staff form, and show the confirmed row and Messenger, email, and Calendar evidence. |
| 3:30–4:25 | Show a rejected slot and the Messenger recovery link. Show the duplicate result without creating another active row. |
| 4:25–5:00 | Share the test results, explain the estimated baseline and limits, and name the next improvement. |

Record the demo in Loom and attach the share link. Hide credentials, customer details, staff URLs, and booking reference tokens.

## Two-week measurement plan

These are proposed measures. Collect data after deployment and report totals, denominators, and any missing data.

| Metric | Definition and source |
|---|---|
| Adoption | Distinct Messenger sessions and unique Youform submissions, excluding test entries. Count completed staff decisions separately. |
| Answer quality | Review a sample of inquiries each week. Score factual accuracy, relevance, language, and correct escalation. Report passes over reviewed replies. |
| Reply latency | Track median and 90th percentile customer-visible reply time for timed tests. Track execution duration separately. |
| Booking completion | Track valid submissions, approvals, declines, and unresolved pending requests. Record invalid-slot and duplicate attempts separately. |
| Notification reliability | For each channel, count accepted or verified sends over eligible attempts. Record failed, unknown, and ineligible outcomes separately. |
| Staff effort | Count manual steps per booking and sample time from pending to decision. Separate time waiting for staff from time actively spent. |

In week one, review failed sends and open handoffs daily. In week two, compare common error categories and review a sample with a staff operator. Prioritize the largest observed issue. Candidate changes include a staff-reviewed amendment flow for approved bookings, stronger concurrency protection, and explicit testing of webhook replays.
