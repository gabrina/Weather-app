const fetchData = async (URL) => {
  try {
    const data = await fetch(URL);
    const json = await data.json();
    return json;
  } catch (error) {
    alert("Something went wrong. Try again!");
  }
};

export { fetchData };
