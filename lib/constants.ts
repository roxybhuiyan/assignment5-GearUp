/**
 * The backend's Stripe success/cancel URLs are static (configured once via env,
 * no per-order query param). We stash the order id client-side before redirecting
 * to Stripe so the success/cancel pages know which order to confirm.
 */
export const PENDING_ORDER_COOKIE = "gearup_pending_rental_order_id";
