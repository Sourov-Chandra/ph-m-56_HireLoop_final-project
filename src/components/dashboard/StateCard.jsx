"use client";

import { Card } from "@heroui/react";

/**
 * StatCard — reusable stat display card
 *
 * Props:
 *  - title     {string}      e.g. "Total Job Posts"
 *  - value     {number}      e.g. 48
 *  - icon      {JSX.Element} any Gravity UI icon component
 *  - iconColor {string}      optional Tailwind bg class for icon box, default "bg-default-100"
 */
export default function StatCard({
  title,
  value,
  icon,
  iconColor = "bg-default-100",
}) {
  const formatted = typeof value === "number" ? value.toLocaleString() : value;

  return (
    <Card className="min-w-45 flex-1">
      <Card.Content className="flex flex-col gap-6 p-5">
        {/* Icon box */}
        <span
          className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${iconColor} text-default-600`}
        >
          {icon}
        </span>

        {/* Title + Value */}
        <div className="flex flex-col gap-1 justify-center items-center">
          <p className="text-sm text-default-500 font-medium">{title}</p>
          <p className="text-3xl font-semibold text-foreground tracking-tight">
            {formatted}
          </p>
        </div>
      </Card.Content>
    </Card>
  );
}
