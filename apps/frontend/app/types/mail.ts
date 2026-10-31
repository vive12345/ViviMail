export type Folder = "inbox" | "draft" | "sent" | "snoozed" | "archive" | "spam" | "bin";

export interface Sender {
  name?: string;
  email: string;
}

export interface Label {
  id: string;
  name: string;
}

export interface Attachment {
  id: string;
  filename: string;
  size: number; // bytes
}

export interface ParsedMessage {
  id: string;
  threadId: string;
  subject: string;
  sender: Sender;
  to: Sender[];
  cc?: Sender[];
  receivedOn: string; // ISO 8601, e.g. "2026-10-30T10:24:00.000Z"
  unread: boolean;
  body: string; // plain text for now; HTML (sanitised) in phase 3
  tags: Label[];
  attachments?: Attachment[];
}

export interface Thread {
  id: string;
  folder: Folder;
  messages: ParsedMessage[]; // oldest first
}
