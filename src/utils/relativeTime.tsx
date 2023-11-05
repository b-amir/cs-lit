import React from "react";

export const RelativeTime = (time: string | number | Date) => {
  const formatter = new Intl.RelativeTimeFormat(undefined, {
    numeric: "auto",
  });

  const divisions = [
    { amount: 60, name: "seconds" },
    { amount: 60, name: "minutes" },
    { amount: 24, name: "hours" },
    { amount: 7, name: "days" },
    { amount: 4.34524, name: "weeks" },
    { amount: 12, name: "months" },
    { amount: Number.POSITIVE_INFINITY, name: "years" },
  ];

  const formatTime = (date: Date) => {
    let duration = (date.getTime() - new Date().getTime()) / 1000;

    for (let i = 0; i <= divisions.length; i++) {
      // @ts-ignore
      const division: Division = divisions[i];
      // if the upcoming time is less than 24 hours, show today instead of in x hours
      if (division.name === "hours" && duration < 24 && duration > 0) {
        return "Today";
      }
      // if the upcoming time is less than 48 hours, show tomorrow instead of in x hours
      if (division.name === "hours" && duration < 48 && duration > 24) {
        return "Tomorrow";
      }
      // if the upcoming time is in 1-7 days, show day of week in long format instead of in x days
      if (division.name === "days" && duration < 7 && duration > 2) {
        return date.toLocaleDateString(undefined, {
          weekday: "long",
        });
      }
      if (Math.abs(duration) < division.amount) {
        // @ts-ignore
        return formatter.format(Math.round(duration), division.name);
      }
      duration /= division.amount;
    }
  };

  return <>{formatTime(new Date(time))}</>;
};

type Division = {
  amount: number;
  name: string;
};
