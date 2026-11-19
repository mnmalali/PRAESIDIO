// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 SecureAgentics

import type { PraesidioCallbackHandler } from "./handler.js";
import type { WebSocketClient } from "./ws.js";

let handler: PraesidioCallbackHandler | null = null;
let wsClient: WebSocketClient | null = null;

export function getHandler(): PraesidioCallbackHandler | null {
  return handler;
}

export function getWebSocketClient(): WebSocketClient | null {
  return wsClient;
}

export function setRuntime(nextHandler: PraesidioCallbackHandler | null, nextWsClient: WebSocketClient | null): void {
  handler = nextHandler;
  wsClient = nextWsClient;
}
