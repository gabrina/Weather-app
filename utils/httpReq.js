const fetchData = async (URL) => {
  try {
    const data = await fetch(URL);
    const json = await data.json();
    return json;
  } catch (error) {
    console.log("SOmething went wrong :/");
  }
};

export { fetchData };
