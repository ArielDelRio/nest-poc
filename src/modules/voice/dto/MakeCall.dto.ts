export class MakeCallDto {
  // AccountSid?: string;
  // ApiVersion?: string;
  // ApplicationSid?: string;

  Called: string;
  Caller: string;
  CallSid: string;
  CallStatus: string;
  Direction: string;
  From: string;
  To: string;

  Record?: boolean;
  message?: string;
}
