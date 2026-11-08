# Arya’s Cafe | Pilot evaluation

Ten Messenger cases were exercised on the optimized workflow. The tester reported six correct answers and four correct staff routes. The median reported time was **5.11 s** across all ten cases. The six routine cases had a **5.11 s** median versus **35 s** for the same cases in the hypothetical manual baseline. These are reported test timings with an unconfirmed timing source. Handoff time covers the initial response, and the manual baseline is an estimate. Neither establishes production savings.

| # | Test and expected result | Reported result | Time (s) |
|---|---|---|---:|
| 1 | Sunday hours, 2–8 PM | Correct | 6.431 |
| 2 | Complete address, no unrelated suggestions | Correct | 4.876 |
| 3 | Iced Everyday Latte, ₱119 for 16 oz, match language | Correct and language matched | 5.051 |
| 4 | Two verified pasta options below ₱220 | Correct | 5.898 |
| 5 | Two verified desserts with prices | Correct | 5.173 |
| 6 | Golden Chicken rice and side, match language | Correct and language matched | 5.000 |
| 7 | Live shrimp pasta availability, hand off | Correct route, English tone gap fixed on retest | 4.993 |
| 8 | Peanut allergy, hand off with no safety assurance | Correct route, English tone gap fixed on retest | 5.646 |
| 9 | Private event for 30, staff route | Correct, no table form | 4.648 |
| 10 | Payment/order confirmation, staff verification | Correct, no table form | 5.700 |

**Scoring:** A direct answer must match the approved knowledge and the question. An exception passes routing when the bot hands it off without inventing facts. Score language, tone, and delivery separately. For a booking, inspect the row and channel outcomes as well as the reply. Measure customer-visible time from send to the usable response, and record n8n execution time separately when available.

| Regression | Before → change | Evidence after change |
|---|---|---|
| English handoff | Fixed text replaced AI wording → pass through validated reply | Tester confirmed natural Taglish handoffs |
| Address reply | Echo or filler → output guard and direct-answer prompt | Tester confirmed improved replies. Forced echo replay unverified live |
| Menu | Route menu requests to four images | Tester reported success in 5.744 s, timing source unconfirmed |
| Booking intent | Taglish variants routed to staff → broadened intent rule | Tester confirmed localized form link |
| Split time controls | PM value initially treated as AM → combine dropdowns | Approved row showed 18:00 for a 6:00 PM request |
| Invalid slot | No customer feedback → log rejection and notify linked chat | Messenger screenshot shows valid hours and retry link |
| Pending resubmission | Changed time created a second row → match by date and normalized identity | Tester confirmed original row updated |
| Multiple active matches | Could choose wrong record → block write | Execution showed write false and a conflict message |
| Approved duplicate | Repeat form risks another booking → preserve approved row | Sheet logged duplicate_booking and execution showed write false |
| Messenger receipts | Valid requests lacked linked recipient → persist recipient and language | Tester reported the corrected confirmation flow working |

Exact successful-webhook replay and concurrent delivery protection were not verified live. The user reported approval working. Capture the actual receipt, confirmed message, email, and Calendar delivery for the final demonstration. Redact customer details and booking reference tokens in any shared screenshots.

## Submission test set

Cases 1–10 above plus the following two make up the 12-case submission set. The other regression entries are supporting evidence.

| # | Input | Expected behavior | Result |
|---|---|---|---|
| 11 | Linked Youform request outside café hours | Log invalid_timeslot, write no booking, send valid hours and a retry link | Pass in the pilot |
| 12 | Fresh form submission matching an approved booking by date, name, email, and phone | Log duplicate_booking and perform no reservation write | Pass in the pilot |

Staff intervention was expected for four of the ten Messenger cases. This is a test-set count. It does not estimate the live escalation rate or time to resolve. Cost per inquiry was not measured. For the next run, record model usage and billed amounts where available, plus execution and integration charges if attributable. Divide by completed inquiries and report the sample size. The included offline sample verifies same-ID replay logic locally. Live replay and concurrent delivery remain unverified.
