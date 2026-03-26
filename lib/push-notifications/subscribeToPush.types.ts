export type SubscribeToPushResult =
  | { ok: true }
  | {
      ok: false;
      code:
        | 'unsupported'
        | 'missingVapidKey'
        | 'permissionDenied'
        | 'subscribeFailed'
        | 'persistFailed';
      message?: string;
    };
