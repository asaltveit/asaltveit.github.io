const SETTLE_MS = 150;

let active = false;
let settleTimer: ReturnType<typeof setTimeout> | null = null;
let listenersBound = false;

function clearSettleTimer(): void {
  if (settleTimer) {
    clearTimeout(settleTimer);
    settleTimer = null;
  }
}

function scheduleSettle(): void {
  clearSettleTimer();
  settleTimer = setTimeout(endAutoScroll, SETTLE_MS);
}

function onUserInput(): void {
  if (!active) return;
  endAutoScroll();
}

function bindCancelListeners(): void {
  if (listenersBound || typeof window === 'undefined') return;
  listenersBound = true;
  window.addEventListener('wheel', onUserInput, { passive: true });
  window.addEventListener('touchstart', onUserInput, { passive: true });
}

export function isAutoScrollActive(): boolean {
  return active;
}

export function beginAutoScroll(): void {
  bindCancelListeners();
  active = true;
  scheduleSettle();
}

export function touchAutoScroll(): void {
  if (!active) return;
  scheduleSettle();
}

export function endAutoScroll(): void {
  active = false;
  clearSettleTimer();
}
