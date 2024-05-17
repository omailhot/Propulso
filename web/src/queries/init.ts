const apiURL = "http://localhost:3000";

type InitData = {
  status: string;
  duration: number;
  totalVisits: number;
};

export const initDatabase = async (): Promise<InitData> => {
  const data = await fetch(`${apiURL}/init`, {
    method: "POST",
  })
    .then((response) => response.json().then((data) => data))
    .catch(() => {
      return { status: "error" };
    });

  return data;
};
