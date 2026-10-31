import type { Label, Sender, Thread } from "~/types/mail";

const now = Date.now();
const hoursAgo = (hours: number) => new Date(now - hours * 60 * 60 * 1000).toISOString();

const ME: Sender = { name: "Me", email: "me@example.com" };
const ALICE: Sender = { name: "Alice Chen", email: "alice@example.com" };
const BOB: Sender = { name: "Bob Smith", email: "billing@example.com" };
const CARLOS: Sender = { name: "Carlos Rivera", email: "carlos@example.com" };
const DESIGN: Sender = { name: "Design Weekly", email: "newsletter@example.com" };
const PRIYA: Sender = { name: "Priya Patel", email: "priya@example.com" };
const NOREPLY: Sender = { email: "no-reply@example.com" };

const WORK: Label = { id: "work", name: "Work" };
const FINANCE: Label = { id: "finance", name: "Finance" };
const NEWSLETTER: Label = { id: "newsletter", name: "Newsletter" };

export const MOCK_THREADS: Thread[] = [
  {
    id: "t1",
    folder: "inbox",
    messages: [
      {
        id: "m1",
        threadId: "t1",
        subject: "Q3 planning",
        sender: ALICE,
        to: [ME],
        receivedOn: hoursAgo(3),
        unread: false,
        body: "Hi!\n\nCan we move the Q3 planning meeting to Thursday? Wednesday is packed.\n\nAlice",
        tags: [WORK],
      },
      {
        id: "m2",
        threadId: "t1",
        subject: "Re: Q3 planning",
        sender: ME,
        to: [ALICE],
        receivedOn: hoursAgo(2),
        unread: false,
        body: "Sure, Thursday 10:00 works for me.",
        tags: [WORK],
      },
      {
        id: "m3",
        threadId: "t1",
        subject: "Re: Q3 planning",
        sender: ALICE,
        to: [ME],
        cc: [CARLOS],
        receivedOn: hoursAgo(1),
        unread: true,
        body: "Great, I've moved it. Adding Carlos so he can bring the numbers.",
        tags: [WORK],
      },
    ],
  },
  {
    id: "t2",
    folder: "inbox",
    messages: [
      {
        id: "m4",
        threadId: "t2",
        subject: "Invoice #2041",
        sender: BOB,
        to: [ME],
        receivedOn: hoursAgo(30),
        unread: true,
        body: "Hello,\n\nAttached is invoice #2041 for October. Payment is due in 14 days.\n\nThanks,\nBob",
        tags: [FINANCE],
        attachments: [{ id: "a1", filename: "invoice-2041.pdf", size: 84_000 }],
      },
    ],
  },
  {
    id: "t3",
    folder: "inbox",
    messages: [
      {
        id: "m5",
        threadId: "t3",
        subject: "This week in design: spacing systems",
        sender: DESIGN,
        to: [ME],
        receivedOn: hoursAgo(50),
        unread: false,
        body: "Five articles on spacing, type scales and building a calm interface.",
        tags: [NEWSLETTER],
      },
    ],
  },
  {
    id: "t4",
    folder: "inbox",
    messages: [
      {
        id: "m6",
        threadId: "t4",
        subject: "Lunch on Friday?",
        sender: PRIYA,
        to: [ME],
        receivedOn: hoursAgo(26),
        unread: true,
        body: "There's a new ramen place near the office. Friday at 12:30?",
        tags: [],
      },
    ],
  },
  {
    id: "t5",
    folder: "inbox",
    messages: [
      {
        id: "m7",
        threadId: "t5",
        subject: "Your password was changed",
        sender: NOREPLY,
        to: [ME],
        receivedOn: hoursAgo(24 * 40),
        unread: false,
        body: "The password for your account was changed. If this wasn't you, contact support.",
        tags: [],
      },
    ],
  },
  {
    id: "t6",
    folder: "sent",
    messages: [
      {
        id: "m8",
        threadId: "t6",
        subject: "Project kickoff notes",
        sender: ME,
        to: [CARLOS, PRIYA],
        receivedOn: hoursAgo(72),
        unread: false,
        body: "Hi both,\n\nNotes from today's kickoff:\n- Scope agreed\n- Next check-in on Monday",
        tags: [WORK],
      },
    ],
  },
  {
    id: "t7",
    folder: "draft",
    messages: [
      {
        id: "m9",
        threadId: "t7",
        subject: "Holiday dates",
        sender: ME,
        to: [ALICE],
        receivedOn: hoursAgo(5),
        unread: false,
        body: "Hi Alice, I'd like to take Dec 22 to Jan 2 off. Let me know if",
        tags: [],
      },
    ],
  },
  {
    id: "t8",
    folder: "spam",
    messages: [
      {
        id: "m10",
        threadId: "t8",
        subject: "You won a prize!!!",
        sender: { name: "Prize Team", email: "winner@example.com" },
        to: [ME],
        receivedOn: hoursAgo(10),
        unread: true,
        body: "Click here to claim your prize.",
        tags: [],
      },
    ],
  },
  {
    id: "t9",
    folder: "archive",
    messages: [
      {
        id: "m11",
        threadId: "t9",
        subject: "Welcome aboard",
        sender: CARLOS,
        to: [ME],
        receivedOn: hoursAgo(24 * 400),
        unread: false,
        body: "Welcome to the team! Here's everything you need for your first week.",
        tags: [WORK],
      },
    ],
  },
];
