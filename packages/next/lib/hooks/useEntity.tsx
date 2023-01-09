export type EventHandler = {
  target: { name: string, value: string }
};

export type HandleChange = (ev: EventHandler) => string | null | void;
