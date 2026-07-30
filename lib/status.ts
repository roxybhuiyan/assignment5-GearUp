import type { PaymentStatus, RentalStatus, Role, UserStatus } from "./types";

interface StatusStyle {
  label: string;
  className: string;
}

export const rentalStatusStyles: Record<RentalStatus, StatusStyle> = {
  PLACED: {
    label: "Placed",
    className: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-400",
  },
  CONFIRMED: {
    label: "Confirmed",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-500/15 dark:text-blue-400",
  },
  PAID: {
    label: "Paid",
    className: "bg-purple-100 text-purple-800 dark:bg-purple-500/15 dark:text-purple-400",
  },
  PICKED_UP: {
    label: "Picked Up",
    className: "bg-green-100 text-green-800 dark:bg-green-500/15 dark:text-green-400",
  },
  RETURNED: {
    label: "Returned",
    className: "bg-gray-200 text-gray-700 dark:bg-gray-500/15 dark:text-gray-400",
  },
  CANCELLED: {
    label: "Cancelled",
    className: "bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-400",
  },
};

export const paymentStatusStyles: Record<PaymentStatus, StatusStyle> = {
  PENDING: {
    label: "Pending",
    className: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-400",
  },
  COMPLETED: {
    label: "Completed",
    className: "bg-green-100 text-green-800 dark:bg-green-500/15 dark:text-green-400",
  },
  FAILED: {
    label: "Failed",
    className: "bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-400",
  },
};

export const userStatusStyles: Record<UserStatus, StatusStyle> = {
  ACTIVE: {
    label: "Active",
    className: "bg-green-100 text-green-800 dark:bg-green-500/15 dark:text-green-400",
  },
  SUSPENDED: {
    label: "Suspended",
    className: "bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-400",
  },
};

export const roleLabels: Record<Role, string> = {
  CUSTOMER: "Customer",
  PROVIDER: "Provider",
  ADMIN: "Admin",
};

export const conditionLabels: Record<string, string> = {
  NEW: "New",
  GOOD: "Good",
  FAIR: "Fair",
};
