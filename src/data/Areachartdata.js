export const formatData = (data, type) => {
  if (data && Array.isArray(data) && data.length > 0) {
    if (type === "Temperature") {
      return data[0].map((history) => {
        return {
          date: history.time,
          Temperature: history.Temperature,
        };
      });
    } else if (type === "Humidity") {
      return data[0].map((history) => {
        return {
          date: history.time,
          Humidity: history.Humidity,
        };
      });
    }
  }
};

const chartdata = [
  {
    date: "Jan 22",
    SemiAnalysis: 2890,
    "The Pragmatic Engineer": 2338,
  },
  {
    date: "Feb 22",
    SemiAnalysis: 2756,
    "The Pragmatic Engineer": 2103,
  },
  {
    date: "Mar 22",
    SemiAnalysis: 3322,
    "The Pragmatic Engineer": 2194,
  },
  {
    date: "Apr 22",
    SemiAnalysis: 3470,
    "The Pragmatic Engineer": 2108,
  },
  {
    date: "May 22",
    SemiAnalysis: 3475,
    "The Pragmatic Engineer": 1812,
  },
  {
    date: "Jun 22",
    SemiAnalysis: 3129,
    "The Pragmatic Engineer": 1726,
  },
];

const dataFormatter = (number) => {
  return "° " + Intl.NumberFormat("us").format(number).toString();
};
const huDataFormatter = (number) => {
  return "% " + Intl.NumberFormat("us").format(number).toString();
};

export { chartdata, dataFormatter,huDataFormatter };
