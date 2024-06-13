import { useEffect, useState } from "react";

const useSearchHistory = () => {
  const [history, setHistory] = useState<any>([]);

  useEffect(() => {
    if (localStorage?.getItem("history")) {
      const searchHistory = JSON.parse(localStorage?.getItem("history") || "");
      setHistory(searchHistory?.data);
    }
  }, []);

  const addLocation = (location: any) => {
    const found = history.find((data: any) => data?.name === location?.name);
    if (!found) {
      if (history?.length > 3) {
        setHistory((prev: any) => [...prev.slice(-4), location]);
        localStorage &&
          localStorage?.setItem(
            "history",
            JSON.stringify({ data: [...history.slice(-4), location] })
          );
      } else {
        setHistory((prev: any) => [...prev, location]);
        localStorage &&
          localStorage?.setItem(
            "history",
            JSON.stringify({ data: [...history, location] })
          );
      }
    }
  };

  return { addLocation, history };
};

export default useSearchHistory;
